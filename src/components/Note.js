import { useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import {MdModeEditOutline} from "react-icons/md";

const Note = ({id, text, date, handleDeleteNote, handleEditNote}) => {

    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;
    const inputRef = useRef('');
    const [editMode, setEditMode] = useState(false);

    const handleChange = (event) =>{
        if(characterLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    }

    const handleFocus = () =>{
        inputRef.current.focus();
        setEditMode(true);
    }

    const handleOnClick = () =>{
        if(noteText.trim().length > 0){
            handleEditNote(id, noteText);
            setEditMode(false);
        }
        setEditMode(false);
    }
    return(
        <div className="note">
            <div className="edit-section">
                {/* <span>{text}</span> */}
                <textarea className="existing-note" rows="10" cols="30" ref={inputRef} onChange={handleChange}>{text}</textarea>
                <MdModeEditOutline className="edit-icon" size="1.3em" onClick={handleFocus} />
            </div>
            <div className="note-footer">
                <small>{date}</small>
                {editMode || <MdDeleteForever className="delete-icon" size="1.3em" onClick={() => handleDeleteNote(id)}/>}
                {editMode && <button className="save" onClick={handleOnClick}>Save</button>}
            </div>
        </div>
    );
};

export default Note;