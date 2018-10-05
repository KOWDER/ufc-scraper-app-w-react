import React from 'react';
import '../styles/FighterSearchForm.css';

export default ({onChange, onKeyPress, onClick, inputValue, fightersList}) => {
  return (
    <div className="fighter-search-form">
      <label htmlFor="fighter-input" className="search-label">Find an UFC fighter: </label>
      <input 
        type="text" 
        list="fighters-list"
        onKeyPress={onKeyPress} 
        onChange={onChange} 
        value={inputValue} 
        id="fighter-input"
      />
      <datalist id="fighters-list">
        {fightersList.map(fighter => 
          <option key={fighter.id} value={`${fighter.firstName} ${fighter.lastName}`} />
        )}
      </datalist>
      <button className="search-btn" onClick={onClick}>Search</button>
    </div>
  )
}
