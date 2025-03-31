import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

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

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="text-muted-foreground mb-8">
          Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <div className="whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </div>
  );
} 