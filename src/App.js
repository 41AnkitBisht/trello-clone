import React, { createContext, useState } from "react";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";

export const SearchContext = createContext();

const App = () => {
  const [searchvalue, setSearchValue] = useState('');

  return <div>
    <SearchContext.Provider value={searchvalue} >
      <Navbar setSearchValue={e => setSearchValue(e.target.value)} />
      <Home />
    </SearchContext.Provider>
  </div>

}

export default App;