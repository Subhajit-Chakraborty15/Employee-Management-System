import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: '',
        dateOfJoining: '',
        salary: '',
    });

    const { name, position, department, dateOfJoining, salary } = formData;

    const history = useHistory();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employees', formData);
            history.push('/employees');
        } catch (err) {
            console.error('Error adding employee:', err.response.data);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={position}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={department}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dateOfJoining">Date of Joining:</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={dateOfJoining}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={salary}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;

