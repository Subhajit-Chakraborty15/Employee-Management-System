import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/employees/${id}`);
                setEmployee(response.data);
            } catch (err) {
                console.error('Error fetching employee:', err.response.data);
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) return <div>Loading...</div>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
        </div>
    );
};

export default EmployeeDetail;
