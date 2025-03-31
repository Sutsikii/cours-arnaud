'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ArticleFormProps {
  article?: Article | null;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = article ? `/api/articles/${article.id}` : '/api/articles';
      const method = article ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue');
      }

      const result = await response.json();
      
      toast.success(article ? 'Article modifié avec succès' : 'Article créé avec succès');
      router.push(`/articles/${result.id}`);
      router.refresh();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Titre
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre de l'article"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Contenu
        </label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Contenu de l'article"
          required
          className="min-h-[300px]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Enregistrement...' : (article ? 'Modifier' : 'Créer')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="w-full"
        >
          Annuler
        </Button>
      </div>
    </form>
  );
} 