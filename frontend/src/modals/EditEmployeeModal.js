
import { useEffect, useRef, useState } from 'react';
import '../css/modal.css'
export default function EditEmployeeModal(props) {
    const { show, handleClose, handleEdit, selectedEmployee, setSelectedEmployee, departments } = props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const salInputRef = useRef(null);


    const [errors, setErrors] = useState({})

    const newErrors = {}

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedEmployee.ename?.trim()) {
            newErrors.ename = "Employee Name is required";
        }
        if (!selectedEmployee.email?.trim()) {
            newErrors.email = "Email is required";
        }
        if (selectedEmployee.sal === "") {
            newErrors.sal = "Salary is required";
        }

        if (selectedEmployee.sal > 999999) {
            newErrors.sal = "Salary cannot exceed 999,999";
        }

        setErrors(newErrors);


        if (newErrors.ename) {
            nameInputRef.current.focus();
            return;
        }
        if (newErrors.email) {
            emailInputRef.current.focus();
            return;
        }
        if (newErrors.sal) {
            salInputRef.current.focus();
            return;
        }

        handleEdit();
    }

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2 className='headingStyle' style={{ "userSelect": "none" }}>Edit Employee</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="empno" className="form-label" >Employee Number:</label>
                            </div>
                            <div className="col-md-6">
                                <input type="number" className="form-control" name="empno" id="empno" placeholder="Enter Name" value={selectedEmployee.empno} disabled />
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Employee Name:</label>
                            </div>
                            <div className="col-md-6">
                                <input ref={nameInputRef} type="text" className="form-control" name="name" placeholder="Enter Name" value={selectedEmployee.ename}
                                    onChange={(e) => {
                                        setSelectedEmployee({ ...selectedEmployee, ename: e.target.value });
                                        if (errors.ename) {
                                            setErrors({ ...errors, ename: "" })
                                        }
                                    }}
                                    autoComplete='off' maxLength={25} />
                                {errors.ename && (<div className='employee-error'> {errors.ename} </div>)}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email:</label>
                            </div>
                            <div className="col-md-6">
                                <input type="email" ref={emailInputRef} className="form-control" name="email" placeholder="Enter Email" value={selectedEmployee.email}
                                    onChange={(e) => {
                                        setSelectedEmployee({ ...selectedEmployee, email: e.target.value });
                                        if (errors.email) {
                                            setErrors({ ...errors, email: "" })
                                        }
                                    }}
                                    autoComplete='off' maxLength={50} />
                                {errors.email && (<div className='employee-error'> {errors.email} </div>)}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="sal" className="form-label">Salary:</label>
                            </div>
                            <div className="col-md-6">
                                <input type="number" ref={salInputRef} className="form-control" name="sal" placeholder="Enter Salary" value={selectedEmployee.sal}
                                    onChange={(e) => {
                                        setSelectedEmployee({ ...selectedEmployee, sal: e.target.value })
                                        if (errors.sal) {
                                            setErrors({ ...errors, sal: "" })
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (["e", "E", "-", "+"].includes(e.key)) {
                                            e.preventDefault()
                                        }
                                    }} />
                                {errors.sal && (<div className='employee-error'> {errors.sal} </div>)}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="sal" className="form-label">Department Name:</label>
                            </div>
                            <div className="col-md-6">
                                    <select className="form-select" value={selectedEmployee.deptno} onChange={(e)=>setSelectedEmployee({...selectedEmployee, deptno : e.target.value})}>
                                        {
                                            departments.map((department)=>{
                                                return <option key={department.deptno} value={department.deptno}>{department.dname}</option>
                                            })
                                        }
                                    </select>
                            </div>
                        </div>


                    </div>
                    <button className="btn btn-danger" type="submit" style={{ marginRight: "10px" }}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                </form>
                <br />

            </section>
        </div>
    )
}