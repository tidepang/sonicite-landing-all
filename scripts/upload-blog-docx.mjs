import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const bucket = process.env.SONICITE_BLOG_DOCX_BUCKET || "sonicite-blog-docx";
const tableName = "sonicite_blog_articles";

const docxFiles = [
  ["why-humans-need-music", "为什么人类永远需要音乐？.docx"],
  ["how-djs-find-music", "DJ都是怎么找歌的？ Copy.docx"],
  ["why-clubs-ban-phones", "为什么越来越多俱乐部开始禁手机？ Copy.docx"],
  ["dancefloor-safety", "舞池安全有多重要？电子音乐圈的边界反思 Copy.docx"],
  ["generative-ai-music-industry", "生产力重构：生成式 AI 如何重塑音乐产业？ Copy.docx"],
  ["music-media-evolution", "音乐载体百年演进：从实体独占到数据分发 Copy.docx"],
  ["founder-confession", "源于对音乐最纯粹的热爱｜创始人自白 Copy.docx"],
  ["mia-founder-story", "从 DJ 台到创业桌，Sonicite Co-founder Mia的跨界故事 Copy.docx"],
];

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

function encodeObjectPath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function supabaseRequest(path, init) {
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      ...(init.headers ?? {}),
    },
  });

  return response;
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));
loadEnvFile(resolve(process.cwd(), "../atmos/.env.local"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
}

const bucketResponse = await supabaseRequest("/storage/v1/bucket", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: bucket,
    name: bucket,
    public: true,
    file_size_limit: 25 * 1024 * 1024,
    allowed_mime_types: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  }),
});

if (!bucketResponse.ok && bucketResponse.status !== 409 && bucketResponse.status !== 400) {
  throw new Error(`Bucket create failed (${bucketResponse.status}): ${await bucketResponse.text()}`);
}

const uploaded = [];

for (const [slug, fileName] of docxFiles) {
  const filePath = resolve(process.cwd(), "blog", fileName);
  const bytes = readFileSync(filePath);
  const objectKey = `sonicite/blog/source-docx/${slug}.docx`;
  const uploadPath = `/storage/v1/object/${bucket}/${encodeObjectPath(objectKey)}`;

  const uploadResponse = await supabaseRequest(uploadPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "x-upsert": "true",
    },
    body: bytes,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed for ${fileName} (${uploadResponse.status}): ${await uploadResponse.text()}`);
  }

  const docxUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodeObjectPath(objectKey)}`;
  const patchResponse = await supabaseRequest(`/rest/v1/${tableName}?slug=eq.${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      docx_url: docxUrl,
      docx_object_key: objectKey,
      docx_file_name: fileName,
    }),
  });

  if (!patchResponse.ok) {
    throw new Error(`DB update failed for ${slug} (${patchResponse.status}): ${await patchResponse.text()}`);
  }

  uploaded.push({ slug, docxUrl });
}

console.log(`Uploaded ${uploaded.length} docx files to Supabase Storage bucket ${bucket}.`);
