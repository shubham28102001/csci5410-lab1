import React,{useEffect,useState} from 'react';
import { Link, useLocation } from "react-router-dom";

const ViewNote = () => {
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
    }, []);

    return(
        <>
            <form>
                <textarea rows="5" cols="100" value={text}></textarea>
                <br></br>
                <br></br>
                <button type="close"><Link to={'/'}>Close</Link></button>
            </form>
        </>
    );
}

export default ViewNote;
