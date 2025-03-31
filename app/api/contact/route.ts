import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // TODO: Utiliser validatedData pour envoyer un email ou sauvegarder les données
    console.log("Données de contact validées:", validatedData);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
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