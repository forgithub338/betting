import { createConnection } from "@/../lib/connectDB"
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const db = await createConnection();
    const [result] = await db.query("SELECT * FROM player");
    return NextResponse.json({result});
  } catch (error) {
    if (error instanceof Error) {
      console.error("DB Error:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error("Unknown Error", error);
      return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
    }
  }
}