import React, { useState, useEffect, useRef } from 'react';
import './Honors.css';
import WorksData from './Honors.json';

function Honors() {

  const [works, setWorks] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [visibleWorks, setVisibleWorks] = useState(4); // 初始顯示四筆資料
  const [currentImageIndex, setCurrentImageIndex] = useState(0);//圖片輪播
  const titleRef = useRef(null); // 引用標題元素
  const intervalRef = useRef(null); // 引用定時器，用於自動輪播

  useEffect(() => {
    //json排序由舊到新以便更新資料，顯示時再加上.reverse()反轉
    setWorks([...WorksData].reverse());
  }, []);

  useEffect(() => {
    // 清除舊的定時器並啟動新的自動輪播
    if (selectedWork && selectedWork.otherImg && selectedWork.otherImg.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNextImage();
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [selectedWork]);

  // 動態導入圖片
  const getImage = (path) => {
    try {
      return require(`../../${path}`);
    } catch (err) {
      return null;
    }
  };

  // 只取第一個頓號前內容、去除-號
  const firstAwards = (text) => {
    var parts = text.split('、');
    return parts[0].trim(); // trim() 方法去除首尾空格
  };

  // 替換頓號為點點
  const replaceCommas = (text) => {
    return text.replace(/、/g, '．');
  };

  // 遇到頓號換行
  const newline = (text) => {
    return text.split('、').join('<br/>');
  };

  //顯示彈出視窗
  const handleShowModal = (work) => {
    setSelectedWork(work);
    setCurrentImageIndex(0); // 重置圖片索引
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // 禁用頁面滾動
  };

  //關閉彈出視窗
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWork(null);
    clearInterval(intervalRef.current);// 清除圖片自動輪播定時器
    document.body.style.overflow = ''; // 恢復頁面滾動
  };

  // 顯示更多資料
  const handleShowMore = () => {
    setVisibleWorks((prevVisibleWorks) => prevVisibleWorks + 4);
  };

  // 顯示較少資料並回到標題位置
  const handleShowLess = () => {
    setVisibleWorks(4);
    titleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // 切換到下一個作品
  const handleNextWork = () => {
    const currentIndex = works.indexOf(selectedWork);
    const nextIndex = (currentIndex + 1) % works.length;
    setSelectedWork(works[nextIndex]);
    setCurrentImageIndex(0); // 切換作品時重置圖片索引
  };

  // 切換到上一個作品
  const handlePreviousWork = () => {
    const currentIndex = works.indexOf(selectedWork);
    const prevIndex = (currentIndex - 1 + works.length) % works.length;
    setSelectedWork(works[prevIndex]);
    setCurrentImageIndex(0); // 切換作品時重置圖片索引
  };

  // 切換到下一張圖片
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedWork.otherImg.length);
  };

  // 切換到上一張圖片（用不到
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedWork.otherImg.length) % selectedWork.otherImg.length);
  };

  
 // 切換到指定索引的圖片
 const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div id="honors" style={{ backgroundColor: '#fff', padding: '20px' }}>
      <div className='honors_title'>
        <p className='honors_title_text'>榮譽榜</p>
        <div className='honors_title_img'></div>
      </div>
      <div className='honors_mainarea' ref={titleRef}>
        <div className='honors_worksbox'>
          {works.slice(0, visibleWorks).map((works) => (
            <div 
              className='honors_workscard' 
              key={works.id} 
              onClick={() => handleShowModal(works)}
            >
              {works.awards && (
                <div className='honors_awards'>
                  <div className='honors_awards_icon'></div>
                  <p className='honors_awards_text'>{firstAwards(works.awards)}</p>
                </div>
              )}
              <div className='works_mainImgBox'>
                <img className='works_mainImg' src={getImage(works.mainImg)} alt={works.workName}/>
              </div>
              <p className='works_workName'>{works.workName}</p>
              <p className='works_member'>{replaceCommas(works.member)}</p>
            </div>
          ))}
        </div>
      </div>
      {visibleWorks < works.length ? (
        <div className='show_more_btn' onClick={handleShowMore}>更多作品</div>
      ) : (
        <div className='show_less_btn' onClick={handleShowLess}>顯示較少</div>
      )}

      {showModal && selectedWork && (
        <div className='honors_modal' onClick={handleCloseModal}>
          <div className='honors_modal_content' onClick={(e) => e.stopPropagation()}>
            <span className='honors_modal_close' onClick={handleCloseModal}>&times;</span>
            <div className='honors_modal_left'>
              <div className='honors_modal_mobileline'></div>
              <div className='honors_modal_carousel'>
                {selectedWork.otherImg && selectedWork.otherImg.length > 0 && (
                  <>
                    <div className='honors_modal_image_container'>
                      <img
                        className='honors_modal_otherImg'
                        src={getImage(selectedWork.otherImg[currentImageIndex])}
                        alt={selectedWork.workName}
                      />
                    </div>
                    <div className='honors_modal_carousel_indicators'>
                      {selectedWork.otherImg.map((_, index) => (
                        <span
                          key={index}
                          className={`honors_modal_carousel_indicator ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => handleImageSelect(index)}
                        ></span>
                      ))}
                    </div>
                  </>
                )}
              </div>    
            </div>
            <div className='honors_modal_right'>
              <div className='honors_modal_right_top'>
                <p className='honors_modal_workName'>{selectedWork.workName}</p>
                {selectedWork.video && (
                  <a href={selectedWork.video} target="_blank" rel="noopener noreferrer">
                    <div className='honors_modal_video'></div>
                  </a>
                )}
              </div>
              <div className='honors_modal_right_mid'>
                <p className='honors_modal_intro'>{selectedWork.introduction}</p>
              </div>
              <div className='honors_modal_right_bottom'>
                <div className='honors_line'></div>
                <div className='honors_author'>
                  <p className='honors_modal_text1'>作者</p>
                  <p className='honors_modal_text2'>{replaceCommas(selectedWork.member)}</p>
                </div>
                <div className='honors_line'></div>
                <div className='honors_honors'>
                  <p className='honors_modal_text1'>榮譽</p>
                  <p className='honors_modal_text2' dangerouslySetInnerHTML={{ __html: newline(selectedWork.awards) }}></p>
                </div>
              </div>
            </div>
            <div className='honors_modal_prev' onClick={handlePreviousWork}></div>
            <div className='honors_modal_next' onClick={handleNextWork}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Honors;
