const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    salary: { type: Number, required: true },
});

module.exports = mongoose.model('employee', EmployeeSchema);
