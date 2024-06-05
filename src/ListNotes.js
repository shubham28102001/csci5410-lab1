import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListNotes = () => {
    const [notes, setNotes] = useState([]);

    // function to getch all notes
    const getNotes = async () => {
        try {
            const res = await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/listNotes');
            const data = await res.json();
            setNotes(data.notes ? data.notes : []);
        } catch (e) {
            console.log(e);
        }
    };

    // function to delete the note based on noteid
    const deleteNote = async (noteId) => {
        try {
            await fetch('https://p2pcrkofe4.execute-api.us-east-1.amazonaws.com/test/deleteNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ noteId })
            });
            getNotes();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">ShareNotes</h1>
            <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
                <Link to={'/create'}>Create Note</Link>
            </button>
            <ul className="w-full max-w-md">
                {notes && notes.length > 0 ? notes.map((note, index) => (
                    <div key={note.noteId} className="bg-white p-4 mb-4 rounded shadow-md">
                        <div>
                            <p className="font-semibold">Note: {index + 1}</p>
                            <p className="text-gray-600">Created At: {new Date(note.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex mt-2">
                            <button className="mr-2 bg-green-500 text-white px-2 py-1 rounded">
                                <Link to={'/edit'} state={{ noteId: note.noteId }}>Edit Note</Link>
                            </button>
                            <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                                <Link to={'/view'} state={{ noteId: note.noteId }}>View Note</Link>
                            </button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteNote(note.noteId)}>Delete Note</button>
                        </div>
                    </div>
                )) : <p className="text-center text-gray-600">No notes available</p>}
            </ul>
        </div>
    );
};

export default ListNotes;
