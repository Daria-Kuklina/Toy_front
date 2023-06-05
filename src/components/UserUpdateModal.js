import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData } from '../utils/network';


export default function AdminEditToysdModal(props) {
  const [newName, setNewName] = useState();
  const [newLogin, setNewLogin] = useState();
  const [newEmail, setNewEmail] = useState();

  const editUserData = (e) => {
    e.preventDefault();
    postData("/users/profile/edit", { name: newName, login: newLogin, email: newEmail })
      .then(response => {
        if (!response.success) {
          alert(response.message);
          if (response.code !== "NETWORK_ERROR")
            return;
        }
        return alert("Данные успешно изменены")
      })
    setNewName()
    setNewLogin()
    setNewEmail()
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
        >Изменение данных профиля</Modal.Title>
        <Row >
          <Form onSubmit={editUserData}>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Ваше имя</Form.Label>
              <Form.Control
                type="string"
                placeholder="Введите имя"
                id="name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Логин</Form.Label>
              <Form.Control
                type="string"
                placeholder="Введите логин"
                id="login"
                value={newLogin}
                onChange={(event) => setNewLogin(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Адрес электронной почты</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите почту"
                id="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="reg-fg">
              <Form.Label className="label">Новый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите новый пароль"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group> */}
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
