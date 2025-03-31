import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = articleSchema.parse(body);

    const article = await prisma.article.create({
      data: validatedData,
    });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue" },
      { status: 500 }
    );
  }
} 