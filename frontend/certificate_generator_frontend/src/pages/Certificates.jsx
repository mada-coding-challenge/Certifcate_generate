
import { useEffect, useMemo, useState } from "react";
import api from "../api";

export default function Certificates() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null); // للشهادة المفتوحة في المودال

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/certificates");
        setItems(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      c =>
        (c.employee.name || "").toLowerCase().includes(s) ||
        (c.training.title || "").toLowerCase().includes(s)
    );
  }, [q, items]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-xl font-bold mb-4">الشهادات</h2>

      <div className="mb-4">
        <input
          placeholder="ابحث..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="input input-bordered w-full md:w-96 rounded-md border border-[#e0e0e0] py-2 px-4"
        />
      </div>

      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#008DC3] scrollbar-track-gray-100 p-1">
          {filtered.length === 0 ? (
            <div className="text-gray-500 col-span-2 text-center">لا توجد شهادات</div>
          ) : (
            filtered.map(c => (
              <div
                key={c._id}
                className="card p-4 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedCert(c)}
              >
                <div className="font-semibold text-[#008DC3]">{c.employee.name}</div>
                <div className="text-sm text-gray-500">{c.training.title}</div>
                <div className="text-xs text-gray-400">
                  {new Date(c.date).toLocaleDateString()}
                </div>
                {c.fileUrl && (
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); // لمنع فتح المودال عند الضغط على الزر
                      window.open(c.fileUrl, "_blank");
                    }}
                    className="mt-2 w-full bg-[#008DC3] hover:bg-[#0072A3] text-white py-2 px-4 rounded text-sm"
                  >
                  {console.log(c.fileUrl)}
                    تحميل PDF
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal للشهادة */}
      {selectedCert && selectedCert.fileUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl h-full md:h-auto rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">{selectedCert.employee.name} - {selectedCert.training.title}</h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center">
              <iframe
                src={selectedCert.fileUrl}
                title="Certificate"
                className="w-full h-[80vh] border rounded"
              />
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <a
                href={selectedCert.fileUrl}
                download
                className="bg-[#008DC3] hover:bg-[#0072A3] text-white py-2 px-4 rounded"
              >
                تحميل PDF
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
