// // src/pages/NewCertificate.jsx
// import { useEffect, useState } from "react";
// import api from "../api";
// import Autocomplete from "../components/Autocomplete";
// import UploadData from "./UploadData";
// import { useNavigate } from "react-router-dom";
// export default function GenerateCert() {
//   const [employees, setEmployees] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [trainingId, setTrainingId] = useState("");
//   const [date, setDate] = useState("");
//   const [logo, setLogo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   async function handleCreate(e) {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     if (!employeeId || !trainingId || !date || !logo)
//       return setError("الرجاء تعبئة جميع الحقول واختيار الشعار.");

//     const fd = new FormData();
//     fd.append("employeeId", employeeId);
//     fd.append("trainingId", trainingId);
//     fd.append("date", date);
//     fd.append("logo", logo);

//     try {
//       setLoading(true);
//       const { data } = await api.post("/api/certificates", fd, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       // بعد النجاح، توجه لصفحة ShowCert مع تمرير البيانات
//       navigate("/show-cert", {
//         state: {
//           certificateUrl: data.certificate.fileUrl,
//           date: data.certificate.date
//         }
//       });
//     } catch (err) {
//       setError(err.message || "فشل إنشاء الشهادة");
//     } finally {
//       setLoading(false);
//     }
//   }
//   useEffect(() => {
//     (async () => {
//       try {
//         const [eRes, tRes] = await Promise.all([
//           api.get("/api/employees"),
//           api.get("/api/trainings")
//         ]);
//         setEmployees(eRes.data || []);
//         setTrainings(tRes.data || []);
//       } catch (err) {
//         setError("فشل تحميل الموظفين أو الدورات");
//       }
//     })();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     if (!employeeId || !trainingId || !date || !logo)
//       return setError("الرجاء تعبئة جميع الحقول واختيار الشعار.");

//     const fd = new FormData();
//     fd.append("employeeId", employeeId);
//     fd.append("trainingId", trainingId);
//     fd.append("date", date);
//     fd.append("logo", logo);

//     try {
//       setLoading(true);
//       const { data } = await api.post("/api/certificates", fd, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setResult(data);
//     } catch (err) {
//       setError(err.message || "فشل إنشاء الشهادة");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="mx-auto md:max-w-3xl flex items-center justify-center pt-8  md:p-12 font-gedinar">
//       <div className="mx-auto w-full max-w-[550px] bg-white">
//         <h2 className="text-xl font-bold mb-4">إنشاء شهادة</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="card p-4 bg-white shadow rounded-lg space-y-4 font-gedinar py-6 px-9"
//         >
//           <div className="">
//             <Autocomplete
//               label="الموظف"
//               items={employees}
//               displayKey="name"
//               placeholder="اكتب الاسم..."
//               onSelect={it => setEmployeeId(it._id)}
//             />
//             <Autocomplete
//               label="الدورة"
//               items={trainings}
//               displayKey="title"
//               placeholder="اكتب العنوان..."
//               onSelect={it => setTrainingId(it._id)}
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-sm">التاريخ</label>
//               <input
//                 type="date"
//                 className="input input-bordered w-full rounded-md border border-[#e0e0e0]  rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer"
//                 value={date}
//                 onChange={e => setDate(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm">الشعار</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={e => setLogo(e.target.files[0] || null)}
//                 className="file-input file-input-bordered w-full rounded-md border border-[#e0e0e0] inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer"
//               />
//             </div>
//           </div>

//           {error && <div className="text-error">{error}</div>}

//           <div className="flex gap-2">
//             <button onClick={(e) =>{handleCreate(e)}}
//               className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none cursor-pointer bg-[#008DC3] hover:bg-[#0071A0]"
//               disabled={loading}
//             >
//               {loading ? "جاري الإنشاء..." : "إنشاء"}
//             </button>
//             {/* <button
//             type="button"
//             className="btn"
//             onClick={() => {
//               setEmployeeId("");
//               setTrainingId("");
//               setDate("");
//               setLogo(null);
//               setResult(null);
//               setError("");
//             }}
//           >
//             إعادة ضبط
//           </button> */}
//           </div>

//           {/* {result && (
//             <div className="mt-3 card p-3 bg-base-100">
//               <div className="font-medium">تم الإنشاء</div>
//               {result.certificate.fileUrl && (
//                 <a
//                   className="text-blue-600"
//                   href={result.certificate.fileUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   تحميل PDF
//                 </a>
//               )}
//             </div>
//           )} */}
//         </form>
//         <p className="mt-4 text-sm text-gray-600">
//           أو استخدم
         
//             رفع جماعي
         
//           لتحميل ملف Excel يحتوي على عدة صفوف.
//         </p>
//         <UploadData />
//       </div>
//     </div>
//   );
// }
// src/pages/NewCertificate.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Autocomplete from "../components/Autocomplete";
import UploadData from "./UploadData";
import { useNavigate } from "react-router-dom";

export default function GenerateCert() {
  const [employees, setEmployees] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [date, setDate] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // progress bar
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setProgress(0);

    if (!employeeId || !trainingId || !date || !logo)
      return setError("الرجاء تعبئة جميع الحقول واختيار الشعار.");

    const fd = new FormData();
    fd.append("employeeId", employeeId);
    fd.append("trainingId", trainingId);
    fd.append("date", date);
    fd.append("logo", logo);

    try {
      setLoading(true);
      const { data } = await api.post("/api/certificates", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        },
      });

      // بعد النجاح، توجه لصفحة ShowCert
      navigate("/show-cert", {
        state: {
          certificateUrl: data.certificate.fileUrl,
          date: data.certificate.date,
        },
      });
    } catch (err) {
      setError(err.message || "فشل إنشاء الشهادة");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const [eRes, tRes] = await Promise.all([
          api.get("/api/employees"),
          api.get("/api/trainings"),
        ]);
        setEmployees(eRes.data || []);
        setTrainings(tRes.data || []);
      } catch (err) {
        setError("فشل تحميل الموظفين أو الدورات");
      }
    })();
  }, []);

  return (
    <div className="mx-auto md:max-w-3xl flex items-center justify-center pt-8 md:p-12 font-gedinar">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <h2 className="text-xl font-bold mb-4">إنشاء شهادة</h2>
        <form
          onSubmit={handleCreate}
          className="card p-4 bg-white shadow rounded-lg space-y-4 font-gedinar py-6 px-9"
        >
          <div>
            <Autocomplete
              label="الموظف"
              items={employees}
              displayKey="name"
              placeholder="اكتب الاسم..."
              onSelect={(it) => setEmployeeId(it._id)}
            />
            <Autocomplete
              label="الدورة"
              items={trainings}
              displayKey="title"
              placeholder="اكتب العنوان..."
              onSelect={(it) => setTrainingId(it._id)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">التاريخ</label>
              <input
                type="date"
                className="input input-bordered w-full rounded-md border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">الشعار</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0] || null)}
                className="file-input file-input-bordered w-full rounded-md border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer"
              />
            </div>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-[#008DC3] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#008DC3] hover:bg-[#0071A0] py-3 px-8 text-center text-base font-semibold text-white outline-none cursor-pointer"
              disabled={loading}
            >
              {loading
                ? progress < 100
                  ? `جاري الرفع... ${progress}%`
                  : "جاري الإنشاء..."
                : "إنشاء"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          أو استخدم رفع جماعي لتحميل ملف Excel يحتوي على عدة صفوف.
        </p>
        <UploadData />
      </div>
    </div>
  );
}
