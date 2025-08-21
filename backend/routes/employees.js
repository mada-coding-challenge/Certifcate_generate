import express from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";
import Employee from "../models/Employee.js";

const router = express.Router();
const upload = multer({
    dest: "uploads/"
});

// رفع ملف CSV للموظفين
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                await Employee.insertMany(results);
                res.json({
                    message: "بيانات الموظفين تم رفعها بنجاح"
                });
            });
    } catch (err) {
        res.status(500).json({
            error: "لا يمكن رفع نفس المعلومات مرتين"
        });
    }
});

// جلب كل الموظفين
router.get("/", async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

export default router;