import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ArticleForm } from '@/components/articles/ArticleForm';

const prisma = new PrismaClient();

async function getArticle(id: string) {
  if (id === 'new') return null;

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

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const article = await getArticle(params.id);
  const isNew = params.id === 'new';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isNew ? 'Nouvel article' : 'Modifier l\'article'}
      </h1>
      <ArticleForm article={article} />
    </div>
  );
} 