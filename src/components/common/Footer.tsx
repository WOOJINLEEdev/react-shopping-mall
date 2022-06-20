import { Link } from "react-router-dom";

const FOOTER_MENUS = [
  {
    id: 0,
    text: "이용약관",
    pathname: "/",
  },
  {
    id: 1,
    text: "이용안내",
    pathname: "/aboutMe",
  },
  {
    id: 2,
    text: "커뮤니티",
    pathname: "/selectBoard",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <nav aria-label="footer navigation">
        <ul className="footer_menu">
          {FOOTER_MENUS.map((menu) => {
            return (
              <li key={`footer_menu_${menu.id}`} className="footer_menu_list">
                <Link to={menu.pathname} className="footer_link">
                  {menu.text}
                </Link>
              </li>
            );
          })}
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
