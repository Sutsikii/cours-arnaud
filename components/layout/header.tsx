import { ModeToggle } from "../theme/theme-mode-toggle";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-accent">
            <p className="font-extrabold text-xl">NextJS template</p>
            <nav className="flex-1 flex justify-center gap-8">
                <Link href="/" className="hover:text-primary transition-colors">
                    Accueil
                </Link>
                <Link href="/articles" className="hover:text-primary transition-colors">
                    Articles
                </Link>
                <Link href="/pokemon" className="hover:text-primary transition-colors">
                    Pokémon
                </Link>
                <Link href="/rick-and-morty" className="hover:text-primary transition-colors">
                    Rick et morty
                </Link>
                <Link href="/a-propos" className="hover:text-primary transition-colors">
                    À propos
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                </Link>
            </nav>
            <ModeToggle />
        </header>
    )
}