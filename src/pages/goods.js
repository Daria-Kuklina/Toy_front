import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from "react";
import { getData } from "../utils/network";
// import data from "../data/goods.json"
// import { Canvas } from 'react-three-fiber'
// import { useGLTF } from '@react-three/drei'
// import Toy from "../components/models/Toy3";
// import { OrbitControls } from "@react-three/drei";


const Good = () => {
  const { id } = useParams()
  const [toy, setToy] = useState(false)
  const [photoUrl, setPhotoUrl] = useState()
  const [changeView, setChangeView] = useState(false);

  const getToyData = () => {
    getData(`/toys/one/${id}`).then(({ success, toy, message }) => {
      if (!success) {
        return alert(message)
      };

      return setToy(toy)
    })
  }

  function getPhoto() {
    getData(`/photos/one/${toy.photo_id}`).then(({ success, photo }) => {
      if (!success) {
        return alert('Photo not found')
      }

      return setPhotoUrl(photo.photo_path)
    })
  }


  useEffect(() => {
    getToyData()
  }, [])

  useEffect(() => {
    if (toy) {
      getPhoto()
    }
  }, [toy])


  return (
    <Container>
      <h2>{toy.name}</h2>
      <Row>
        <Col xs={12} sm={6}>

          {/* {changeView == false ?
            ( */}
          {
            photoUrl && <Card.Img
              variant="top"
              style={{ aspectRatio: 1 }}
              src={photoUrl}
            />
          }
          {/* )
            :
            (
              <Canvas
                style={{ backgroundColor: "#e9ccb15e", height: "700px" }}
                camera={{ position: [10, 2, 10], zoom: 1 }}
              >
                <OrbitControls />
                <hemisphereLight intensity={0.15} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.3}
                  penumbra={1}
                  intensity={2}
                  castShadow
                />
                <Suspense fallback={null}>

                  <Toy />
                </Suspense>
              </Canvas>

            )
          } */}
        </Col>
        <Col style={{ fontSize: "18px" }} xs={12} sm={6}>
          <Card.Text>Цена: {" "}
            {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })
              .format(toy.price)}
          </Card.Text>
          <Card.Text>Фирма: {toy.firm}</Card.Text>
          <Card.Text>Страна производитель: {toy.producing_country}</Card.Text>
          <Card.Text>Описание: <br /> {toy.description}</Card.Text>
          {/* <Button onClick={() => setChangeView(false)} style={{ margin: "20px" }}> Просмотр фото </Button>
          <Button onClick={() => setChangeView(true)} style={{ margin: "20px" }}> Просмотр 3D модели </Button> */}

        </Col>
      </Row>

      <br />
    </Container>
  );
};

export default Good