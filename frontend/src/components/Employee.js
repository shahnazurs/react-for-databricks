import { useEffect, useState } from "react";

const Employee = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("/api/employees")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmployees(data)
            })
    }, [])
    return (
        <>
            <h2>Employee Dashboard</h2>
            {
                employees.length > 0 ?

                        <table>
                            <thead>
                                <tr>
                                    <th>Employee Id</th><th>Name</th><th>Email</th><th>Salary</th>
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
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    :
                    <p>Loading.....</p>
            }
        </>
    );
}

export default Employee;