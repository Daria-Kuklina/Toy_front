import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getData, postData } from "../utils/network";
import UserUpdateModal from "../components/UserUpdateModal";
import UserUpdatePasswordModal from "../components/UserUpdatePasswordModal";


const OrderDetails = ({ toy }) => {
  const [details, setDetails] = useState(false)

  const getOrderDetails = () => {
    getData(`/toys/one/${toy.id}`)
      .then(({ success, toy }) => {
        if (success) return setDetails(toy)
        return alert("Ошибка получения данных")
      })
  }

  useEffect(() => {
    getOrderDetails()
  }, [])

  return (
    <tr>
      {details &&
        <>
          <td style={{ paddingLeft: 120 }}>
            {details.name}
          </td>
          <td style={{ paddingLeft: 150 }}>
            {toy.amount} шт.
          </td>
        </>
      }
    </tr>
  )
}

const UserForm = () => {
  const [newName, setNewName] = useState();
  const [newLogin, setNewLogin] = useState();
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();

  const editUserData = (e) => {
    e.preventDefault();
    postData("/users/profile/edit", { name: newName, login: newLogin, email: newEmail, password })
      .then(response => {
        if (!response.success) {
          alert(response.message);
          if (response.code !== "NETWORK_ERROR")
            return;
        }
        return alert("Данные успешно изменены")
      })
  };

  return (
    <Container className="my-5">
      <Col
        className="mx-auto"
        md={6}
        sm={12}
      >
        <Card className="w-100">
          <Card.Body>
            <Card.Title class="hr-line1">Изменить данные:</Card.Title>
            <Form onSubmit={editUserData}>
              <Form.Group className="reg-fg">
                <Form.Label className="label">Ваше имя</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter name"
                  id="name"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="reg-fg">
                <Form.Label className="label">Логин</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Enter login"
                  id="login"
                  value={newLogin}
                  onChange={(event) => setNewLogin(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="reg-fg">
                <Form.Label className="label">Адрес электронной почты</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="reg-fg">
                <Form.Label className="label">Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button style={{ margin: '15px', position: "relative", left: "50%", transform: "translate(-50%, 0)", width: "180px" }} type="submit">Сохранить</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

const Profile = () => {
  const [ordersList, setOrdersList] = useState(false)
  const [editModalShow1, setEditModalShow1] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [user, setUser] = useState();

  const getUserData = () => {
    getData('/users/one')
      .then(response => setUser(response.user))
  }

  const getOrdersList = () => {
    getData("/orders/list")
      .then(({ orders }) => setOrdersList(orders))
  }

  function onLoad() {
    getUserData()
    getOrdersList()
  }
  useEffect(() => {
    onLoad()
  }, [])
  return (
    <Container style={{ fontSize: "18px" }}>
      <h1 className="pt-3">Профиль</h1>
      <Row style={{ margin: "1%" }}>
        <Col xs={12} sm={4} style={{ boxShadow: "12px 12px 2px 1px rgba(212, 175, 55, 0.37)", border: "2px solid", margin: "2%" }}>
          <h4>Информация профиля</h4>
          {user &&
            <>
              <p>Имя: {user.name} <br /> Логин: {user.login}<br />Электронная почта: {user.email}</p>

            </>
          }
        </Col>
        <Col xs={12} sm={4} style={{ boxShadow: "12px 12px 2px 1px rgba(212, 175, 55, 0.37)", border: " 2px solid", margin: "2%" }}>
          <h4>Настройки профиля</h4>
          <UserUpdateModal
            show={editModalShow1}
            onHide={() => setEditModalShow1(false)}
          />
          <Button
            onClick={() => setEditModalShow1(true)}
            style={{ margin: '0 2% 2% 2%', display: "block", marginLeft: "auto", marginRight: "auto" }}
          >Изменить данные</Button>
          <UserUpdatePasswordModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
          />
          <Button
            onClick={() => setEditModalShow(true)}
            style={{ margin: '0 0 2% 2%', display: "block", marginLeft: "auto", marginRight: "auto" }}
          >Изменить пароль</Button>

        </Col>
      </Row> <br />
      <Row>
        <h4>Ваши заказы</h4>
        {ordersList ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>№</th>
                {/* <th>
                <span className="ps-5">Наименование</span>
                <span className="ps-5">Кол-во</span>
              </th> */}
                <th>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  {/* {order.toys.map(toy => <OrderDetails key={toy.id} toy={toy} />)} */}
                  <td>{order.price} &#8381;</td>
                </tr>
              ))}
            </tbody>

          </Table>

          :
          <h3>Заказов нет</h3>

        }
      </Row>
      {/* <UserForm /> */}
    </Container >
  );
}
export default Profile
