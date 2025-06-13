"use client";

import { useState, useEffect } from "react";
import stratums from "../../../../lib/stratums";

export default function PlayerList() {
  const [month, setMonth] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">已有名單</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Player Lists by Stratum */}
        <div className="space-y-8">
          {stratums.map((s) => {
            const filteredPlayers = playerList.filter((p) => p.stratum === s);
            if (filteredPlayers.length === 0) return null;

            return (
              <div key={s} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Stratum Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {filteredPlayers.length}
                    </span>
                    {s}
                  </h2>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          玩家名稱
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Discord ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPlayers.map((p, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-blue-50/50 transition-colors duration-200 group"
                        >
                          <td className="py-4 px-6 text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                {p.playerName?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                              {p.playerName}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600 font-mono text-sm bg-gray-50/50 group-hover:bg-blue-50/70 transition-colors">
                            <span className="bg-gray-100 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                              {p.discordId}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer with count */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    共 <span className="font-semibold text-blue-600">{filteredPlayers.length}</span> 位玩家
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}