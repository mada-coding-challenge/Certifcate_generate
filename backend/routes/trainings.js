import express from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";
import Training from "../models/Training.js";

const router = express.Router();
const upload = multer({
    dest: "uploads/"
});

// رفع ملف CSV للدورات
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                await Training.insertMany(results);
                res.json({
                    message: "بيانات التدريب تم رفعها بنجاح"
                });
            });
    } catch (err) {
        res.status(500).json({
            error: "لا يمكن رفع نفس المعلومات مرتين"
        });
    }
});

// جلب كل الدورات
router.get("/", async (req, res) => {
    const trainings = await Training.find();
    res.json(trainings);
});

export default router;