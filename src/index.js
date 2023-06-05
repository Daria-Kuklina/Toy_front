import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"


import Page from "./templates/page"
import Main from "./pages/main"
import Contacts from "./pages/contacts"
import Buy from "./pages/catalog"
import Login from "./pages/login"
import Registr from "./pages/registr"
import Profile from "./pages/profile"
import Good from "./pages/goods"
import Admin from "./pages/admin"
import { Cart } from './pages/cart';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Main />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/catalog" element={<Buy />} />
          <Route path="/catalog/:id" element={<Good />} />
          <Route path="/avtoriz/login" element={<Login />} />
          <Route path="/avtoriz/registr" element={<Registr />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

