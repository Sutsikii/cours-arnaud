import { ArticleDisplay } from "@/components/article-display";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage(props: ArticlePageProps) {
  const { id } = await props.params;
  return <ArticleDisplay id={id} />;
}
