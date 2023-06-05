import { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Container, Card, Form } from "react-bootstrap";
import "./avtoriz.css";
import { useNavigate } from "react-router";
import { postData } from "../utils/network";
import useLoginGuard from "../hooks/useLoginGuard";


const LoginPage = () => {
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault()
    const response = await postData("/users/login", { email, password });

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
              <Card.Title class="hr-line1">Авторизация</Card.Title>
              <Form onSubmit={onLogin}>
                <Form.Group className="login-fg">
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
                <Form.Group className="login-fg">
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
                <p style={{ fontSize: "20px", margin: '5px' }}><a class="a-back" href="/avtoriz/registr">Зарегистрируйтесь</a>, если у вас нет аккаунта на сайте.</p>
                <Button style={{ margin: '5px', position: "relative", left: "50%", transform: "translate(-50%, 0)", width: "200px" }} type='submit'>Войти</Button>
              </Form>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;