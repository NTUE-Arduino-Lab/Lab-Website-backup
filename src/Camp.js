import React, { useState, useEffect } from 'react';
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
  const [expandedPhotoId, setExpandedPhotoId] = useState(4);
  const [showTextPhotoId, setShowTextPhotoId] = useState(4);

  // useEffect(() => {
  //   setPhotos([...CampData]);
  // }, []);

  useEffect(() => {
    // 將對應的圖片URL加入到CampData
    const updatedPhotos = CampData.map(photo => ({
      ...photo,
      url: images[photo.url]
    }));
    setPhotos(updatedPhotos);
  }, []);

  const handleImageClick = (id) => {

    if (expandedPhotoId === id) {
      setExpandedPhotoId(null); // 如果点击的是已展开的图片，则关闭
    } else {
      setExpandedPhotoId(id); // 否则，展开被点击的图片
    }

    // Use setTimeout to simulate a delayed action
    setTimeout(() => {
      if (showTextPhotoId === id) {
        setShowTextPhotoId(null); // 如果点击的是已展开的图片，则关闭
      } else {
        setShowTextPhotoId(id); // 否则，展开被点击的图片
      }
    }, 500);
  };

  return (
    <div id="camp">
      <div className='container'>
        <div className="photos">
          {photos.map((photo) => (
            <div className={`photo-container ${expandedPhotoId === photo.id ? 'expanded' : ''} ${showTextPhotoId === photo.id ? 'showText' : ''}`} key={photo.id} onClick={() => handleImageClick(photo.id)}>
              <div className='photo-box'>
                <img
                  src={photo.url}
                  // alt={photo.id === 'blank' ? 'Transparent Placeholder' : `Photo ${photo.id}`}
                  alt={photo.name} //無障礙處理，若真的無圖，顯示該營隊名稱
                  className={expandedPhotoId === photo.id ? 'expanded' : ''}
                />
                <div className='text'>
                  <h4>{photo.name}</h4>
                  <p>{photo.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Camp;
