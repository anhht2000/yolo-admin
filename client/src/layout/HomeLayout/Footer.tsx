import React from "react";
import { imgLogo } from "../../assets";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div>
        <div className="footer__content">Tổng đài hỗ trợ</div>
        <div>Liên hệ đặt hàng 0123456789</div>
        <div>Thắc mắc đơn hàng 0123456789</div>
        <div>Góp ý, Kiếu nại 0123456789</div>
      </div>
      <div>
        <div className="footer__content">Về Yolo</div>
        <div>Giới thiệu</div>
        <div>Liên hệ</div>
        <div>Tuyển dụng</div>
        <div>Tin tức</div>
        <div>Hệ thống cửa hàng</div>
      </div>
      <div>
        <div className="footer__content">CHĂM SÓC KHÁCH HÀNG</div>
        <div>Chính sách đổi trả</div>
        <div>Chính sách bảo hành</div>
        <div>Chính sách hoàn tiền</div>
      </div>
      <div>
        <img src={imgLogo.logo_2} alt="logo" className="footer__img" />
        <div>
          Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng
          triệu người yêu dùng việt với mỗi ngày cho hàng triệu người tiêu dùng
          Việt. Hãy cùng Yolo hướng đến một cuộc sống năng động, tích cực hơn
        </div>
      </div>
    </div>
  );
};

export default Footer;
