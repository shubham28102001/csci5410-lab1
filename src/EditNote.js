import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const EditNote = () => {
    const { state } = useLocation();
    const [text, setText] = useState('');
    const [noteId, setNoteId] = useState(state.noteId);

    const fetchNote = async () => {
        try {
            const res = await fetch(`https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/viewNote?noteId=${noteId}`);
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
                body: JSON.stringify({ noteId, text })
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={updateNote} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <textarea
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Edit your note here..."
                ></textarea>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Note</button>
                    <Link to={'/'}>
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditNote;
