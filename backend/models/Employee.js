import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true, // يمنع تكرار الإيميل
        match: /.+\@.+\..+/ // يتحقق من صيغة الإيميل
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;