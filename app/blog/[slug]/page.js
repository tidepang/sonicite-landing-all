import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog-article-page";
import { articleCopyByLocale } from "@/components/blog-article-data";
import { getBlogArticle, getRelatedBlogArticles, listBlogSlugs } from "@/lib/blog-store";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await listBlogSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getBlogArticle("zh", slug);

  if (!article) {
    return {
      title: "Blog | SONICITE",
    };
  }

  return {
    title: `${article.title} | SONICITE Blog`,
    description: article.summary,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const article = await getBlogArticle("zh", slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedBlogArticles("zh", slug);

  return (
    <BlogArticlePage
      slug={slug}
      fallbackCopy={articleCopyByLocale.zh}
      initialArticle={article}
      initialRelatedArticles={relatedArticles}
    />
  );
}
