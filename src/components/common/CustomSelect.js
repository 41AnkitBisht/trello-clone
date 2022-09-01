import React from 'react'
import "./styles.css"

const CustomSelect = ({options, setAssigned}) => {
  return (
    <div className="custom-select" >
      <select onChange={setAssigned}>
        <option value="assign to me">Assign To Me</option>
        {options.map((option,index) => {
          return <option key={index} value={option}>{option.toUpperCase()}</option>
        })}
      </select>
    </div>
  )
}

export default CustomSelect