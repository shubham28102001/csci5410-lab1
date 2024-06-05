import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');

    // function to save the note
    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/createNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={saveNote} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <textarea
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Write your note here..."
                ></textarea>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Create Note</button>
                    <Link to={'/'}>
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateNote;
