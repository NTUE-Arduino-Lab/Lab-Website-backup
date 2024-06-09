import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './Title';
import Faculty from './Faculty';
import Thesis from './Thesis';
import Topics from './Topics';
//import Honors from './Honors';
//import Album from './Album'; // 假设 Album 是相簿组件
import Camp from './Camp';
import Footer from './Footer';
import logo from './img/logo.svg'; // 导入图片
import './App.css'; // 確保你的樣式被正確導入
import './Common.css'; // 通用樣式

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 這將使滾動動作平滑進行
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  };

  const [currentText, setCurrentText] = useState('標題');
  const [newText, setNewText] = useState('標題');
  const [newTextAnimation, setNewTextAnimation] = useState('標題'); // 定義 newTextAnimation 狀態及其更新函數
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 默認為 true，使側邊欄可見

  const COLORS = useMemo(() => ({
    oddSectionBackground: '#7EC0FC',
    evenSectionBackground: '#004B8F',
  }), []);
  const [sidebarBgColor, setSidebarBgColor] = useState(COLORS.oddSectionBackground); // 初始背景色
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.title = "HCI x GAME Lab.";
  }, []); // 空依賴數組表示這個效果只會在組件掛載時運行一次

  useEffect(() => {
    // 當 newText 改變並且與 currentText 不同時，啟動淡出動畫
    if (newText !== currentText) {
      setNewTextAnimation('fadeOutToLeft');
    }
  }, [newText, currentText]);

  useEffect(() => {
    if (newTextAnimation === 'fadeOutToLeft') {
      // 等待淡出動畫完成
      const timer = setTimeout(() => {
        setCurrentText(newText); // 更新文本
        setNewTextAnimation('fadeInFromRight'); // 啟動淡入動畫
      }, 200); // 假設動畫持續時間為 500ms
      return () => clearTimeout(timer);
    }
  }, [newTextAnimation, newText]);


  const handleScroll = useCallback(() => {
    const halfWindowHeight = window.innerHeight / 2;
    const scrollPosition = window.pageYOffset + halfWindowHeight;

    // 獲取每個部分頂部到頁面頂部的距離
    const positions = {
      title: document.getElementById('title') ? document.getElementById('title').offsetTop : 0,
      faculty: document.getElementById('faculty') ? document.getElementById('faculty').offsetTop : 0,
      thesis: document.getElementById('thesis') ? document.getElementById('thesis').offsetTop : 0,
      topics: document.getElementById('topics') ? document.getElementById('topics').offsetTop : 0,
      //honors: document.getElementById('honors') ? document.getElementById('honors').offsetTop : 0,
      //album: document.getElementById('album') ? document.getElementById('album').offsetTop : 0,
      camp: document.getElementById('camp') ? document.getElementById('camp').offsetTop : 0,
      // contact: document.getElementById('contact') ? document.getElementById('contact').offsetTop : 0,
      footerDistance: document.querySelector('.footer') ? document.querySelector('.footer').offsetTop : 0,

    };


    // 使用 if-else if 結構來根據滾動位置設置 newText 和 sidebarBgColor
    if (scrollPosition >= positions.title && scrollPosition < positions.faculty) {
      setNewText('標題');
      setSidebarBgColor(COLORS.oddSectionBackground);
      setIsSidebarVisible(false); // 隱藏側邊欄
    } else if (scrollPosition >= positions.faculty && scrollPosition < positions.thesis) {
      setNewText('研究室指導教授');
      setSidebarBgColor(COLORS.evenSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    } else if (scrollPosition >= positions.thesis && scrollPosition < positions.topics) {
      setNewText('研究生論文');
      setSidebarBgColor(COLORS.oddSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    } else if (scrollPosition >= positions.topics && scrollPosition < positions.camp) {//記得改回positions.honors
      setNewText('研究領域');
      setSidebarBgColor(COLORS.evenSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    } /*else if (scrollPosition >= positions.honors && scrollPosition < positions.album) {
      setNewText('榮譽榜');
      setSidebarBgColor(COLORS.oddSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    } else if (scrollPosition >= positions.album && scrollPosition < positions.camp) {
      setNewText('相簿');
      setSidebarBgColor(COLORS.evenSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    }*/ else if (scrollPosition >= positions.camp && scrollPosition < positions.footerDistance) {
      setNewText('冬夏令營');
      setSidebarBgColor(COLORS.oddSectionBackground);
      setIsSidebarVisible(true); // 隱藏側邊欄
    } else if (scrollPosition >= positions.footerDistance) {
      setNewText('聯絡資訊');
      setSidebarBgColor(COLORS.evenSectionBackground);
      setIsSidebarVisible(false); // 隐藏侧边栏
    }
  }, [setNewText, setSidebarBgColor, COLORS]);



  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // 現在 `handleScroll` 是一個依賴項，這樣效果會正確響應它的更新


  return (
    <div className="App">
      <Helmet>
        <title>HCI x GAME Lab. 探索虛實交匯，專注於遊戲設計與前端互動設計</title>
        <meta name="description" content="HCI x GAME Lab. 由國北教數位科技系范丙林與俞齊山教授指導，專注於遊戲設計與前端互動設計的創新。從桌遊到多媒體，從前端到UI/UX；加入我們，一同推動技術與藝術邊界，開拓設計的新宇宙。" />
        <meta name="keywords" content="遊戲設計, 互動設計, 桌遊設計, 前端開發, 前端設計 , UI , UX, HCI, GAME, Lab, 國立臺北教育大學, 數位科技系, 俞齊山" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Helmet>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="menuButton" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24 8L8 24M8 8L24 24" stroke="#171819" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 16H28M4 8H28M4 24H28" stroke="#171819" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className={`links ${isMenuOpen ? 'show' : ''}`}>
          <button className="linkButton" onClick={() => scrollToSection('faculty')}>研究室介紹</button>
          <button className="linkButton" onClick={() => scrollToSection('topics')}>研究領域</button>
          {/* <button className="linkButton" onClick={() => scrollToSection('honors')}>榮譽榜</button>
          <button className="linkButton" onClick={() => scrollToSection('album')}>研究室活動</button>*/}
          <button className="linkButton" onClick={() => scrollToSection('camp')}>冬夏令營</button>
        </div>
      </div>

      <div className="content" style={{ paddingTop: '60px' }}>
        <div className={`fixedBox ${isSidebarVisible ? '' : 'hideSidebar'}`} style={{ backgroundColor: sidebarBgColor }}>
          <div className={`verticalText ${newTextAnimation}`}>{currentText}</div>
        </div>
        <Title height="calc(100vh - 60px)" id="title" /> {/*二改：扣掉header*/}
        <Faculty height="700px" id="faculty" />
        <Thesis height="800px" id="thesis" />
        <Topics height="800px" id="topics" />
        {/* <Honors height="800px" id="honors" /> */}
        {/* <Album height="800px" id="album" /> */}
        <Camp height="800px" id="camp" />
        <button onClick={scrollToTop} className="scrollToTopButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M30 25L20 15L10 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <Footer></Footer>
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer_left">
            <div className="footer_logo">
              <img src={footer_logo} alt="footer_Logo" />
            </div>
            <div className="footer_text">
              <div className="logoName">
                <img src={footer_logoName} alt="footer_logoName" />
              </div>
              <h3>遊戲與人機互動設計研究室</h3>
              <p>無論您是尋找遊戲設計的專業合作夥伴，還是想參與引領遊戲科技的前沿，我們的研究室都是一個充滿激勵且開放的環境。歡迎加入我們，一同打破傳統，創建出獨一無二的遊戲體驗！</p>
              <p className='text_end hidden_sm'>
                © 2024 HCI x GAME Lab.版權所有
              </p>
            </div>
            <p className='text_end show_sm'>
              © 2024 HCI x GAME Lab.版權所有
            </p>
          </div>
          <div className="footer_right">
            <a href="https://maps.app.goo.gl/GcmnxhEtzJjYwVEs7" target="_blank" rel="noopener noreferrer">
              <img src={footer_map} alt="footer_map" />
            </a>
            <ul>
              <li>如何聯絡我們</li>
              <li className='phone'>
                <span className='icon_phone'></span>(02)2732-1104分機63533
              </li>
              <li className='addr'>
                <span className='icon_addr'></span>10671 台北市大安區和平東路2段134號科學館5樓B507室
              </li>
            </ul>
          </div>
        </div>
      </footer> */}
    </div>
  );


}

export default App;
