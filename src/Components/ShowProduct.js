import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete, MdSave } from 'react-icons/md'; 

const ShowProduct = () => {
  const [products, setProducts] = useState([]);  
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      
  const [editId, setEditId] = useState(null);  
  const [editCategoryId, setEditCategoryId] = useState(''); 
  const [editName, setEditName] = useState(''); 
  const [editPrice, setEditPrice] = useState(''); 

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2029/products');
        setProducts(response.data.content); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2029/categories');
        setCategories(response.data.content); 
      } catch (err) {
        setError('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2029/products/${id}`); 
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setEditId(product.id);  
    setEditName(product.name);  
    setEditPrice(product.price);  
    setEditCategoryId(product.categoryId); 
  };

  // Handle save updated product
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:2029/products/${editId}`, { 
        name: editName,
        price: editPrice,
        categoryId: editCategoryId 
      });
      setProducts(
        products.map((product) => 
          product.id === editId ? { ...product, name: editName, price: editPrice, categoryId: editCategoryId } : product
        )
      );
      setEditId(null);
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  // Function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="mt-5">
        <div className="showbook">
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <select
                        value={editCategoryId}
                        onChange={(e) => setEditCategoryId(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      getCategoryName(product.categoryId) 
                    )}
                  </td>
                  <td>
                    {editId === product.id ? (
                      <MdSave 
                        onClick={handleSave} 
                        style={{ cursor: 'pointer', color: 'green' }} 
                      />
                    ) : (
                      <MdEdit 
                        onClick={() => handleEdit(product)} 
                        style={{ cursor: 'pointer' }} 
                      />
                    )}
                  </td>
                  <td>
                    <MdDelete 
                      onClick={() => handleDelete(product.id)} 
                      style={{ cursor: 'pointer', color: 'red' }} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p>No products found.</p>}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
