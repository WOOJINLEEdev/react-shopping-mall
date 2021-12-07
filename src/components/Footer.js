import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul className="footer_menu">
          <li className="footer_menu_list">
            <Link to={"/"} className="footer_link">
              이용약관
            </Link>
          </li>
          <li className="footer_menu_list">
            <Link to={"/aboutMe"} className="footer_link">
              이용안내
            </Link>
          </li>
          <li className="footer_menu_list">
            <Link to={"/selectBoard"} className="footer_link">
              커뮤니티
            </Link>
          </li>
        </ul>
      </nav>
      <address className="footer_address">주소: OO시 OO구 OOO로</address>
      <p className="footer_copyright">
        COPYRIGHT © <span className="footer_copyright_text">WOOJINLEEdev</span>{" "}
        All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
