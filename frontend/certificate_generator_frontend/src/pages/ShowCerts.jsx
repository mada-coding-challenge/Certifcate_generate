import { useLocation, useNavigate  } from "react-router-dom";

export default function ShowCert() {
  const location = useLocation();
  const { certificateUrl} = location.state || {};
  const navigate = useNavigate();
  if (!certificateUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">لا توجد شهادة لعرضها.</p>
      </div>
    );
  }

  return (
    <div>
        <button
        className="mb-4 px-4 py-2 bg-[#008DC3] text-white rounded hover:bg-[#0073a3] mt-10"
        onClick={() => navigate(-1)}
      >
        العودة
      </button>
      
  
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
          
        </div>
      </div>
      </div>
    </div>
  );
}

