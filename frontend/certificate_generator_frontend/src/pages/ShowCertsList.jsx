import { useLocation, useNavigate } from "react-router-dom";

export default function ShowCertList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state.certificatesData;

  if (!data) return <div className="p-6">لا توجد بيانات للعرض</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-4 px-4 py-2 bg-[#008DC3] text-white rounded hover:bg-[#0073a3] mt-10"
        onClick={() => navigate(-1)}
      >
        العودة
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {/* الشهادات المنشئة */}
        <div className="card p-4 bg-white shadow rounded-lg max-h-[500px] overflow-y-auto">
          <h3 className="font-semibold">تم الإنشاء ({data.processed})</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {data.certificates.map((c, i) => (
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

        {/* الشهادات المرفوضة */}
        <div className="card p-4 bg-white shadow rounded-lg max-h-[500px] overflow-y-auto">
          <h3 className="font-semibold">المدخلات المفقودة</h3>
          {!data.missingEntries || data.missingEntries.length === 0 ? (
            <div className="text-sm text-gray-600 mt-2">لا يوجد</div>
          ) : (
            <ul className="mt-2 space-y-2 text-sm">
              {data.missingEntries.map((m, idx) => (
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
    </div>
  );
}
