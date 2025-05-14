import type { Metadata } from "next";
import { ThemeToggle } from "@/features/ThemeToggle"
import ThemeProvider from "@/features/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Skip Hire",
  description:
    "Easily find the perfect skip size for your needs with our modern, user-friendly skip hire service",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ThemeToggle />
      </body>
    </html>
  );
}
