import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../../lib/connectDB";

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const name = formData.name;
  const month = formData.month;
  const rank = formData.rank;

  const db = await createConnection();

  await db.query(
    "INSERT INTO player (playerName, month, rank) VALUES (?, ?, ?);",
    [name, month, rank]
  )

  return NextResponse.json({message: `已成功新增 ${name} 於 ${month} 為 ${rank} 級`})
}