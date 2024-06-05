import React from 'react';
import './Title.css'

function Title({ height }) {
  return (
    <div className='title_main' id="title" style={{ height }}>
      <div className='title_bg'>
        <div className='title_bgm'></div>
        <div className='title_bgl'></div>
        <div className='title_bgr'></div>
      </div>
      <div className='title_text'>
        <p className='title_text1'>探索虛實交匯的創意領域</p>
        <p className='title_text2'>啟動創新互動的設計宇宙</p>
        <p className='title_text3'>重塑前端設計與遊戲設計，開拓UI/UX的新疆域</p>
        <p className='title_text4'>重塑設計邊界，開拓未知疆域</p>
        <div className='title_arrow'>

        </div>
      </div>
    </div>

  );
}

export default Title;
