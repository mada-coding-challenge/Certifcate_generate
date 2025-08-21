import { useState } from "react";
import api from "../api";

export default function UploadCsvFile({type}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setMsg(" svc اولااختر ملف");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMsg("");
      const { data } = await api.post(`/api/${type}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMsg(data.message || "تم الرفع بنجاح");
      setFile(null);
    } catch (err) {
      setMsg(err.message || "فشلت العملية");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">

      <form onSubmit={handleSubmit} className="card p-4 bg-white space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={e => setFile(e.target.files[0] || null)}
          className="file-input file-input-bordered w-full"
        />

        <button
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none cursor-pointer bg-[#008DC3] hover:bg-[#0071A0]"

          disabled={loading}
        >
          {loading ? "...جاري الرفع" : "رفع"}
        </button>
      </form>

      {msg && (
        <div className="mt-4 p-2 rounded bg-gray-100 text-gray-700">
          {msg}
        </div>
      )}
    </div>
  );
}
