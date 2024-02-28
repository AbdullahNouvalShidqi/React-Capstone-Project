import React from "react";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../assets/image/bisnis1.png";
import Logo2 from "../../assets/image/bisnis2.png";
import Logo3 from "../../assets/image/bisnis3.png";
import Logo4 from "../../assets/image/bisnis4.png";
import Logo5 from "../../assets/image/bisnis5.png";
import Logo6 from "../../assets/image/bisnis6.png";
import Logo7 from "../../assets/image/bisnis7.png";
import Logo8 from "../../assets/image/bisnis8.png";
import ImageHome from "../../assets/image/imagehome.png";

const Home = () => {

  const navigate = useNavigate();

  const cobaGratisOnClick = () => {
    navigate('/register');
  }

  return (
    <div id="home" className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <p className="text1">Kirim invoice lebih cepat dan mudah</p>
          <h1 className="text2">Software Invoice Untuk Semua Jenis Bisnis</h1>
          <p className="text3">
            MyINVOICE merupakan software online yang berguna untuk membantu
            usahamu untuk membuat invoice, mengirim notifikasi pembayaran, serta
            menerima pembayaran dengan lebih cepat dan mudah!
          </p>
          <button className="button-lg-primary" onClick={cobaGratisOnClick}>Coba Sekarang</button>
        </div>
        <div className="col-md-5">
          <div className="box1">
            <img className="my-image1 ms-5 ps-2" src={ImageHome} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="section-title1 text-center pt-5 pb-5">
        <h1 className="font1">Ratusan bisnis telah menggunakan MyINVOICE </h1>
      </div>
      <div class="container text-center pt-5 pb-5">
        <div className="bisnis">
          <div class="row pb-5">
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo1} alt="Logo" />
              Greenbear
            </div>
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo2} alt="Logo" />
              Orangesun
            </div>
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo3} alt="Logo" />
              Bluestart
            </div>
            <div class="col">
              <img className="logo3 ms-5 ps-2 me-2" src={Logo4} alt="Logo" />
              Beekela
            </div>
          </div>
          <div class="row pt-5 pb-5">
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo5} alt="Logo" />
              Starbusines
            </div>
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo6} alt="Logo" />
              Roundshop
            </div>
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo7} alt="Logo" />
              Cubic
            </div>
            <div class="col">
              <img className="logo2 ms-5 ps-2 me-2" src={Logo8} alt="Logo" />
              Rounders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;