import React from 'react';

// 這是一個簡單的段落組件，接收text（文本內容）和color（背景顏色）作為props
function Paragraph({ text, color }) {
  return (
    <section style={{ backgroundColor: color, padding: '20px', color: 'white' }}>
      <p>{text}</p>
    </section>
  );
}

export default Paragraph;
