import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import PdfPrinter from "pdfmake";
import Employee from "../models/Employee.js";
import Training from "../models/Training.js";
import Certificate from "../models/Certificate.js";
import xlsx from "xlsx";
const router = express.Router();
const upload = multer({
    dest: "uploads/"
}).fields([{
        name: "file",
        maxCount: 1
    }, // ملف الإكسل
    {
        name: "logo",
        maxCount: 1
    } // ملف اللوغو
]);

// إعداد الخطوط
const fonts = {
    Amiri: {
        normal: path.join(process.cwd(), "fonts/Amiri-Regular.ttf"),
        bold: path.join(process.cwd(), "fonts/Amiri-Bold.ttf"),
        italics: path.join(process.cwd(), "fonts/Amiri-Regular.ttf"),
        bolditalics: path.join(process.cwd(), "fonts/Amiri-Bold.ttf")
    }
};

function fixArabicText(text) {
    if (!text) return text;
    const words = text.trim().split(/\s+/);
    text = words.reverse().join("  ");
    return text;

}

const printer = new PdfPrinter(fonts);

// إنشاء شهادة PDF
async function generateCertificate(employee, training, date, logoPath) {
    const templaleUrl = path.join(process.cwd(), "template.png");
    const employeeName = fixArabicText(employee.name);
    const trainingName = fixArabicText(training.title);
    const docDefinition = {
        pageSize: {
            width: 842,
            height: 595
        },
        pageMargins: [0, 0, 0, 0],
        background: [{
            image: templaleUrl,
            width: 842,
            height: 595
        }],
        content: [{
                image: logoPath || "",
                width: 150,
                absolutePosition: {
                    x: 700,
                    y: 50
                }
            },
            {
                text: employeeName,
                font: "Amiri",
                fontSize: 32,
                alignment: "center",
                absolutePosition: {
                    x: 0,
                    y: 300
                },
                width: 842,
                direction: 'rtl',
                bidi: true
            },
            {
                text: trainingName,
                font: "Amiri",
                fontSize: 24,
                alignment: "center",
                absolutePosition: {
                    x: 0,
                    y: 250
                },
                width: 842
            },
            {
                text: date.toDateString(),
                font: "Amiri",
                fontSize: 20,
                alignment: "center",
                absolutePosition: {
                    x: 0,
                    y: 200
                },
                width: 842
            }
        ]
    };

    return new Promise((resolve, reject) => {
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const fileName = `certificate_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.pdf`;
        const fileUrl = path.join("outputs", fileName);
        const stream = fs.createWriteStream(fileUrl);
        pdfDoc.pipe(stream);
        pdfDoc.end();
        stream.on("finish", () => resolve(fileUrl));
        stream.on("error", reject);
    });
}

//  إنشاء شهادة واحدة
router.post("/", upload, async (req, res) => {
    try {
        const {
            employeeId,
            trainingId,
            date
        } = req.body;
        const employee = await Employee.findById(employeeId);
        const training = await Training.findById(trainingId);

        if (!employee || !training) {
            return res.status(400).json({
                error: "Invalid employee or training"
            });
        }

        const pdfFileName = await generateCertificate(employee, training, new Date(date), req.files.logo ? req.files.logo[0].path : null);

        const certificate = new Certificate({
            employee: employee._id,
            training: training._id,
            date: new Date(date),
            fileUrl: `${req.protocol}://${req.get("host")}/${pdfFileName}`
        });
        await certificate.save();

        res.json({
            success: true,
            certificate
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// 🔹 جلب جميع الشهادات
router.get("/", async (req, res) => {
    const search = req.query.search || "";
    const certificates = await Certificate.find()
        .populate("employee")
        .populate("training");

    const filtered = certificates.filter(c =>
        (c.employee && c.employee.name && c.employee.name.includes(search)) ||
        (c.training && c.training.title && c.training.title.includes(search))
    );


    res.json(filtered);
});

router.post("/upload-certificates", upload, async (req, res) => {

    try {
        //   مسار ملف الإكسل
        const fileUrl = req.files.file[0].path;
        // مسار اللوغو ي)
        const logoPath = req.files.logo ? req.files.logo[0].path : null;
        const workbook = xlsx.readFile(fileUrl);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet, {
            raw: false, // converts Excel dates to string instead of raw numbers
            dateNF: "yyyy-mm-dd" // format of the date
        });

        const results = [];
        const missingEntries = []; // الصفوف المرفوضة

        for (const row of rows) {
            const {
                employeeName,
                department,
                email,
                trainingName,
                date
            } = row;

            // ابحث عن الموظف فقط (لا تنشئه)
            let employee = await Employee.findOne({
                name: employeeName
            });
            if (!employee) {
                missingEntries.push({
                    row,
                    reason: `Employee "${employeeName}" not found in database`
                });
                continue; 
            }

            // ابحث عن التدريب فقط (لا تنشئه)
            let training = await Training.findOne({
                title: trainingName
            });
            if (!training) {
                missingEntries.push({
                    row,
                    reason: `Training "${trainingName}" not found in database`
                });
                continue; // لا تكمل هذا الصف
            }

            // أنشئ الشهادة PDF
            const pdfFileName = await generateCertificate(employee, training, new Date(date), logoPath);

            // خزّن بيانات الشهادة في موديل Certificate
            const certificate = new Certificate({
                employee: employee._id,
                training: training._id,
                date: new Date(row.date),
                fileUrl: `${req.protocol}://${req.get("host")}/${pdfFileName}`
            });
            await certificate.save();

            results.push({
                employee: employee.name,
                training: training.title,
                fileUrl: `${req.protocol}://${req.get("host")}/${pdfFileName}`
            });
        }

        //  احذف ملف الإكسل
        fs.unlink(fileUrl, (err) => {
            if (err) console.error("Error deleting uploaded Excel file:", err);
            else console.log("Uploaded Excel file deleted successfully");
        });

        res.json({
            success: true,
            processed: results.length,
            certificates: results,
            missingEntries
        });
    } catch (err) {
        // حتى لو حصل خطأ، حاول حذف الملف لتجنب التكدس
        fs.unlink(fileUrl, (err) => {
            if (err) console.error("Error deleting uploaded Excel file after error:", err);
        });

        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;