import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, email));

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch budgets" }), { status: 500 });
  }
}
