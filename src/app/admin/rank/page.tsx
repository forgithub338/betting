"use client"
import { useState } from "react";
import stratums from "../../../../lib/stratums";

export default function stratumPage() {
  const [formData, setFormData] = useState({
    discordID: "",
    name: "",
    month: "",
    stratum: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/rank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    setFormData({ discordID: "", name: "", month: "", stratum: "" });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">比武報名系統</h1>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Discord Id</label>
          <input 
            required
            type="text"
            value={formData.discordID}
            onChange={(e) => setFormData({ ...formData, discordID: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">玩家名稱</label>
          <input 
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">月份</label>
          <select
            required
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇月份</option>
            <option value="202506">2025年6月</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">本月等級</label>
          <select
            required
            value={formData.stratum}
            onChange={(e) => setFormData({ ...formData, stratum: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇遷躍等級</option>
            {stratums.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          送出（點一次即可，請耐心等待）
        </button>
      </form>
    </main>
  );
}
