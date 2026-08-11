
import '../css/modal.css'
export default function CreateEmployeeModal(props) {
    const { show, handleClose, handleCreate, newEmployee, setNewEmployee } = props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2 className='headingStyle'>New Employee</h2>
                <br />
                <div className='form-group'>
                    <div className="mb-3 mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Employee Name:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="name" placeholder="Enter Name" value={newEmployee.ename} onChange={(e)=>setNewEmployee({...newEmployee, ename: e.target.value })} autoComplete='off'/>
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="email" placeholder="Enter Email" value={newEmployee.email} onChange={(e)=>setNewEmployee({...newEmployee, email: e.target.value })} autoComplete='off'/>
                        </div>
                    </div>
                    <div className="mb-3 mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="sal" className="form-label">Salary:</label>
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="sal" placeholder="Enter Salary" value={newEmployee.sal} onChange={(e)=>setNewEmployee({...newEmployee, sal: e.target.value })}/>
                        </div>
                    </div>
                </div>
                <br />
                <button className="btn btn-danger" style={{ marginRight: "10px" }} onClick={handleCreate}>Save</button>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}