import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { EnvelopeFill, Telegram } from 'react-bootstrap-icons';
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div class="hr-line-footer">
      <Container id="footer" fluid>
        <Row>
          <Col className="footer-element" xs={12} sm={4}>
            <h3>Mister Toyland</h3>
            <p>Онлайн-магазин детских игрушек</p>
          </Col>
          <Col className="footer-element" xs={12} sm={4}>
            <h3>Страницы магазина</h3>
            <ul>
              <li>
                <Link className={pathname === "/" ? "current" : ""} to="/">
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  className={pathname === "/catalog" ? "current" : ""}
                  to="/catalog"
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  className={pathname === "/contacts" ? "current" : ""}
                  to="/contacts"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </Col>
          <Col className="footer-element" xs={12} sm={4}>
            <h3>Внешние ссылки</h3>
            <ul>
              <li>
                <a target="_blank" rel="nofollow" href="https://web.telegram.org">
                  <Telegram size={35} color="grey" /> @mister_toyland
                </a>
              </li>
              <li>
                <a href="mailto:Mister_Toyland_Shop@gmail.com"><EnvelopeFill size={35} color="grey" /> Mister_Toyland_Shop@gmail.com</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="footer-element">
            <div>&copy; Mister Toyland {new Date().getFullYear()}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;