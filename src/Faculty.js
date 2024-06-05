import React from 'react';
import './Faculty.css'

function Faculty() {
  return (
    <div id="faculty">
      <div className='faculty_main'>
        <div className='faculty_fan'>
          <div className='faculty_planet1'></div>
          <div className='faculty_np'>
            <p className='faculty_name'>范丙林</p>
            <p className='faculty_position'>特聘教授兼研發長</p>
          </div>
          <div className='faculty_img1'></div>
          <div className='faculty_content'>
            <p className='faculty_eq'>國立中央大學光電科學研究所博士</p>
            <div>
              <div className='faculty_email'>
                <div className='faculty_icon1'></div>
                <p className='faculty_text'>plfan@tea.ntue.edu.tw</p>
              </div>
              <div className='faculty_phone'>
                <div className='faculty_icon2'></div>
                <p className='faculty_text'>(02)2732-1104 #52472、63432</p>
              </div>
              <div className='faculty_expertise'>
                <div className='faculty_icon3'></div>
                <p className='faculty_text'>桌遊設計、2D與3D遊戲程式設計、多媒體互動裝置研究與開發、AR.VR.MR應用設計</p>
              </div>
            </div>
          </div>
        </div>
        <div className='faculty_yu'>
          <div className='faculty_planet2'></div>
          <div className='faculty_np'>
            <p className='faculty_name'>俞齊山</p>
            <p className='faculty_position'>教授</p>
          </div>
          <div className='faculty_img2'></div>
          <div className='faculty_content'>
            <p className='faculty_eq'>國立台灣大學電機工程博士</p>
            <div>
              <div className='faculty_email'>
                <div className='faculty_icon1'></div>
                <p className='faculty_text'>chsyu@tea.ntue.edu.tw</p>
              </div>
              <div className='faculty_phone'>
                <div className='faculty_icon2'></div>
                <p className='faculty_text'>(02)2732-1104 #55528</p>
              </div>
              <div className='faculty_expertise'>
                <div className='faculty_icon3'></div>
                <p className='faculty_text'>行動裝置應用、互動裝置設計、互動媒體設計、人機介面設計、擴增實境應用</p>
              </div>
              <div className='faculty_web'>
                <div className='faculty_icon4'></div>
                <a className='web_text' href='https://chsyu.net/index.html'>俞齊山’s網頁</a>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Faculty;
