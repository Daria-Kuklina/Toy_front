import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage, uploadModel, uploadGroup } from '../utils/network';


export default function AdminAddToysdModal(props) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [firm, setFirm] = useState();
  const [producing_country, setProducing_country] = useState();
  const [price, setPrice] = useState();
  const [photo, setPhoto] = useState();

  const createToy = async (event) => {
    event.preventDefault()
    const { success, message, id: photo_id } = await uploadImage(photo)

    if (success) {
      const response = await postData("/toys/create", { name, description, firm, producing_country, price, photo_id });

      if (!response.success) {
        alert(response.message);
        if (response.code !== "NETWORK_ERROR");
        return;
      }
      setName("")
      setDescription("")
      setFirm("")
      setProducing_country("")
      setPrice("")
      props.getToyList()
      return alert(response.message)
    }
    return alert(message)
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление нового товара
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createToy}>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Название</Form.Label>
              <Form.Control
                size="lg"
                type="string"
                placeholder="Введите название"
                required
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Описание</Form.Label>
              <Form.Control
                size="lg"
                as="textarea"
                type="text"
                placeholder="Введите описание"
                required
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Фирма</Form.Label>
              <Form.Control
                type="string"
                placeholder="Введите фирму"
                required
                id="firm"
                value={firm}
                onChange={(event) => setFirm(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Страна производства</Form.Label>
              <Form.Control
                type="string"
                placeholder="Введите страну производства"
                required
                id="producing_country"
                value={producing_country}
                onChange={(event) => setProducing_country(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label className="label">Цена</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Введите цену"
                required
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label className="label">Фото</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                onChange={(event) => setPhoto(event.target.files[0])}
              />
            </Form.Group>
            <Button className='ms-auto mt-3' type='submit'>Добавить данные</Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
