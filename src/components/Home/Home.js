import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '../List';
import data from '../../utils.js/sample';
import InputContainer from '../InputContainer/InputContainer';
import {v4 as uuid} from 'uuid';
import {addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";
import {db, timestamp} from '../../firebase';
import StoreApi from '../../utils.js/storeApi';
import "./styles.css";
import { Modal } from '../common';

const Home = () => {
    const [lists, setLists] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [cardinfo, setCardInfo] = useState({});

    useEffect(()=>{
        const q = query(collection(db, 'lists'), orderBy('timestamp','asc'));
        onSnapshot(q, (snapShot) => {
            setLists(
                snapShot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
            )
        })
    },[])

    const addMoreCard= async(info,listId)=>{
        const title = info.title
        const filename = info.file.name ?? ''
        const assigned = info.assigned
        
        if(!info.title){
            return;
        }

        const newCardId = uuid();
        const newCard ={
            id : newCardId,
            title,
            assigned,
            filename
        }
        const listRef = doc(db, 'lists', listId)

        await updateDoc(listRef,{
            cards: arrayUnion(newCard)
        })
    }
    const removeCard = async (index, listId, cardId) => {
        const listRef = doc(db, "lists", listId);
    
        lists.forEach(async (list) => {
          if (list.id === listId) {
            list.cards.splice(index, 1);
            await updateDoc(listRef, {
              cards: list.cards.filter((card) => card.id !== cardId),
            });
          }
          return list;
        });
      };

      const updateCardTitle = (title = '', index, listId, cardId,comment = '') => {
       
        const listRef = doc(db, "lists", listId);
    
        lists.forEach(async (list) => {
          if (list.id === listId) {
            if(title)list.cards[index].title = title;
            if(comment)list.cards[index].comment = comment;
            await updateDoc(listRef, {
              cards: list.cards.map((card) => {
                if (card.id === cardId) {
                  if(title)card.title = title;
                  if(comment)card.comment = comment;
                  return card;
                }
                return card;
              }),
            });
          }
          return list;
        });
      };
      const addMoreList = async (title) => {
        
        if (!title) {
          return;
        }
        await addDoc(collection(db, "lists"), {
          title,
          cards: [],
          timestamp
        });
      };
    
      const updateListTitle = (title, listId) => {
        const listRef = doc(db, "lists", listId);
    
        lists.forEach(async (list) => {
          if (list.id === listId) {
            list.title = title;
            await updateDoc(listRef, {
              title: title,
            });
          }
          return list;
        });
      };
    
      const deleteList = async (listId) => {
        await deleteDoc(doc(db, "lists", listId));
      };
      const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        Object.keys(cardinfo).length ==0 &&  setCardInfo({destination, source,draggableId, type})
        console.log({type})

        if (!destination) {
            return;
          }

        if(lists.find((list) => list.id === destination.droppableId)?.title =="Completed"){
            setModalOpen(true);
            return 
          }
      
        if (type === "list") {
          const destinationRef = doc(db, "lists", lists[destination.index].id);
          const sourceRef = doc(db, "lists", lists[source.index].id);
          await updateDoc(destinationRef, {
            timestamp: lists[source.index].timestamp,
          });
          await updateDoc(sourceRef, {
            timestamp: lists[destination.index].timestamp,
          });
          return;
        }
    
        if (source.droppableId === destination.droppableId) {
          const list = lists.find((list) => list.id === source.droppableId);
    
          const updatedCards = list.cards.map((card, index) => {
            if (index === source.index) {
              return list.cards[destination.index];
            }
            if (index === destination.index) {
              return list.cards[source.index];
            }
            return card;
          });
          const listRef = doc(db, "lists", destination.droppableId);
          await updateDoc(listRef, {
            cards: updatedCards,
          });
        } else {
          const sourceList = lists.find((list) => list.id === source.droppableId);
          const destinationList = lists.find(
            (list) => list.id === destination.droppableId
          );
          const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
          )[0];
    
          console.log(sourceList, destinationList);
          const sourceListRef = doc(db, "lists", source.droppableId);
    
          sourceList.cards.splice(source.index, 1);
          await updateDoc(sourceListRef, {
            cards: sourceList.cards,
          });
    
          const destinationListRef = doc(db, "lists", destination.droppableId);
          destinationList.cards.splice(destination.index, 0, draggingCard);
    
          await updateDoc(destinationListRef, {
            cards: destinationList.cards,
          });
        
    }
    
        
       
      };
    const handleAddComment = async() =>{
        const { destination, source, draggableId, type } = cardinfo;
        updateCardTitle('', source.index, source.droppableId, draggableId, comment)
        setModalOpen(false);
     
        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destinationList = lists.find(
          (list) => list.id === destination.droppableId
        );
        const draggingCard = sourceList?.cards.filter(
          (card) => card.id === draggableId
        )[0];
  
        console.log(sourceList, destinationList);
        const sourceListRef = doc(db, "lists", source.droppableId);
  
        sourceList.cards.splice(source.index, 1);
        await updateDoc(sourceListRef, {
          cards: sourceList.cards,
        });
  
        const destinationListRef = doc(db, "lists", destination.droppableId);
        destinationList.cards.splice(destination.index, 0, draggingCard);
  
        await updateDoc(destinationListRef, {
          cards: destinationList.cards,
        });
        setComment('');
        setCardInfo({});


    }
    return (
        <StoreApi.Provider
        value={{
            addMoreCard,
            addMoreList,
            updateCardTitle,
            removeCard,
            updateListTitle,
            deleteList
        }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='app' type='list' direction='horizontal'>
                    {
                        (provided) => (
                            <div className='wrapper' ref={provided.innerRef} >
                                {lists.map((list, index) => {
                                    return <List list={list} key={list.id} index={index} />
                                })}
                                <div>
                                    <InputContainer type="list" />
                                </div>
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
            {modalOpen && <Modal handleClose={() => setModalOpen(false)}>
                <div>
                    <textarea 
                        className='comment-text' 
                        placeholder='Add a comment'
                        autoFocus
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <button className='button-confirm' onClick={handleAddComment}> Comment</button>
                </Modal>}
        </StoreApi.Provider>
    )
}

export default Home