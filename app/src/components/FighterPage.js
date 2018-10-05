import React from 'react';
import FighterProfile from './FighterProfile';
import FighterSearchForm from './FighterSearchForm';
import Spinner from './Spinner';


export default ({loading, data, handleChange, handleSearch, handleKeyPress}) => {
  return(
    <div className="fighter-page">
      <FighterSearchForm 
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onClick={handleSearch} 
        inputValue={data.inputBox}
        fightersList={data.fighters}
        />
      {loading ? <Spinner /> : data.profile.length > 0 && <FighterProfile profile={data.profile} />}
    </div>    
  )
}