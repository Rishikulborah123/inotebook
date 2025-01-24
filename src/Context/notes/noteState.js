
import { useState } from "react";
import noteContext from "./noteContext";
const host ="http://localhost:5000";
const NoteState = (props)=>{
    const notesInitial = []
    const userInitial=[]
    const [notes, setNotes] = useState(notesInitial)
    const [user, setUser] = useState(userInitial)
    //GET USER DETAILS
    const getUser = async ()=>{
        const response = await fetch(`${host}/api/auth/getUser`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
        return json;
        
        

    }
    //GET ALL NOTES
    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchNotes`,{
            method:"GET",
            headers:{
                "content-type":"applocation/json",
                "auth-token":localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
        
    }
    //ADD A NOTE
    const addNote = async (title,description,tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json= await response.json();
        console.log(json);
        setNotes(notes.concat(json));
        // const note = {
        //     "_id": "6789e24b1bef098bafa99d86",
        //     "user": "67875a8213729b2cacfa1175",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2025-01-17T04:53:31.140Z",
        //     "__v": 0
        //   }
        //   setNotes(notes.concat(note))
    }
    //DELETE A NOTE
    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deleteNote${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        console.log("deleting the note with id:",id);
        setNotes(notes.filter((note)=>{return note._id!==id}));
    }
    //EDIT A NOTE

    const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote${id}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        let newNotes = notes.map((note)=>{
            return note._id===id?{...note,title,description,tag}:note;

        })
        console.log(json);
        setNotes(newNotes);
    }
    return(
        <noteContext.Provider value={{notes,user,addNote,deleteNote,getNotes,editNote,getUser}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;