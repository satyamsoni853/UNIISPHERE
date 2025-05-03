import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Feature() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ display: 'inline', marginRight: '10px' }}>Features</h1>
      <span style={{ display: 'inline', marginRight: '10px' }}>
        Explore our amazing features
      </span>
      <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: '20px' }} />
    </div>
  );
}

export default Feature;