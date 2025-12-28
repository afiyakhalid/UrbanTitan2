import { NuqsAdapter } from "nuqs/adapters/next/app";
import localFont from "next/font/local";
import { Header } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoginGate } from "@/components/auth/login-gate";
import type { Metadata } from "next";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: "../assets/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../assets/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-sfpro",
});

export const metadata: Metadata = {
  title: "UrbanTitan",
  description: "An Extensive Construction Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sfPro.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NuqsAdapter>
          <Header />
          {children}
          <Footer />
          <LoginGate />
        </NuqsAdapter>
      </body>
    </html>
  );
}
