import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockLeads = [
  {
    name: "Alexander Wright",
    email: "alexander.w@stripe-client.io",
    budget: "$1000-$5000",
    message: "We need a modern lead pipeline system integrated with our custom Next.js frontend and CRM workflow.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    name: "Sophia Chen",
    email: "sophia.chen@techmatrix.co",
    budget: "Above $5000",
    message: "Looking for an enterprise dashboard suite with real-time lead analytics, Clerk auth, and Supabase integration.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14 hours ago
  },
  {
    name: "Marcus Vance",
    email: "marcus@linearflow.dev",
    budget: "$500-$1000",
    message: "Interested in automated email alerts with Resend and instant status updates for customer queries.",
    status: "CLOSED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
  {
    name: "Elena Rostova",
    email: "elena@designhub.studio",
    budget: "$1000-$5000",
    message: "We love your Linear aesthetic. We want a custom lead capture funnel for our high-end agency.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50),
  },
  {
    name: "David Miller",
    email: "d.miller@apexcapital.org",
    budget: "Above $5000",
    message: "Need full stack custom software build with analytics dashboards, CSV exports, and multi-tenant security.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
  {
    name: "Hannah Abbott",
    email: "hannah@nexuslogistics.com",
    budget: "Under $500",
    message: "Looking to audit our current contact forms and switch over to LeadDesk Mini for smoother lead tracking.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
  },
  {
    name: "Jameson Blake",
    email: "jblake@pulsemedia.net",
    budget: "$1000-$5000",
    message: "Requesting a demo of the analytics tab and custom filtering capabilities for sales teams.",
    status: "CLOSED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
  },
  {
    name: "Olivia Thorne",
    email: "olivia@biotechlabs.io",
    budget: "Above $5000",
    message: "We need HIPAA compliant lead handling with Postgres database backups and custom RBAC permissions.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 150),
  },
  {
    name: "Ethan Ramirez",
    email: "ethan@fintechscale.app",
    budget: "$500-$1000",
    message: "Seeking quick integration guide for Next.js 15 Server Actions and Zod validation.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 180),
  },
  {
    name: "Chloe Bennett",
    email: "chloe@vercellabs.org",
    budget: "$1000-$5000",
    message: "We want a dark mode primary design with smooth Framer Motion interactions and custom toasts.",
    status: "CLOSED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 220),
  },
];

async function main() {
  console.log("🌱 Seeding database with mock leads...");
  await prisma.lead.deleteMany();

  for (const lead of mockLeads) {
    await prisma.lead.create({
      data: lead,
    });
  }

  console.log(`✅ Database seeded successfully with ${mockLeads.length} leads!`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
