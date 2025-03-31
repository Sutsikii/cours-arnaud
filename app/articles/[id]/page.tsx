import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DeleteArticleButton } from '@/components/articles/DeleteArticleButton';

const prisma = new PrismaClient();

async function getArticle(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  if (!article) {
    notFound();
  }

  return article;
}

type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-0">{article.title}</h1>
          <div className="flex gap-4">
            <Link href={`/articles/edit/${article.id}`}>
              <Button variant="outline">Modifier</Button>
            </Link>
            <DeleteArticleButton articleId={article.id} />
          </div>
        </div>
        <div className="text-muted-foreground mb-8">
          Publié le{' '}
          {new Date(article.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <div className="whitespace-pre-wrap">{article.content}</div>
      </article>
    </div>
  );
}
