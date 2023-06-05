import { useEffect, useState } from "react";
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { getData, postData } from "../utils/network";
const { hash } = require('bcryptjs')

export default function AdminEditToysdModal(props) {
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [repeetPassword, setRepeetPassword] = useState();
  const [user, setUser] = useState();

  const getUserData = () => {
    getData('/users/one')
      .then(response => setUser(response.user))
  }

  useEffect(() => {
    getUserData()
  }, [])

  const editUserData = (e) => {
    e.preventDefault();
    if (password == repeetPassword) (
      postData("/users/profile/edit/password", { password })
        .then(response => {
          if (!response.success) {
            alert(response.message);
            if (response.code !== "NETWORK_ERROR")
              return;
          }
          return alert("Данные успешно изменены")
        })
    )
    if (password !== repeetPassword) (
      alert("Пароли не совпадают")
    )
    // if (user.password !== hash(oldPassword, 10) & password !== repeetPassword) (
    //   alert("Пароли не совпадают")
    // )

  };

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Modal.Title
          style={{ fontSize: "20px" }}
          class="hr-line1"
        >Изменение пароля</Modal.Title>
        <Row >
          <Form onSubmit={editUserData}>
            {/* <Form.Group className="reg-fg">
              <Form.Label className="label">Старый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите старый пароль"
                id="oldPassword"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="reg-fg">
              <Form.Label className="label">Новый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите новый пароль"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Повторите пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Повторите пароль"
                id="repeetPassword"
                value={repeetPassword}
                onChange={(event) => setRepeetPassword(event.target.value)}
              />
            </Form.Group>
            <Button style={{ margin: '15px', position: "relative", left: "50%", transform: "translate(-50%, 0)", width: "180px" }} type="submit">Сохранить</Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
