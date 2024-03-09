import type { Metadata } from "next";
import { Work_Sans, Lexend } from "next/font/google";
import "./globals.css";
import NextThemeProvider from "@/providers/ThemeProvider";
import { AuthUserProvider } from "@/providers/AuthProvider";

const workSans = Work_Sans({subsets: ["latin"]});
const lexend = Lexend({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ESIAC-BIBLIO",
  description: "Application de la communauté des étudiants de l'ESIAC.",
  applicationName: "ESIAC-BIBLIO",
  keywords: ["Etudiants camerounais","ESIAC", "BIBLIO", "ESIAC-BIBLIO","Ecole Supérieure d'ingénierie et de management d'Afrique Centrale"],
  creator: "Franck NIAT",
  authors: [{
    name: "Franck NIAT",
    url: "https://franckinato.vercel.app",
  }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${lexend.className} min-h-screen antialiased bg-white dark:bg-neutral-950`}>
        <NextThemeProvider enableSystem defaultTheme="system" attribute="class">
          <AuthUserProvider>
            {children}
          </AuthUserProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
