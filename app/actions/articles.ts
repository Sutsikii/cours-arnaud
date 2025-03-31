'use server'

import { z } from 'zod'
import { PrismaClient, Article } from '@prisma/client'

const prisma = new PrismaClient()

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
})

type ActionResponse<T> = {
  success: boolean
  data?: T
  error?: {
    message: string
    errors?: Array<{
      field: string
      message: string
    }>
  }
}

export async function createArticle(
  formData: FormData | { title: string; content: string }
): Promise<ActionResponse<Article>> {
  try {
    const data = formData instanceof FormData
      ? {
          title: formData.get('title'),
          content: formData.get('content')
        }
      : formData

    const validatedData = articleSchema.parse(data)

    const article = await prisma.article.create({
      data: validatedData,
    })

    return {
      success: true,
      data: article
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          message: "Erreur de validation",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        }
      }
    }
    
    return {
      success: false,
      error: {
        message: "Une erreur est survenue"
      }
    }
  }
}

export async function updateArticle(
  id: string,
  formData: FormData | { title: string; content: string }
): Promise<ActionResponse<Article>> {
  try {
    const data = formData instanceof FormData
      ? {
          title: formData.get('title'),
          content: formData.get('content')
        }
      : formData

    const validatedData = articleSchema.parse(data)

    const article = await prisma.article.update({
      where: {
        id: parseInt(id)
      },
      data: validatedData,
    })

    return {
      success: true,
      data: article
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          message: "Erreur de validation",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        }
      }
    }
    
    return {
      success: false,
      error: {
        message: "Une erreur est survenue"
      }
    }
  }
}

export async function deleteArticle(id: string): Promise<ActionResponse<void>> {
  try {
    await prisma.article.delete({
      where: {
        id: parseInt(id)
      }
    })

    return {
      success: true
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue"
    return {
      success: false,
      error: {
        message: `Une erreur est survenue lors de la suppression : ${errorMessage}`
      }
    }
  }
} 