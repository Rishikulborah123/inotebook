import { React, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully", "success");

    }

    const handleChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 style={{ marginBottom: "30px" }} ><strong>Add a Note</strong></h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        <strong>Title</strong>
                    </label>
                    <input
                        type="title"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        minLength="5"
                        value={note.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        <strong>Description</strong> 
                    </label>
                    <textarea
                        rows="3"
                        type="description"
                        className="form-control"
                        id="description"
                        name="description"
                        minLength="5"
                        placeholder="The description should be atleast 5 characters"
                        value={note.description}
                        onChange={handleChange}>
                    </textarea>

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       <strong>Tag</strong> 
                    </label>
                    <input
                        type="tag"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                    />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary " onClick={handleClick}>
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default Addnote
