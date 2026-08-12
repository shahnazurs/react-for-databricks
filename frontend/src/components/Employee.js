import { useCallback, useEffect, useState } from "react";
import '../css/employees.css'
import DeleteEmployeeModal from "../modals/DeleteEmployeeModal";
import CreateEmployeeModal from "../modals/CreateEmployeeModal";
import EditEmployeeModal from "../modals/EditEmployeeModal";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Employee = () => {

    const [employees, setEmployees] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)

    const [newEmployee, setNewEmployee] = useState(null)

    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const [loading, setLoading] = useState(true)

    const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:5200" : "";


    const [departments, setDepartments] = useState([])


    const fetchDepartments = useCallback(() => {
        fetch(`${API_URL}/api/departments`)
            .then(res => res.json())
            .then(data => {
                setDepartments(data)
            })
    }, [API_URL]);

    const fetchEmployees = useCallback(() => {
        fetch(`${API_URL}/api/employees`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmployees(data)
                setLoading(false)

            })
    }, [API_URL]);

    const handleClose = () => {
        showDeleteModal && setShowDeleteModal(false)
        showCreateModal && setShowCreateModal(false)
        showEditModal && setShowEditModal(false)
    }

    const handleCreate = async () => {
        console.log(newEmployee)
        setShowCreateModal(false);

        try {
            const response = await fetch(`${API_URL}/api/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployee)
            });
            if (!response.ok) {
                throw new Error("Failed to delete employee")
            }
            fetchEmployees()
        }
        catch (error) {

        }
    }

    const handleEdit = async () => {
        setShowEditModal(false);
        try {
            const response = await fetch(`${API_URL}/api/employees/${selectedEmployee.empno}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEmployee)
            })
            if (!response.ok) {
                throw new Error("Failed to update Employee")
            }
            fetchEmployees()
        }
        catch (error) {

        }

    }

    const handleDelete = async () => {
        setShowDeleteModal(false)

        try {
            const response = await fetch(`${API_URL}/api/employees/${selectedEmployee.empno}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete employee")
            }
            fetchEmployees()
        }
        catch (error) {

        }

    }

    const handleCreateModal = () => {
        setNewEmployee({
            ename: "",
            email: "",
            sal: 0,
            deptno: 0
        })
        setShowCreateModal(true)
    }

    const handleEditModal = (employee) => {
        console.log(employee)
        setSelectedEmployee(employee);
        setShowEditModal(true)
    }

    const handleDeleteModal = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true)
    }

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees])

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments])
    return (
        <>
          
            <Link to="/" className="btn btn-secondary" style={{ "float": "right", "marginBottom": "20px", "marginRight": "20px" }}>Home</Link>
            <h2 className="heading" style={{ "clear": "both" }}>Employee Dashboard</h2>
             <Loader loading={loading} />

            <button className="btn btn-primary" style={{ "float": "right", "marginRight": "20px" }} onClick={handleCreateModal}>New Employee</button>
            <>

                {

                    showDeleteModal && <DeleteEmployeeModal show={showDeleteModal} handleClose={handleClose} handleDelete={handleDelete} selectedEmployee={selectedEmployee} />
                }
                {

                    showCreateModal && <CreateEmployeeModal show={showCreateModal} handleClose={handleClose} handleCreate={handleCreate} newEmployee={newEmployee} setNewEmployee={setNewEmployee} departments={departments} />

                }
                {
                    showEditModal && <EditEmployeeModal show={showEditModal} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} handleEdit={handleEdit} handleClose={handleClose} departments={departments} />
                }
            </>
           

            {

                employees.length > 0 ?
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee Id</th><th>Name</th><th>Email</th><th>Salary</th><th>Department Name</th><th colSpan={2}>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map(employee => (
                                        <tr key={employee.empno}>
                                            <td data-label="Employee Id">{employee.empno}</td>
                                            <td data-label="Name">{employee.ename}</td>
                                            <td data-label="Email">{employee.email}</td>
                                            <td data-label="Salary">{employee.sal}</td>
                                            <td data-label="Dname">{employee.dname}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary" onClick={() => handleEditModal(employee)}>Edit</button></td>

                                            <td><button type="button" onClick={() => handleDeleteModal(employee)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    :
                   <></>
            }
        </>
    );
}

export default Employee;