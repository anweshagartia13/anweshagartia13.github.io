import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadDesk Pro | Enterprise Lead Capture & SaaS CRM",
  description:
    "Production-grade Lead Capture CRM with 5-stage pipeline management, real-time analytics, drag-and-drop Kanban board, and Clerk authentication.",
  keywords: [
    "Lead CRM",
    "SaaS Lead Capture",
    "Lead Management",
    "Next.js CRM",
    "Pipeline Tracking",
    "Kanban CRM",
  ],
  authors: [{ name: "Digital Heroes Training Team" }],
  openGraph: {
    title: "LeadDesk Pro | Enterprise Lead Capture & SaaS CRM",
    description:
      "Production-ready lead capture CRM with 5-stage pipeline management, real-time analytics, and Clerk authentication.",
    url: "https://leaddesk-mini-swart.vercel.app",
    siteName: "LeadDesk Pro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadDesk Pro | Enterprise Lead Capture & SaaS CRM",
    description:
      "Production-grade Lead Capture CRM with 5-stage pipeline management and real-time analytics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    "pk_test_Y2xldmVyLWNhcnA0Mi5jbGVyay5hY2NvdW50cy5kZXYk";

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "LeadDesk Pro",
                operatingSystem: "Web",
                applicationCategory: "BusinessApplication",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              }),
            }}
          />
        </head>
        <body
          className={`${inter.variable} font-sans bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen flex flex-col`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster
              position="top-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(51, 65, 85, 0.8)",
                  color: "#f8fafc",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
