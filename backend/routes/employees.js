const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const Employee = require('../models/Employee');

// Create employee
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('position', 'Position is required').not().isEmpty(),
            check('department', 'Department is required').not().isEmpty(),
            check('dateOfJoining', 'Date of Joining is required').isDate(),
            check('salary', 'Salary is required').isNumeric(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, position, department, dateOfJoining, salary } = req.body;

        try {
            const newEmployee = new Employee({ name, position, department, dateOfJoining, salary });

            const employee = await newEmployee.save();
            res.json(employee);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Get all employees
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update employee
router.put('/:id', auth, async (req, res) => {
    const { name, position, department, dateOfJoining, salary } = req.body;

    const employeeFields = {};
    if (name) employeeFields.name = name;
    if (position) employeeFields.position = position;
    if (department) employeeFields.department = department;
    if (dateOfJoining) employeeFields.dateOfJoining = dateOfJoining;
    if (salary) employeeFields.salary = salary;

    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await Employee.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
