import { Row, Col, Container, Card } from "react-bootstrap"
import "./contacts.css";

const Contacts = () => {
    return (
        <Container>
            <h1 >Контакты</h1>
            <br />
            <Row style={{ fontSize: "18px" }}>
                <Col xs={12} sm={6}>
                    <Card.Img style={{ width: '100%' }} src={require("../assets/bear.jpg")} />
                </Col>
                <Col xs={12} sm={6}>
                    <h4>Наши магазины</h4>
                    <ul>
                        <li>
                            ТЦ "Крейсер", цокольный этаж.
                            Телефон: 8-905-480-76-64
                        </li>
                        <li>
                            ТЦ "Славянский базар".
                            Телефон: 8-900-345-22-11
                        </li>
                        <li>
                            ул. Горького, д.78.
                            Телефон: 8-905-260-33-02
                        </li>
                        <li>
                            ул. Юбилейная д.58.
                            Телефон: 8 905-226-36-36
                        </li>
                        <li>
                            ул. Нижняя Дуброва д.34.
                            Телефон: 8-905-260-54-56
                        </li>
                    </ul>
                    <h4>Mister Toyland работает для Вас с 8:00 до 20:00.</h4>
                    <br />
                    <h4>Напишите нам</h4>
                    <p>
                        Электронная почта: Mister_Toyland_Shop@gmail.com. Ответим в течении 20 минут.
                    </p>

                </Col>

            </Row>
            <br />
        </Container>
    )
}
export default Contacts