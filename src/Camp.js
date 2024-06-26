import React, { useState, useEffect } from 'react';
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import swiper_arrowP from './img/camp/arrow_prev.png';
import swiper_arrowN from './img/camp/arrow_next.png';
import './Camp.css';
import CampData from './Camp.json';
import campIMG01 from './img/camp/campIMG01.png';
import campIMG02 from './img/camp/campIMG02.png';
import campIMG03 from './img/camp/campIMG03.png';
import campIMG04 from './img/camp/campIMG04.png';
import campIMG05 from './img/camp/campIMG05.png';
import campIMG06 from './img/camp/campIMG06.png';
import campIMG07 from './img/camp/campIMG07.png';


const images = {
  campIMG01,
  campIMG02,
  campIMG03,
  campIMG04,
  campIMG05,
  campIMG06,
  campIMG07
};

const Camp = () => {
  const [photos, setPhotos] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [hideIndex, setHideIndex] = useState(4);
  const [activeIndex, setActiveIndex] = useState(null);


  useEffect(() => {
    // 將對應的圖片URL加入到CampData
    const updatedPhotos = CampData.map(photo => ({
      ...photo,
      url: images[photo.url]
    }));
    setPhotos(updatedPhotos);
  }, []);


  //切換輪播時，卡片動畫
  const slideChangeEvent = (swiper) => {

    setActiveIndex(null)
    setHideIndex('hide')

    setTimeout(() => { //過0.5秒在顯示文字
      setActiveIndex(swiper.realIndex);
      setHideIndex(null)
    }, 500);
  }

  //箭頭往前一項
  const slidePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  //箭頭往後一項
  const slideNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };


  return (

    <div id="camp">
      <div className='container'>
        <div className='campBox'>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            slidesPerView={'auto'}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{ enabled: false }}
            //swiper初始化時先存一個實例在SwiperInstance，讓箭頭後面能操作
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={slideChangeEvent}
            className='campSwiper'
          >
            {photos.map((photo, index) => (

              <SwiperSlide>
                <div key={photo.id} className={`photo-container ${activeIndex === index ? 'showText' : ''} ${hideIndex === 'hide' ? 'hideText' : ''}`} >
                  <div className='photo-box'>
                    <img
                      src={photo.url}
                      // alt={photo.id === 'blank' ? 'Transparent Placeholder' : `Photo ${photo.id}`}
                      alt={photo.name} //無障礙處理，若真的無圖，顯示該營隊名稱
                    />
                    <div className='text'>
                      <h4>{photo.name}</h4>
                      <p>{photo.desc}</p>
                    </div>
                  </div>
                </div></SwiperSlide>

            ))}

          </Swiper>
          {/* 自訂左右箭頭 */}
          <div className="swiper-arrows">
            <button className="arrow-prev" onClick={slidePrev}>
              <img src={swiper_arrowP} alt="prev" />
            </button>
            <button className="arrow-next" onClick={slideNext}>
              <img src={swiper_arrowN} alt="next" />
            </button>
          </div>

        </div>
      </div>
    </div >
  );
};

export default Camp;
