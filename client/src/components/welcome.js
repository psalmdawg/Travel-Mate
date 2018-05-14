import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div>

    <div style={{margin:'0 auto', display:'relative'}}>

      <div style={{position:'absolute', color:'white', left: '32px', top: '63px'}}>
        <div>Share your Journeys with the world ...or just a few friends :) </div>
        <div><Link style={{color:'white'}} to='/access'>Sign up today to get started!</Link></div>
      </div>

      <img style={{width:"100%"}}
        src="https://www.turquoiseholidays.co.uk/blog/wp-content/uploads/2012/06/Beach-View-2-Large.jpg">
      </img>
    </div>

  </div>
);

export default Welcome;
