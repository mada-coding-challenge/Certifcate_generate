// import { useState, useEffect } from "react";
// import api from "../api";
// import UploadCsvFile from "../components/UploadCsvFile";
// export default function UploadCsv() {
//   const [err, setErr] = useState("");
//   const [trainings, setTrainings] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   // Fetch trainings and employees from backend
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [tRes, eRes] = await Promise.all([
//           api.get("/api/trainings"),
//           api.get("/api/employees")
//         ]);
//         setTrainings(tRes.data);
//         setEmployees(eRes.data);
//       } catch (e) {
//         console.error(e);
//         setErr("Failed to load trainings or employees");
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="mx-auto max-w-5xl">
//       <h2 className="text-xl font-bold mb-4"> csv ارفع بيانات الموظفين</h2>
//       <UploadCsvFile type={"employees"} />
//       <h2 className="text-xl font-bold mb-4"> csv ارفع بيانات التدريب</h2>
//       <UploadCsvFile type={"trainings"} />

//       {/* Trainings List */}
//       <div className="mt-10 grid md:grid-cols-2 gap-6">
//         <div className="card p-4 bg-white">
//           <h3 className="font-semibold mb-2">التدريب</h3>
//           {trainings.length === 0 ? (
//             <div className="text-sm text-gray-500">لا يوجد تدريب</div>
//           ) : (
//             <ul className="space-y-2 text-sm">
//               {trainings.map(t => (
//                 <li key={t._id} className="border p-2 rounded">
//                   <div className="font-medium">{t.title}</div>
//                   <div className="text-xs text-gray-500">{t.description}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Employees List */}
//         <div className="card p-4 bg-white">
//           <h3 className="font-semibold mb-2">الموظفين</h3>
//           {employees.length === 0 ? (
//             <div className="text-sm text-gray-500">لا يوجد موظفين</div>
//           ) : (
//             <ul className="space-y-2 text-sm">
//               {employees.map(e => (
//                 <li key={e._id} className="border p-2 rounded">
//                   <div className="font-medium">{e.name}</div>
//                   <div className="text-xs text-gray-500">{e.email}</div>
//                   <div className="text-xs text-gray-400">{e.department}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import api from "../api";
// import UploadCsvFile from "../components/UploadCsvFile";

// export default function UploadCsv() {
//   const [err, setErr] = useState("");
//   const [trainings, setTrainings] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   // جلب الدورات والموظفين من الخلفية
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [tRes, eRes] = await Promise.all([
//           api.get("/api/trainings"),
//           api.get("/api/employees")
//         ]);
//         setTrainings(tRes.data);
//         setEmployees(eRes.data);
//       } catch (e) {
//         console.error(e);
//         setErr("فشل تحميل الدورات أو الموظفين");
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="mx-auto max-w-5xl p-6">
//       <h2 className="text-xl font-bold mb-4">رفع بيانات الموظفين (CSV)</h2>
//       <UploadCsvFile type={"employees"} />

//       <h2 className="text-xl font-bold mb-4 mt-8">رفع بيانات التدريب (CSV)</h2>
//       <UploadCsvFile type={"trainings"} />

//       {/* قائمة الدورات */}
//       <div className="mt-10 grid md:grid-cols-2 gap-6">
//         <div className="card p-6 bg-white shadow rounded-lg">
//           <h3 className="font-semibold mb-2">الدورات</h3>
//           {trainings.length === 0 ? (
//             <div className="text-sm text-gray-500">لا توجد دورات</div>
//           ) : (
//             <ul className="space-y-2 text-sm">
//               {trainings.map(t => (
//                 <li key={t._id} className="border p-2 rounded">
//                   <div className="font-medium">{t.title}</div>
//                   <div className="text-xs text-gray-500">{t.description}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* قائمة الموظفين */}
//         <div className="card p-6 bg-white shadow rounded-lg">
//           <h3 className="font-semibold mb-2">الموظفون</h3>
//           {employees.length === 0 ? (
//             <div className="text-sm text-gray-500">لا يوجد موظفون</div>
//           ) : (
//             <ul className="space-y-2 text-sm">
//               {employees.map(e => (
//                 <li key={e._id} className="border p-2 rounded">
//                   <div className="font-medium">{e.name}</div>
//                   <div className="text-xs text-gray-500">{e.email}</div>
//                   <div className="text-xs text-gray-400">{e.department}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {err && <div className="mt-4 text-error font-medium">{err}</div>}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import api from "../api";
import UploadCsvFile from "../components/UploadCsvFile";

export default function UploadCsv() {
  const [err, setErr] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [employees, setEmployees] = useState([]);

  // جلب الدورات والموظفين من الخلفية
  useEffect(() => {
    async function fetchData() {
      try {
        const [tRes, eRes] = await Promise.all([
          api.get("/api/trainings"),
          api.get("/api/employees")
        ]);
        setTrainings(tRes.data);
        setEmployees(eRes.data);
      } catch (e) {
        console.error(e);
        setErr("فشل تحميل الدورات أو الموظفين");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-xl font-bold mb-4">رفع بيانات الموظفين (CSV)</h2>
      <UploadCsvFile type={"employees"} />

      <h2 className="text-xl font-bold mb-4 mt-8">رفع بيانات التدريب (CSV)</h2>
      <UploadCsvFile type={"trainings"} />

      {/* قائمة الدورات والموظفين مع Scroll */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="card p-6 bg-white shadow rounded-lg">
          <h3 className="font-semibold mb-2">الدورات</h3>
          <div className="max-h-64 overflow-y-auto">
            {trainings.length === 0 ? (
              <div className="text-sm text-gray-500">لا توجد دورات</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {trainings.map(t => (
                  <li key={t._id} className="border p-2 rounded">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.duration}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card p-6 bg-white shadow rounded-lg">
          <h3 className="font-semibold mb-2">الموظفون</h3>
          <div className="max-h-64 overflow-y-auto">
            {employees.length === 0 ? (
              <div className="text-sm text-gray-500">لا يوجد موظفون</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {employees.map(e => (
                  <li key={e._id} className="border p-2 rounded">
                    <div className="font-medium">{e.name}</div>
                    <div className="text-xs text-gray-500">{e.email}</div>
                    <div className="text-xs text-gray-400">{e.department}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {err && <div className="mt-4 text-error font-medium">{err}</div>}
    </div>
  );
}
