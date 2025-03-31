import { ContactForm } from "@/components/ContactForm";
import { Toaster } from "sonner";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contactez-nous</h1>
      <ContactForm />
      <Toaster position="top-center" />
    </div>
  );
}
