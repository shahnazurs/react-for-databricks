import { useCallback, useEffect, useState } from "react";
import '../css/employees.css'
import DeleteEmployeeModal from "../modals/DeleteEmployeeModal";
import CreateEmployeeModal from "../modals/CreateEmployeeModal";

const Employee = () => {

    const [employees, setEmployees] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)

    const [newEmployee, setNewEmployee] = useState(null)

    const [empno, setEmpno] = useState(null)

    const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:5200" : "";

    const fetchEmployees = useCallback(() => {
        fetch(`${API_URL}/api/employees`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmployees(data)
            })
    }, [API_URL]);

    const handleClose = () => {
        showDeleteModal && setShowDeleteModal(false)
        showCreateModal && setShowCreateModal(false)
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

    const handleDelete = async () => {
        console.log("Delete Employee-----" + empno)
        setShowDeleteModal(false)

        try {
            const response = await fetch(`${API_URL}/api/employees/${empno}`, {
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
            sal: 0
        })
        setShowCreateModal(true)
    }

    const handleDeleteModal = (empno) => {
        setEmpno(empno);
        setShowDeleteModal(true)
    }

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees])
    return (
        <>
            <h2 className="heading">Employee Dashboard</h2>

            <button className="btn btn-primary" style={{ "float": "right", "marginRight": "20px" }} onClick={handleCreateModal}>New Employee</button>
            <>

                {

                    showDeleteModal && <DeleteEmployeeModal show={showDeleteModal} handleClose={handleClose} handleDelet={handleDelete} />
                }
                {

                    showCreateModal && <CreateEmployeeModal show={showCreateModal} handleClose={handleClose} handleCreate={handleCreate} newEmployee={newEmployee}  setNewEmployee={setNewEmployee} />

                }
            </>

            {

                employees.length > 0 ?

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee Id</th><th>Name</th><th>Email</th><th>Salary</th><th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(employee => (
                                    <tr key={employee.empno}>
                                        <td>{employee.empno}</td>
                                        <td>{employee.ename}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.sal}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary">Edit</button>
                                            &nbsp;
                                            &nbsp;
                                            <button type="button" onClick={() => handleDeleteModal(employee.empno)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    :
                    <p>No employees fetched</p>
            }
        </>
    );
}

export default Employee;