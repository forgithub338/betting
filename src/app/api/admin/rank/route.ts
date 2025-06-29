import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../../lib/connectDB";
import { RowDataPacket } from "mysql2/promise";

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const discordID = formData.discordID
  const name = formData.name;
  const month = formData.month;
  const stratum = formData.stratum;

  const db = await createConnection();

  const [rows] = await db.query<RowDataPacket[]>("SELECT * from player where playerName = ?", [name])

  if(rows.length > 0) {
    return NextResponse.json({message: "此玩家已報名，若資料有誤請聯繫管理員刪除"})
  }

  await db.query(
    "INSERT INTO player (discordID, playerName, month, stratum) VALUES (?, ?, ?, ?);",
    [discordID, name, month, stratum]
  )

  return NextResponse.json({message: `已成功新增 ${name} 於 ${month} 為 ${stratum} 級`})
}