import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2'

const NoteBar = ({ isShowNoteBar, setIsShowNoteBar, selectedText }) => {
  const { user } = useAuth()
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch(`/api/users/note?email=${user.email}`)
      .then(res => res.json())
      .then(data => setNotes(data.notes || []))
  }, [user.email])


  const saveNote = () => {
    const allNotes = [...notes, { note, selectedText }]
    const noteObj = { allNotes, email: user.email }
    fetch(`/api/users/note`, {
      method: "PUT",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(noteObj)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Your Note added successfully`,
          })
          setIsShowNoteBar(false)
          setNote('')
        }
      })
  }
  return (
    <div className={isShowNoteBar ? 'w-96 bg-white fixed h-screen top-0 right-0 z-50 py-16 px-3 transition-right duration-300' : 'w-96 bg-white fixed h-screen top-0 -right-96 z-50 py-16 px-3 transition-right duration-300'}>
      <h1>{`${user.displayName}'s Note`}</h1>
      <textarea value={selectedText || ''} rows="10" className='w-full outline-0 bg-red-100 my-2 p-2'></textarea>
      <textarea placeholder='Title' value={note || ''} onChange={(e) => setNote(e.target.value)} type="text" className='w-full py-1 px-2 bg-red-200 outline-0 mb-2' />
      <button onClick={saveNote} className='py-1 px-3 bg-blue-500 rounded-full text-white'>Add Note</button>
      <button onClick={() => setIsShowNoteBar(false)} className='py-1 px-3 bg-red-500 rounded-full text-white ml-2'>Cencel</button>
    </div>
  );
};

export default NoteBar;