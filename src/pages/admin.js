import { Component, useEffect, useState } from "react";
import { Table, Row, Col, Container, Button } from "react-bootstrap"
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem'
import { getData, postData } from "../utils/network";
import "../index.css"

const UserCard = ({ user, deleteUser }) => {
    return (
        <tr>
            <td><p>{user.name}</p></td>
            <td><p>{user.login}</p></td>
            <td><p>{user.email}</p></td>
            <td><p>{user.role}</p></td>
            <td>
                <Button
                    onClick={() => deleteUser(user.id)}
                    style={{ width: '50px', position: "relative", left: "50%", transform: "translate(-50%, 0)" }}
                >x</Button>
            </td>
        </tr>



    )
}


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userList, setUserList] = useState(false)
    const [ordersList, setOrdersList] = useState(false)
    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getUserList() {
        const { success, users, message } = await getData('/users/list')
        if (!success) return alert(message);
        return setUserList(users)
    }
    const getOrdersList = () => {
        getData("/orders/list")
            .then(({ orders }) => setOrdersList(orders))
    }
    async function deleteUser(userId) {
        const { success, message } = await postData("/users/del", { userId });
        if (!success) return alert(message)
        await getUserList()
        return alert(message)
    }

    useEffect(() => {
        getUserList()
        getUserData()
        getOrdersList()
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
            {isAdmin &&
                <>
                    <h1 >Админ панель</h1> <br />
                    <Accordion flush style={{ fontSize: "18px" }}>
                        <Accordion.Item eventKey="0" className="accordion">
                            <Accordion.Header> <h5>Оформленные заказы</h5></Accordion.Header>
                            <Accordion.Body>
                                {ordersList ? (
                                    <Table striped bordered hover size="sm" responsive>
                                        <thead className="table-admin">
                                            <tr>
                                                <th><p>№ заказа</p></th>
                                                <th><p>Стоимость</p></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-admin">
                                            {ordersList.map((order, index) => (
                                                <tr key={order.id}>
                                                    <td><p>{index + 1}</p></td>
                                                    <td><p>{order.price} &#8381;</p></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </Table>
                                ) : (<h3>Заказов нет</h3>)
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="accordion">
                            <Accordion.Header><h5>Зарегистрированные пользователи</h5></Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover size="sm" responsive>
                                    <thead className="table-admin">
                                        <tr>
                                            <th><h3 style={{ textAlign: 'center', }}>Имя</h3></th>
                                            <th><h3 style={{ textAlign: 'center', }}>Логин</h3></th>
                                            <th><h3 style={{ textAlign: 'center', }}>Почта</h3></th>
                                            <th><h3 style={{ textAlign: 'center', }}>Роль</h3></th>
                                            <th><h3 style={{ textAlign: 'center', }}>Удалить</h3></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-admin">
                                        {userList ?
                                            userList.map((user) => <UserCard
                                                key={user.id}
                                                user={user}
                                                isAdmin={isAdmin}
                                                getUserList={getUserList}
                                                deleteUser={deleteUser}
                                            />
                                            )
                                            :
                                            <p>Позьзователи отсутствуют.</p>
                                        }</tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <br />
                </>
            }
        </Container>
    )
}
export default Admin