import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const CreateNote = () => {
    const [text, setText] = useState('');
    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/createNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text})
            })
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            <form onSubmit={saveNote}>
                <textarea rows="5" cols="100" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <br></br>
                <br></br>
                <button type="submit" style={{'marginRight': '10px'}}>Create Note</button>
                <button type="close"><Link to={'/'}>Close</Link></button>
            </form>
        </>
    );
}

export default CreateNote;
