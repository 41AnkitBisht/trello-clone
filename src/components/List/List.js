import React, { useContext, useState, useEffect } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { SearchContext } from '../../App';
import { Card } from '../Card';
import InputContainer from '../InputContainer/InputContainer';
import { Title } from '../Title';
import "./styles.css";

const List = ({ list, index }) => {
    const searchvalue = useContext(SearchContext);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        function filter(card_arr, item){
            if(item.title.includes(searchvalue))card_arr.push(item)
            return card_arr
        }
      if(searchvalue && list.cards.length > 0) {
        let filterdata = list.cards.reduce( filter,[])
        setFilteredData(filterdata)
      }
    }, [searchvalue])
    
    return (
        <Draggable draggableId={list.id} index={index}>
            {
                (provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <div className='list-cards' {...provided.dragHandleProps}>
                            <div className='title-list'>
                                <Title title={list.title} listId={list.id} />
                            </div>
                            <div className='container-cards'>
                                <Droppable droppableId={list.id} type='task'>
                                    {
                                        (provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="card-container"
                                            >
                                                {searchvalue ? 
                                                
                                                filteredData?.map((card,index) => {
                                                    return <Card
                                                    key={card.id}
                                                    card={card}
                                                    index={index}
                                                    listId={list.id}
                                                    list={list} />
                                                })
                                                : list.cards.map((card,index) => {
                                                    return <Card
                                                    key={card.id}
                                                    card={card}
                                                    index={index}
                                                    listId={list.id}
                                                    list={list} />
                                                })  }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </div>
                            <InputContainer listId={list.id} type="card" />
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default List