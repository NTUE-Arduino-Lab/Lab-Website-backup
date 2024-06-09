import React from 'react';
import footer_logo from './img/footer_logo.svg';
import footer_map from './img/footer_map.png';
import footer_logoName from './img/footer_logoName.svg';



const Footer = () => {


    return (

        <footer className="footer">
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
        </footer>

    );
};

export default Footer;
