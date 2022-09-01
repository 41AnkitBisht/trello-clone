import React,{useContext, useState} from 'react'
import StoreApi from '../../utils.js/storeApi';
import CustomSelect from '../common/CustomSelect';
import UploadButton from '../common/UploadButton';
import "./styles.css"

const InputCard = ({ setOpen, listId, type, index }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [assigned, setAssigned] = useState('assign to me');
    const {addMoreCard, addMoreList} = useContext(StoreApi);

    const handleSubmit = () => {
      
        if(type === 'card'){
            addMoreCard({title, file, assigned},listId);
        }else{
            addMoreList(title)
        }
        setOpen(false)
        setTitle('')
    }
    return (
        <div className='input-card'>
            <div className='input-card-container'>
                <textarea 
                    className='input-text' 
                    placeholder={type == "card" ? "Enter a title for this card" : 'Enter list title'}
                    autoFocus
                    onChange={e => setTitle(e.target.value)}
                    />
                <div className='upload'>
                <UploadButton 
                        UploadUI={<span style={{fontSize: '15px'}}>🗂  Upload</span>} 
                        handleChange={(e) => setFile(e.target.files[0])} 
                    />
                { file?.name}
                </div>
                <CustomSelect setAssigned={e => setAssigned(e.target.value)} options={['person1', 'person2']} />
            </div>
            <div className='confirm'>
                <button className='button-confirm' onClick={handleSubmit}>
                    {type=="card"? "Add Card" : "Add List"}
                </button>
                <button className='button-cancel' onClick={() => {setTitle('');setOpen(false)}}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default InputCard