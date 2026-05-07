import { articleCopyByLocale, blogArticleSlugs, getArticle, getRelatedArticles } from "@/components/blog-article-data";
import { buildFilterValue, hasSupabaseAdminConfig, supabaseAdminFetch } from "@/lib/supabase-admin";

const tableName = "sonicite_blog_articles";
const selectFields = "slug,title,category,date_text,read_time,image,summary,body,sort_order,docx_url";

function normalizeBody(body) {
  if (!Array.isArray(body)) {
    return [];
  }

  return body
    .filter((block) => block && typeof block.text === "string")
    .map((block) => ({
      type: ["lead", "heading", "quote", "paragraph"].includes(block.type) ? block.type : "paragraph",
      text: block.text,
    }));
}

function mapRowToArticle(row) {
  if (!row?.slug || !row?.title) {
    return null;
  }

  return {
    id: row.slug,
    title: row.title,
    category: row.category ?? "博客",
    date: row.date_text ?? "",
    readTime: row.read_time ?? "",
    image: row.image || "/images/sonicite-product.jpg",
    summary: row.summary ?? "",
    body: normalizeBody(row.body),
    docxUrl: row.docx_url ?? null,
  };
}

function fallbackArticles(locale = "zh") {
  return articleCopyByLocale[locale]?.articles ?? articleCopyByLocale.zh.articles;
}

function shouldUseFallback(error) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("Could not find the table") ||
    message.includes("schema cache") ||
    message.includes("relation") ||
    message.includes("Missing")
  );
}

export async function listBlogArticles(locale = "zh") {
  if (!hasSupabaseAdminConfig()) {
    return fallbackArticles(locale);
  }

  try {
    const rows = await supabaseAdminFetch(
      `${tableName}?select=${selectFields}&is_published=eq.true&order=sort_order.asc`,
      { method: "GET" },
    );
    const articles = Array.isArray(rows) ? rows.map(mapRowToArticle).filter(Boolean) : [];
    return articles.length > 0 ? articles : fallbackArticles(locale);
  } catch (error) {
    if (shouldUseFallback(error)) {
      console.warn("Falling back to bundled blog articles:", error);
      return fallbackArticles(locale);
    }

    throw error;
  }
}

export async function listBlogSlugs() {
  if (!hasSupabaseAdminConfig()) {
    return blogArticleSlugs;
  }

  try {
    const rows = await supabaseAdminFetch(`${tableName}?select=slug&is_published=eq.true&order=sort_order.asc`, {
      method: "GET",
    });
    const slugs = Array.isArray(rows) ? rows.map((row) => row.slug).filter(Boolean) : [];
    return slugs.length > 0 ? slugs : blogArticleSlugs;
  } catch (error) {
    if (shouldUseFallback(error)) {
      return blogArticleSlugs;
    }

    throw error;
  }
}

export async function getBlogArticle(locale, slug) {
  if (!hasSupabaseAdminConfig()) {
    return getArticle(locale, slug) ?? getArticle("zh", slug);
  }

  try {
    const rows = await supabaseAdminFetch(
      `${tableName}?slug=eq.${buildFilterValue(slug)}&is_published=eq.true&select=${selectFields}&limit=1`,
      { method: "GET" },
    );
    const article = Array.isArray(rows) ? mapRowToArticle(rows[0]) : null;
    return article ?? getArticle(locale, slug) ?? getArticle("zh", slug);
  } catch (error) {
    if (shouldUseFallback(error)) {
      return getArticle(locale, slug) ?? getArticle("zh", slug);
    }

    throw error;
  }
}

export async function getRelatedBlogArticles(locale, slug) {
  const articles = await listBlogArticles(locale);
  const article = articles.find((item) => item.id === slug);

  if (!article) {
    return getRelatedArticles(locale, slug);
  }

  const sameCategory = articles.filter((item) => item.category === article.category && item.id !== slug);
  const others = articles.filter((item) => item.category !== article.category && item.id !== slug);

  return [...sameCategory, ...others].slice(0, 3);
}
