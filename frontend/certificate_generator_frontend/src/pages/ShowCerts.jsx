// src/pages/ShowCert.jsx
// import { useLocation, useNavigate } from "react-router-dom";

// export default function ShowCert() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { certificateUrl, employeeName, trainingTitle, date } =
//     location.state || {};

//   if (!certificateUrl) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen px-4">
//         <p className="text-red-500 font-medium text-lg mb-4">
//           لا توجد شهادة للعرض.
//         </p>
//         <button
//           className="bg-[#008DC3] text-white font-semibold py-2 px-6 rounded hover:bg-[#0074a0] transition"
//           onClick={() => navigate("/new-certificate")}
//         >
//           العودة لإنشاء شهادة
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
//       <div className="w-full max-w-xl bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
//         <div className="p-6 space-y-4 font-gedinar">
//           <h2 className="text-2xl font-bold text-center text-[#008DC3]">
//             تم إنشاء الشهادة
//           </h2>

//           <div className="w-full h-[400px] md:h-[500px] border rounded overflow-hidden animate-fadeIn">
//             <iframe
//               src={certificateUrl}
//               className="w-full h-full"
//               title="Certificate Preview"
//             ></iframe>
//           </div>

//           <div className="flex flex-col md:flex-row gap-3 mt-4">
//             <a
//               href={certificateUrl}
//               download
//               className="flex-1 text-center bg-[#008DC3] text-white font-semibold py-3 rounded-lg hover:bg-[#0074a0] transition"
//             >
//               تحميل PDF
//             </a>
//             <button
//               className="flex-1 text-center border border-[#008DC3] text-[#008DC3] font-semibold py-3 rounded-lg hover:bg-[#008DC3] hover:text-white transition"
//               onClick={() => navigate("/")}
//             >
//               إنشاء شهادة جديدة
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/ShowCert.jsx
import { useLocation } from "react-router-dom";

export default function ShowCert() {
  const location = useLocation();
  const { certificateUrl} = location.state || {};

  if (!certificateUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">لا توجد شهادة لعرضها.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
       
        <div className="w-full md:h-[80vh] h-[30vh]">
          <iframe
            src={certificateUrl}
            title="Certificate"
            className="w-full h-full"
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-3 mt-4 justify-center">
          <a
            href={certificateUrl}
            download
            className="bg-[#008DC3] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#0071A0] transition w-[200px] text-center self-center"
          >
            تحميل الشهادة
          </a>
          <a
              className="bg-[#008DC3] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#0071A0] transition w-[200px] text-center self-center cursor-pointer"
              onClick={() => navigate(-1)}
            >
              العودة
            </a>
        </div>
      </div>
    </div>
  );
}

