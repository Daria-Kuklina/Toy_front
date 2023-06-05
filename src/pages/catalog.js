import { Suspense, useContext, useEffect, useState } from "react";
import { Grid3x2GapFill, BorderWidth, BoxArrowRight } from 'react-bootstrap-icons';
import { Button, Card, Col, Container, Row, Figure, Image, Accordion } from "react-bootstrap";
import { Link } from 'react-router-dom';
import AdminAddToysdModal from "../components/AdminAddToyModal";
import AdminEditToysdModal from "../components/AdminEditToyModal";
import { cartContext } from '../templates/page';
import { getData, postData } from "../utils/network";
import useToken from "../hooks/useToken";

import { Canvas } from 'react-three-fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import Toy1 from "../components/models/Toy1";
import Toy2 from "../components/models/Toy2";
import Toy3 from "../components/models/Toy3";
import Toy4 from "../components/models/Toy4";
import Toy5 from "../components/models/Toy5";


const ToyCard1 = ({ toy, isAdmin, getToyList, handleAdd, deleteToy }) => {
    const { loggedIn } = useToken();
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${toy.photo_id}`).then(({ success, photo }) => {
            if (success) return setPhotoUrl(photo.photo_path)
        })
    }

    useEffect(() => {
        getPhoto()
    }, [])

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Button as={Link} to={`${toy.id}`} variant="primary" >
                    <Card.Img
                        style={{ width: '100%', aspectRatio: 1 }}
                        src={photoUrl}
                    />
                </Button>
                <h2 class="hr-line1">{toy.name}</h2 >
                <p style={{ textAlign: 'left', }}>
                    Цена: {" "}
                    {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })
                        .format(toy.price)}
                </p>

                {isAdmin ?
                    (<>
                        <AdminEditToysdModal
                            show={editModalShow}
                            toyData={toy}
                            getToyList={getToyList}
                            onHide={() => setEditModalShow(false)}
                        />
                        <Container>
                            <Button

                                onClick={() => setEditModalShow(true)}
                                style={{ width: '150px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                            >Изменить</Button>
                            <Button

                                onClick={() => deleteToy(toy.id)}
                                style={{ width: '150px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                            >Удалить</Button>
                        </Container>
                    </>
                    )
                    :
                    (
                        <>
                            {!loggedIn ?
                                (<Button
                                    className="w-100"
                                    as={Link} to="/avtoriz/login"
                                >Купить</Button>)
                                :
                                (
                                    <Button
                                        className="w-100"
                                        onClick={() => handleAdd(toy.id)}
                                    >Купить</Button>)
                            }
                        </>



                    )
                }
            </Card.Body>
        </Card>
    )
}

const ToyCard2 = ({ toy, isAdmin, getToyList, handleAdd, deleteToy }) => {
    const { loggedIn } = useToken();
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${toy.photo_id}`).then(({ success, photo }) => {
            if (success) return setPhotoUrl(photo.photo_path)
        })
    }

    useEffect(() => {
        getPhoto()
    }, [])
    return (
        <Card style={{ width: "100%" }}>
            <Row>
                <Col>
                    <Button as={Link} to={`${toy.id}`} variant="primary" >
                        <Card.Img
                            style={{ width: '100%' }}
                            src={photoUrl}
                        />
                    </Button>
                </Col>
                <Col>
                    <Card.Body>
                        <h2 class="hr-line1">{toy.name}</h2 >
                        <p style={{ textAlign: 'left', }}>Фирма: {toy.firm}</p>
                        <p style={{ textAlign: 'left', }}>Страна производитель: {toy.producing_country}</p>
                        <p style={{ textAlign: 'left', }}>
                            Цена товара: {" "}
                            {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })
                                .format(toy.price)}
                        </p>
                        {isAdmin ?
                            (<>
                                <AdminEditToysdModal
                                    show={editModalShow}
                                    toyData={toy}
                                    getToyList={getToyList}
                                    onHide={() => setEditModalShow(false)}
                                />
                                <Container>
                                    <Button

                                        onClick={() => setEditModalShow(true)}
                                        style={{ marginRight: '10%', width: '150px' }}
                                    >Изменить</Button>
                                    <Button

                                        onClick={() => deleteToy(toy.id)}
                                        style={{ margin: 0, width: '150px' }}
                                    >Удалить</Button>
                                </Container>
                            </>
                            )
                            :
                            (
                                <>
                                    {!loggedIn ?
                                        (<Button
                                            className="w-100"
                                            as={Link} to="/avtoriz/login"
                                        >Купить</Button>)
                                        :
                                        (
                                            <Button
                                                className="w-100"
                                                onClick={() => handleAdd(toy.id)}
                                            >Купить</Button>)
                                    }
                                </>



                            )
                        }
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

