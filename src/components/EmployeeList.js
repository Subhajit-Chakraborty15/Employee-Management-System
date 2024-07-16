import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/employees');
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err.response.data);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee._id}>
                        <strong>{employee.name}</strong> - {employee.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
