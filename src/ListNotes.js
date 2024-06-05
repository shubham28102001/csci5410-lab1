import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'

const ListNotes = () => {
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        try {
            const res = await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/listNotes');
            const data = await res.json();
            setNotes(data.notes ? data.notes : []);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/deleteNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({noteId})
            })
            getNotes();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
        <button><Link to={'/create'}>Create Note</Link></button>
        <ul>
        {notes ? notes.map((note, index) => (
            <div key={note.noteId}>
            <div>
                <p>Note: {index+1}</p>
                <p>Created At: {note.createdAt.toString()}</p>
            </div>
                <button style={{'marginRight': '10px'}}><Link to={'/edit'} state={{noteId: note.noteId}}>Edit Note</Link></button>
                <button style={{'marginRight': '10px'}}><Link to={'/view'} state={{noteId: note.noteId}}>View Note</Link></button>
                <button onClick={() => deleteNote(note.noteId)}>Delete Note</button>
                <br></br>
                <br></br>
                <hr></hr>
            </div>
        )) : <></>}
        </ul>
        </>
    );
};

export default ListNotes;