const Buy = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [toyList, setToyList] = useState(false)
    const { cartList, setCartList } = useContext(cartContext);
    const [changeSize, setChangeSize] = useState(false);


    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getToyList() {
        const { success, toys, message } = await getData('/toys/list')
        if (!success) return alert(message);
        console.log(toys.filter(el => 0 === 0))
        return setToyList(toys)

    }

    function handleAdd(itemId) {
        const candidate = cartList.findIndex(item => item.id === itemId)
        if (candidate >= 0) {
            const updatedCart = [...cartList]
            updatedCart[candidate].amount += 1
            setCartList(updatedCart)

        }
        else {
            setCartList(prev => [...prev, { id: itemId, amount: 1 }])
        }
    }

    async function deleteToy(toyId) {
        const { success, message } = await postData("/toys/del", { toyId });
        if (!success) return alert(message)
        await getToyList()
        return alert(message)
    }

    useEffect(() => {
        getToyList()
        getUserData()
    }, [])

    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <Container>
            <div className="d-none d-lg-block">
                <button

                    onClick={() => topFunction()}
                    id="myBtn"
                    title="Go to top">
                    ↑
                </button>
            </div>
            <h1 className="pt-3">Каталог</h1>
            <Accordion defaultActiveKey="0" flush style={{ fontSize: "18px" }}>
                <Accordion.Item eventKey="0" className="accordion">
                    <Accordion.Header > <h5>Раздел "Популярное"</h5></Accordion.Header>
                    <Accordion.Body style={{ padding: 0, margin: "8px" }}>
                        <Figure>
                            <Image src={require("../assets/popular.jpg")} fluid />
                            <Figure.Caption style={{ margin: "8px" }}>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <Accordion defaultActiveKey="0" flush style={{ fontSize: "18px" }}>
                                            {/* Модель 1 */}
                                            <Accordion.Item eventKey="0" className="accordion">
                                                <Accordion.Header > <h5>Мяграя игрушка Акула</h5></Accordion.Header>
                                                <Accordion.Body style={{ padding: 0 }}>
                                                    <Canvas
                                                        style={{ backgroundColor: "#DCDCDC", height: "400px", width: "100%" }}
                                                        camera={{ position: [0, 1, 1], zoom: 40 }}
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
                                                            <Toy1 />
                                                        </Suspense>
                                                    </Canvas>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {/* Модель 2 */}
                                            <Accordion.Item eventKey="1" className="accordion">
                                                <Accordion.Header > <h5>Машинка Mclaren</h5></Accordion.Header>
                                                <Accordion.Body style={{ padding: 0 }}>
                                                    <Canvas

                                                        style={{ backgroundColor: "#DCDCDC", height: "400px", width: "100%" }}
                                                        camera={{ position: [10, 3, 10], zoom: 3 }}
                                                    >
                                                        <OrbitControls />
                                                        <hemisphereLight intensity={3} />
                                                        <spotLight
                                                            position={[100, 100, 100]}
                                                            angle={0.3}
                                                            penumbra={1}
                                                            intensity={5}
                                                            castShadow
                                                        />
                                                        <Suspense fallback={null}>
                                                            <Toy2 />
                                                        </Suspense>
                                                    </Canvas>

                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {/* Модель 3 */}
                                            <Accordion.Item eventKey="2" className="accordion">
                                                <Accordion.Header > <h5>Мяграя игрушка Хагги Вагги</h5></Accordion.Header>
                                                <Accordion.Body style={{ padding: 0 }}>
                                                    <Canvas
                                                        style={{ backgroundColor: "#DCDCDC", height: "400px", width: "100%" }}
                                                        camera={{ position: [2, 1, 0], zoom: 1 }}
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
                                                            <Toy3 />
                                                        </Suspense>
                                                    </Canvas>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {/* Модель 4 */}
                                            <Accordion.Item eventKey="3" className="accordion">
                                                <Accordion.Header > <h5>Черепашка ниндзя Леонардо</h5></Accordion.Header>
                                                <Accordion.Body style={{ padding: 0 }}>
                                                    <Canvas
                                                        style={{ backgroundColor: "#DCDCDC", height: "400px", width: "100%" }}
                                                        camera={{ position: [2, 3, 4], zoom: 2 }}
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
                                                            <Toy4 />
                                                        </Suspense>
                                                    </Canvas>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {/* Модель 5 */}
                                            <Accordion.Item eventKey="4" className="accordion">
                                                <Accordion.Header > <h5>Кубики деревянные с алфавитом</h5></Accordion.Header>
                                                <Accordion.Body style={{ padding: 0 }}>
                                                    <Canvas
                                                        style={{ backgroundColor: "#DCDCDC", height: "400px", width: "100%" }}
                                                        camera={{ position: [190, 40, 100], zoom: 1 }}
                                                    >
                                                        <OrbitControls />
                                                        <hemisphereLight intensity={0.20} />
                                                        <spotLight
                                                            position={[4000, 4000, 800]}
                                                            angle={0.3}
                                                            penumbra={1}
                                                            intensity={2}
                                                            castShadow
                                                        />
                                                        <Suspense fallback={null}>
                                                            <Toy5 />
                                                        </Suspense>
                                                    </Canvas>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Col>
                                    <Col xs={12} sm={4}>
                                        <p style={{ margin: "10px" }} class="lh-lg">
                                            Представляем вам наши самые популярные игрушки в магазине Mr Toyland!
                                            Специально для вас мы реализовали их 3D модели, чтоб вы сами убедились в их красочности, интересности перед покупкой.
                                            Просмотрите модели наших игрушек и спускайтесь в каталог. Удачных покупок!
                                        </p>
                                    </Col>
                                </Row>
                            </Figure.Caption>

                        </Figure>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />

            {
                isAdmin &&
                <>
                    <AdminAddToysdModal
                        show={addModalShow}
                        getToyList={getToyList}
                        onHide={() => setAddModalShow(false)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddModalShow(true)}
                    >Добавить товар</Button>
                </>
            }

            <Button className="m-2 d-none d-sm-inline" onClick={() => setChangeSize(false)}><Grid3x2GapFill size={35} /></Button>
            <Button className="m-2 d-none d-sm-inline" onClick={() => setChangeSize(true)}><BorderWidth size={35} /></Button>

            <Container className="w-80">
                {changeSize == false ?
                    (
                        <Row>
                            {toyList ?
                                (
                                    toyList.map((toy) =>
                                        <Col><ToyCard1
                                            key={toy.id}
                                            toy={toy}
                                            isAdmin={isAdmin}
                                            getToyList={getToyList}
                                            handleAdd={handleAdd}
                                            deleteToy={deleteToy}
                                        /></Col>

                                    )
                                )
                                :
                                (<p>В данный момент товары отсутствуют, загляните в каталог позже.</p>)
                            }
                        </Row>
                    )
                    :
                    (
                        <>
                            {toyList ?
                                toyList.map((toy) => <ToyCard2
                                    key={toy.id}
                                    toy={toy}
                                    isAdmin={isAdmin}
                                    getToyList={getToyList}
                                    handleAdd={handleAdd}
                                    deleteToy={deleteToy}
                                />
                                )
                                :
                                <p>В данный момент товары отсутствуют, загляните в каталог позже.</p>
                            }
                        </>
                    )
                }
            </Container>
        </Container >
    )
}
export default Buy
