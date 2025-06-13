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
    })

    setFormData({
      name: "",
      month: "",
      rank: ""
    })

    const data = await res.json();
    alert(data.message)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>玩家名稱</label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </div>
      <div>
        <label>月份</label>
        <select
          required
          value={formData.month}
          onChange={(e) =>
            setFormData({ ...formData, month: e.target.value })
          }
        >
          <option value="">請選擇月份</option>
          <option value="202506">2025年6月</option>
          <option value="202507">2025年7月</option>
        </select>
      </div>
      <div>
        <label>本月等級</label>
        <select
          required
          value={formData.rank}
          onChange={(e) =>
            setFormData({ ...formData, rank: e.target.value })
          }>
            <option value="">請選擇遷躍等級</option>
            <option value = "巔峰">巔峰</option>
            <option value = "至尊">至尊</option>
            <option value = "拔粹">拔粹</option>
            <option value = "中堅">中堅</option>
            <option value = "逍遙/雲遊">逍遙/雲遊</option>
        </select>
      </div>

      <button type="submit">送出(點一次即可，請耐心等待)</button>
    </form>
  );
}
