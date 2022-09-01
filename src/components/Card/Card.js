import React,{useState, useContext} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import StoreApi from '../../utils.js/storeApi';
import "./styles.css"

const Card = ({card,listId, index, list}) => {
    const [open, setOpen] = useState(false);
    const  [newtitle, setNewTitle] = useState(card.title);
    const { removeCard, updateCardTitle } = useContext(StoreApi);

    const handleblur = (cardId) =>{
        updateCardTitle(newtitle, index, listId, cardId);
        setOpen(!open)
    }
    
  return (
   <Draggable draggableId={card.id} index={index} isDragDisabled={list.title == "Completed"}>
    {
        (provided) =>(
            <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            >
                <div className='card-content'>
                {open ? <textarea 
                className='input-card-title' 
                value={newtitle} 
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleblur(card.id)
                    }
                    return
                }}
                onBlur={handleblur}
                autoFocus
                /> : 
                <div onClick={() => setOpen(!open) } className='card-title-container'>
                    <div className='card-info tooltip'>
                        <p>Title : {card.title}</p>
                        <p>Assigned : {card.assigned}</p>
                        <p>Attachments: {card.filename}</p>
                        {card.comment && <span className="tooltiptext">{card.comment}</span>}
                    </div>
                    <button 
                    onClick={() => {removeCard(index, listId, card.id);}}>
                        <span className="delete">🗑</span>
                    </button>
                </div>}
                </div>
            </div>
        )
    }
   </Draggable>
  )
}

export default Card