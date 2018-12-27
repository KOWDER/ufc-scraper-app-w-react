import React from 'react';
import FighterProfile from './FighterProfile';
import FighterSearchForm from './FighterSearchForm';
import Spinner from './Spinner';


export default ({loading, fighters, profile, inputBox, handleChange, handleSearch, handleKeyPress}) => {
  return(
    <div className="fighter-page">
      <FighterSearchForm 
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onClick={handleSearch} 
        inputValue={inputBox}
        fightersList={fighters}
        />
      {loading ? <Spinner /> : profile.length > 0 && <FighterProfile profile={profile} />}
    </div>    
  )
}