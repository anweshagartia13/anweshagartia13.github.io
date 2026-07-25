import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LeadDesk Pro - Enterprise Lead Capture CRM",
    short_name: "LeadDesk Pro",
    description: "Production-ready lead capture CRM with 5-stage pipeline management, real-time analytics, and Clerk authentication.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
