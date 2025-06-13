"use client"
import { useState } from "react";

export default function RankPage() {
  const [formData, setFormData] = useState({
    name: "",
    month: "",
    rank: "",
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

    setFormData({ name: "", month: "", rank: "" });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">玩家等級登錄</h1>

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
            <option value="202507">2025年7月</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">本月等級</label>
          <select
            required
            value={formData.rank}
            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">請選擇遷躍等級</option>
            <option value="巔峰">巔峰</option>
            <option value="至尊">至尊</option>
            <option value="拔粹">拔粹</option>
            <option value="中堅">中堅</option>
            <option value="逍遙/雲遊">逍遙/雲遊</option>
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
