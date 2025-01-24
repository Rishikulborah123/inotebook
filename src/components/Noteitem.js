import {React } from 'react'

const Noteitem = (props) => {
    const { note ,updateNote,permanentDelete} = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card " >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                        {note.description}
                    </p>
                    <p className="card-text">
                        #{note.tag}
                    </p>
                    <i style={{cursor:"pointer"}} className="fas fa-trash-alt mx-2  " onClick={()=>{permanentDelete(note)
                    console.log(note._id)
                    }}></i>
                    <i style={{cursor:"pointer"}} className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>

        </div>
    )
}

export default Noteitem
