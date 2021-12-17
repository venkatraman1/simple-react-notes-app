import { useState } from "react";

const AddNote = ({handleAddNote}) => {
    const [noteText, setNoteText] = useState('');

    const characterLimit = 200;

    const handleChange = (event) =>{
        if(characterLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    }
    const handleOnClick = () =>{
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return(
        <div className="note new">
            <textarea rows="8" cols="10" placeholder="Add your note here ..." onChange={handleChange} value={noteText}></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} remaining</small>
                <button className="save" onClick={handleOnClick}>Save</button>
            </div>
        </div>
    );
}

export default AddNote;