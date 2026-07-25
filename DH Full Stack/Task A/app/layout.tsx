import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadDesk Mini | Modern Lead Capture & SaaS CRM",
  description:
    "Production-quality lead capture CRM web application. Capture leads, track customers, and close deals faster.",
  openGraph: {
    title: "LeadDesk Mini | SaaS Lead CRM",
    description:
      "Capture leads, track customer pipelines, and close deals faster with real-time analytics and automated alerts.",
    url: "https://leaddesk-mini.vercel.app",
    siteName: "LeadDesk Mini",
    type: "website",
  },
};

const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_Y2xldmVyLWNhcnA0Mi5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
            <Toaster position="bottom-right" theme="dark" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
