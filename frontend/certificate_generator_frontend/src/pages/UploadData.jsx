
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; // استيراد navigate
export default function UploadData() {
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setResData(null);
    if (!file || !logo) return setErr("الرجاء اختيار ملف Excel والشعار.");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("logo", logo);

    try {
      setLoading(true);
      const { data } = await api.post(
        "/api/certificates/upload-certificates",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
     
      setResData(data);
      navigate("/show-cert-list", { state: { certificatesData: data } });
    } catch (e) {
      setErr(e.message || "فشل رفع الملفات");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto md:max-w-4xl md:p-6 w-full">
      <h2 className="text-xl font-bold mb-4">رفع جماعي (XLSX)</h2>
      <form
        onSubmit={submit}
        className="card p-6 bg-white shadow rounded-lg md:space-y-4 font-gedinar w-full"
      >
        <div>
          <label className="block mb-1 text-sm">ملف Excel</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={e => setFile(e.target.files[0] || null)}
            className="file-input file-input-bordered w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            الأعمدة المطلوبة: employeeName, department, email, trainingName,
            date (YYYY-MM-DD)
          </p>
        </div>
        <div>
          <label className="block mb-1 text-sm">الشعار</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setLogo(e.target.files[0] || null)}
            className="file-input file-input-bordered w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base cursor-pointer"
          />
        </div>

        {err && <div className="text-error">{err}</div>}

        <button
          className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none cursor-pointer bg-[#008DC3] hover:bg-[#0071A0]"
          disabled={loading}
        >
          {loading ? "جاري المعالجة..." : "رفع وإنشاء الشهادات"}
        </button>
      </form>

      {resData && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="card p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">تم الإنشاء ({resData.processed})</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {resData.certificates.map((c, i) => (
                <li
                  key={i}
                  className="border rounded p-2 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{c.employee}</div>
                    <div className="text-xs text-gray-500">{c.training}</div>
                  </div>
                  {c.fileUrl && (
                    <a
                      className="text-[#008DC3] font-medium"
                      href={c.fileUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      تحميل PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">المدخلات المفقودة</h3>
            {!resData.missingEntries || resData.missingEntries.length === 0 ? (
              <div className="text-sm text-gray-600 mt-2">لا يوجد</div>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {resData.missingEntries.map((m, idx) => (
                  <li key={idx} className="border rounded p-2">
                    <div className="text-red-600 font-medium">{m.reason}</div>
                    <pre className="text-xs mt-1">
                      {JSON.stringify(m.row, null, 2)}
                    </pre>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
