
import { useEffect, useRef, useState } from 'react';
import '../css/modal.css'
export default function CreateEmployeeModal(props) {
    const { show, handleClose, handleCreate, newEmployee, setNewEmployee, departments } = props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const salInputRef = useRef(null);

    const [errors, setErrors] = useState({})


    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted")
        const newErrors = {};

        if (!newEmployee.ename?.trim()) {
            newErrors.ename = "Employee Name is required";
        }

        if (!newEmployee.email?.trim()) {
            newErrors.email = "Email is required";
        }
        if (newEmployee.sal === "") {
            newErrors.sal = "Salary is required";
        }
        if (newEmployee.sal > 999999) {
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

        //if (Object.keys(newErrors).length > 0) { return; }

        handleCreate();
    }
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2 className='headingStyle' style={{ "userSelect": "none" }}>New Employee</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Employee Name:</label>
                            </div>
                            <div className="col-md-6">
                                <input ref={nameInputRef} type="text" className="form-control" name="name" placeholder="Enter Name" value={newEmployee.ename}
                                    onChange={(e) => {
                                        setNewEmployee({ ...newEmployee, ename: e.target.value });
                                        if (errors.ename) {
                                            setErrors({ ...errors, ename: "" })
                                        }
                                    }
                                    }
                                    autoComplete='off' maxLength={25} />
                                {errors.ename && (<div className='employee-error'> {errors.ename} </div>)}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email:</label>
                            </div>
                            <div className="col-md-6">
                                <input type="email" ref={emailInputRef} className="form-control" name="email" placeholder="Enter Email" value={newEmployee.email}
                                    onChange={(e) => {
                                        setNewEmployee({ ...newEmployee, email: e.target.value });
                                        if (errors.email) {
                                            setErrors({ ...errors, email: "" })
                                        }
                                    }} autoComplete='off' maxLength={50} />
                                {errors.email && (<div className='employee-error'> {errors.email} </div>)}
                            </div>
                        </div>
                        <div className="mb-3 mt-3 row">
                            <div className="col-md-6">
                                <label htmlFor="sal" className="form-label">Salary:</label>
                            </div>
                            <div className="col-md-6">
                                <input type="number" ref={salInputRef} className="form-control" name="sal" placeholder="Enter Salary" value={newEmployee.sal}
                                    onChange={(e) => {
                                        setNewEmployee({ ...newEmployee, sal: e.target.value });
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
                                    <select className='form-select' value={newEmployee.deptno} onChange={(e)=>setNewEmployee({...newEmployee, deptno: e.target.value})}>
                                        {
                                            departments.map((department)=>{
                                                return <option value={department.deptno} key={department.deptno}>{department.dname}</option>
                                            })
                                        }
                                    </select>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger" style={{ marginRight: "10px" }} type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={handleClose}>Close</button>
                </form>
                <br />

            </section>
        </div>
    )
}