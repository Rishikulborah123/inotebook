import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, deleteNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
        getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
        console.log("updating the note", currentNote);
    }
    const delRef = useRef(null);
    const refDelClose = useRef(null);
    const HandleDelete = () => {
        deleteNote(note.id);
        refDelClose.current.click();
        console.log("deleting the note", note);
        props.showAlert("Note Deleted Successfully", "danger");

    }
    const permanentDelete = (currentNote) => {
        delRef.current.click(); 
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })

    }

    return (
        <>
            <Addnote showAlert={props.showAlert}  />
            <>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    ref={ref}
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Update Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"

                                />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <strong>Title</strong>
                                        </label>
                                        <input
                                            type="etitle"
                                            className="form-control"
                                            id="etitle"
                                            name="etitle"
                                            aria-describedby="emailHelp"
                                            value={note.etitle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            <strong>Description</strong>
                                        </label>
                                        <textarea
                                            rows="3"
                                            type="edescription"
                                            className="form-control"
                                            id="edescription"
                                            name="edescription"
                                            value={note.edescription}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <strong>Tag</strong>
                                        </label>
                                        <input
                                            type="etag"
                                            className="form-control"
                                            id="etag"
                                            name="etag"
                                            aria-describedby="emailHelp"
                                            value={note.etag}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={refClose}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary " onClick={handleClick}>
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    ref={delRef}
                >
                    Launch static backdrop modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Delete Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">Do you want to Delete The Note</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={refDelClose}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-danger"  onClick={HandleDelete} >
                                    Delete Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>




            <div className="row my-3">
                <h2 style={{ marginTop: "30px", marginBottom: "30px" }} ><strong>Your Notes</strong></h2>
                {notes.map((note) => {
                    return <Noteitem note={note} updateNote={updateNote} permanentDelete={permanentDelete} key={note._id} />;
                })}
            </div>
        </>
    )
}

export default Notes
