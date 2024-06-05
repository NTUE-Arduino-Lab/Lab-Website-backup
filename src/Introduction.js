import React from 'react';

function Introduction({ height }) {
  return (
    <div id="introduction" style={{ height, backgroundColor: 'lightblue', padding: '20px' }}>
      <p>這裡是簡介文本...</p>
    </div>
  );
}

export default Introduction;
