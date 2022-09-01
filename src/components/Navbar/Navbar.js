import React from 'react'
import "./styles.css";

const Navbar = ({setSearchValue }) => {
  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  return (
    <div className='nav-container'>
        <h1 className='nav-heading'>📙 Trello Board Clone</h1>
        <input className='search-bar' placeholder='🔎' onChange={debounce(setSearchValue)} />
    </div>
  )
}

export default Navbar