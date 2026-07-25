"use server";

import { cookies } from "next/headers";
import { createAuditLog } from "@/lib/audit";

const VALID_ADMIN_USERS = ["admin@leaddesk.pro", "admin@example.com", "admin"];
const VALID_ADMIN_PASSWORDS = ["DemoPassword123!", "admin123", "password123"];

export async function loginAdminAction(formData: {
  usernameOrEmail: string;
  password: string;
}) {
  const username = formData.usernameOrEmail?.trim().toLowerCase();
  const password = formData.password?.trim();

  if (!username || !password) {
    return { success: false, error: "Please enter both username/email and password." };
  }

  const isValidUser = VALID_ADMIN_USERS.some(
    (u) => u.toLowerCase() === username
  );
  const isValidPass = VALID_ADMIN_PASSWORDS.includes(password);

  if (!isValidUser || !isValidPass) {
    return {
      success: false,
      error: "Invalid username or password. Try admin@leaddesk.pro / DemoPassword123!",
    };
  }

  // Set HTTP-only admin session cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  // Log Audit Event
  await createAuditLog({
    action: "ADMIN_LOGIN",
    adminId: username,
    adminEmail: username.includes("@") ? username : "admin@leaddesk.pro",
    details: `Admin user signed in via credentials UI`,
  });

  return { success: true, redirectUrl: "/admin" };
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true, redirectUrl: "/login" };
}
