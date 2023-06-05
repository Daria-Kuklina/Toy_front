import { useState } from "react";
import { Button, Col, Row, Container, Card, Form } from "react-bootstrap";
import "./avtoriz.css";
import { useNavigate } from "react-router";
import { postData } from "../utils/network";
import useRegistrGuard from "../hooks/useRegistrGuard";
const Registr = () => {
  useRegistrGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegistr = async (e) => {
    e.preventDefault()
    const response = await postData("/users/signup", { name, login, email, password });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR") setPassword("");
      return;
    }

    localStorage.setItem("token", response.token);
    navigate("/");
  };
  return (
    <Container>
      <Row>
        <Col md={3} sm={0} />
        <Col md={6} sm={12}>
          <Card style={{ marginTop: '10%', width: "100%" }}>
            <Card.Body>
              <Card.Title class="hr-line1">Регистрация</Card.Title>
              <Form onSubmit={onRegistr}>
                <Form.Group className="reg-fg">
                  <Form.Label className="label">Ваше имя</Form.Label>
                  <Form.Control
                    className="fr-control"
                    type="string"
                    placeholder="Enter name"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="reg-fg">
                  <Form.Label className="label">Адрес электронной почты</Form.Label>
                  <Form.Control
                    className="fr-control"
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="reg-fg">
                  <Form.Label className="label">Логин</Form.Label>
                  <Form.Control
                    className="fr-control"
                    type="string"
                    placeholder="Enter login"
                    id="login"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="reg-fg">
                  <Form.Label className="label">Пароль</Form.Label>
                  <Form.Control
                    className="fr-control"
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <p style={{ fontSize: "20px", margin: '5px' }}>Если у вас уже зарегистрирован аккаунт, то <a class="a-back" href="/avtoriz/login">
                  авторизируйтесь
                </a></p>
                <Button type='submit' style={{ margin: '5px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }} >
                  Зарегистироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={0} />
      </Row>
    </Container>
  );
}
export default Registr