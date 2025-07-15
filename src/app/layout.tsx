import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from './AuthProvider';
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Center for Culture and the Arts Development",
  description: "CCAD - Preserving and promoting Boholano cultural heritage through arts, education, and community development",
  icons: {
    icon: [
      { url: "/images/CCADLOGO.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/images/CCADLOGO.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/images/CCADLOGO.jpg", sizes: "48x48", type: "image/jpeg" },
    ],
    shortcut: "/images/CCADLOGO.jpg",
    apple: "/images/CCADLOGO.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </AuthProvider>
    </html>
  );
}
