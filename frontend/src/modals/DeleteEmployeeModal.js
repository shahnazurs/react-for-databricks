
import '../css/modal.css'
export default function DeleteEmployeeModal(props) {
    const { show, handleClose, handleDelete } = props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2 className='headingStyle'>Delete Employee</h2>
                <p>Are you sure ?</p>
                <button className="btn btn-danger" style={{ marginRight: "10px" }} onClick={handleDelete}>Confirm</button>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}