import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import MainHeader from './MainHeader'
import Home from './Home';
import AddCategory from './AddCategory';
import ShowCategory from './ShowCategory';
import AddProduct from './AddProduct';
import ShowProduct from './ShowProduct';

function Navbar() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex gap-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Product App</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto gap-3 mr-4">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addcategory">Add Category</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/showcategory">Show Category</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addproduct">Add Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/showproduct">Show Product</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route index element={<Home />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="showcategory" element={<ShowCategory />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="showproduct" element={<ShowProduct />} />
        </Route>
      </Routes>
    </div>
  );
}
export default Navbar;
