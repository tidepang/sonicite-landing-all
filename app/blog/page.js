import { BlogPage } from "@/components/blog-page";
import { listBlogArticles } from "@/lib/blog-store";

export const revalidate = 300;

export const metadata = {
  title: "Blog | SONICITE",
  description: "SONICITE 关于音乐智能、空间声音与产品实践的文章。",
};

export default async function Page() {
  const initialArticles = await listBlogArticles("zh");

  return <BlogPage initialArticles={initialArticles} />;
}
