import React,{useEffect,useState} from 'react';
import { Link, useLocation } from "react-router-dom";

const EditNote = () => {
    const { state } = useLocation();
    const [text, setText] = useState('');
    const [noteId, setNoteId] = useState(state.noteId);
    
    const fetchNote = async () => {
        try {
            const res = await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/viewNote?noteId='+noteId);
            const data = await res.json();
            setText(data.text);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchNote();
        // eslint-disable-next-line
    }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/editNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({noteId:noteId,text})
            })
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            <form onSubmit={updateNote}>
                <textarea rows="5" cols="100" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <br></br>
                <br></br>
                <button type="submit" style={{'marginRight': '10px'}}>Update Note</button>
                <button type="close"><Link to={'/'}>Close</Link></button>
            </form>
        </>
    );
}

export default EditNote;
