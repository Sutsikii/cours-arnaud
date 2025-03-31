'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createArticle, updateArticle } from '@/app/actions/articles';

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
      const result = article 
        ? await updateArticle(article.id.toString(), formData)
        : await createArticle(formData);

      if (result.success && result.data) {
        toast.success(article ? 'Article modifié avec succès' : 'Article créé avec succès');
        router.push(`/articles/${result.data.id}`);
        router.refresh();
      } else {
        if (result.error?.errors) {
          result.error.errors.forEach((err) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          toast.error(result.error?.message || 'Une erreur est survenue');
        }
      }
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