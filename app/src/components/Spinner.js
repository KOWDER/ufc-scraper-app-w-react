import React from 'react';
import spinner from '../assets/spinner.gif';

export default () => {
  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={spinner} alt="Loading..." style={{ width: '50px', margin: '0 auto', display: 'block'}}/>
    </div>
  )
}
