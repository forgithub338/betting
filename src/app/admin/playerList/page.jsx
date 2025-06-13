"use client";

import { useState, useEffect } from "react";

export default function PlayerList() {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function getPlayer() {
      const res = await fetch("/api/admin/playerList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPlayerList(data.result);
    }

    getPlayer();
  }, []);

  return(
    <>
        <h1>已有名單</h1>
        {playerList.map((p, index) => (
          <div key={index}>{p.playerName} 於 {p.month} 為 {p.rank} 級</div>
        ))}
    </>



  )
}