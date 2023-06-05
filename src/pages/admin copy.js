import { Component, useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
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
    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getUserList() {
        const { success, users, message } = await getData('/users/list')
        if (!success) return alert(message);
        return setUserList(users)
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
    }, [])

    return (
        <Container>
            {isAdmin &&
                <>
                    <h1>Панель администратора</h1>
                    <br />

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
                    <br />
                </>
            }
        </Container>
    )
}
export default Admin