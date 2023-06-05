import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { ReactComponent as Woman } from "./woman.svg"
import "./good.css"
const Good = () => {

  const [color, setColor] = useState("red")
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Woman className="woman" width="350" height="350" />
          </Col>
          <Col>
            <Button onClick={() => setColor("red")} style={{ margin: "20px", backgroundColor: "red" }}>Изменить цвет</Button>
            <Button onClick={() => setColor("green")} style={{ margin: "20px", backgroundColor: "green" }}>Изменить цвет</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )

}
export default Good

