import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { articleCopyByLocale } from "../components/blog-article-data.js";

const tableName = "sonicite_blog_articles";

function loadEnvFile(path) {
  try {
    const text = readFileSync(path, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [key, ...rest] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = rest.join("=").replace(/\s+#.*$/, "").trim();
      }
    }
  } catch {
    // Optional local env file.
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));
loadEnvFile(resolve(process.cwd(), "../atmos/.env.local"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
}

const rows = articleCopyByLocale.zh.articles.map((article, index) => ({
  slug: article.id,
  title: article.title,
  category: article.category,
  date_text: article.date,
  read_time: article.readTime,
  image: article.image,
  summary: article.summary,
  body: article.body,
  is_published: true,
  sort_order: index + 1,
}));

const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?on_conflict=slug`, {
  method: "POST",
  headers: {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});

if (!response.ok) {
  throw new Error(`Seed failed (${response.status}): ${await response.text()}`);
}

console.log(`Seeded ${rows.length} Sonicite blog articles to ${tableName}.`);
