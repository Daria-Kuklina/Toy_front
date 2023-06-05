import { Container, Nav, Navbar } from "react-bootstrap";
import { Cart4, BoxArrowRight } from 'react-bootstrap-icons';
import { useEffect, useState } from "react";
import { getData } from "../utils/network";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useToken from "../hooks/useToken";
import "./header.css";



const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { loggedIn } = useToken();

    const onLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div class="hr-line">

            <Navbar
                bg="light"
                expand="lg"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" >
                        <img
                            id="logo"
                            src={logo}
                            alt='logo'
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link
                                as={Link} to="/"
                                disabled={pathname === "/"}
                            >Главная </Nav.Link>
                            <Nav.Link
                                as={Link} to="/contacts"
                                disabled={pathname === "/contacts"}
                            >Контакты</Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/catalog"
                                disabled={pathname === "/catalog"}
                            >Каталог</Nav.Link>
                            <Nav className="ms-auto">
                                {!loggedIn ?

                                    (<Nav.Link
                                        as={Link}
                                        to="/avtoriz/login"
                                        disabled={pathname === "/avtoriz/login"}
                                    >Авторизация</Nav.Link>
                                    )
                                    :
                                    (<>
                                        {isAdmin &&
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin"
                                                    disabled={pathname === "/admin"}
                                                >
                                                    Админ
                                                </Nav.Link>
                                            </>
                                        }
                                        <Nav.Link
                                            as={Link}
                                            to="/profil"
                                            disabled={pathname === "/collections"}
                                        >
                                            Профиль
                                        </Nav.Link>

                                        <Nav.Link
                                            as={Link}
                                            to='/cart'
                                        >
                                            <Cart4 size={35} />
                                        </Nav.Link>
                                        <Nav.Link
                                            as={Link}
                                            to='/'
                                            onClick={onLogout}
                                        >
                                            <BoxArrowRight size={35} />
                                        </Nav.Link>

                                    </>
                                    )

                                }
                            </Nav>

                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>

        </div>
    );
};

export default Header;