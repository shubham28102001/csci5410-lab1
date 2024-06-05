import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const ViewNote = () => {
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

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <textarea
                    rows="5"
                    value={text}
                    readOnly
                    className="w-full p-2 border rounded mb-4"
                ></textarea>
                <div className="flex justify-end">
                    <Link to={'/'}>
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ViewNote;