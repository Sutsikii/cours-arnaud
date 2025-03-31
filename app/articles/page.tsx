import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare } from 'lucide-react';

const prisma = new PrismaClient();

async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link href="/articles/edit/new">
          <Button>
            <PenSquare className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <Link href={`/articles/${article.id}`}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {article.content}
                </p>
              </CardContent>
            </Link>
            <div className="px-6 pb-6 pt-2 flex justify-end gap-2">
              <Link href={`/articles/edit/${article.id}`}>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 