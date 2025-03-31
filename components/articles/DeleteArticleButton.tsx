'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteArticle } from '@/app/actions/articles';

interface DeleteArticleButtonProps {
  articleId: number;
}

export function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteArticle(articleId.toString());

      if (result.success) {
        toast.success('Article supprimé avec succès');
        router.push('/articles');
        router.refresh();
      } else {
        toast.error(result.error?.message || 'Une erreur est survenue');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la suppression');
      console.error('Erreur:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </Button>
  );
} 