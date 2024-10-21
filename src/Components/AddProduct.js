import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2029/categories');
        if (response.data && response.data.content) {
          setCategories(response.data.content); // Populate categories with response data
        } else {
          setError("Categories not found");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:2029/products', formData);
      alert("Product added successfully!");
      // Reset form after successful submission
      setFormData({
        name: '',
        price: '',
        categoryId: ''
      });
    } catch (error) {
      alert("Error adding product!");
      console.error("There was an error adding the product!", error);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-success text-center">Add Product Details</h1>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Productname" className="form-label frm-lable mt-2">Product Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="Productname"
              placeholder="Enter Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ProductPrice" className="form-label frm-lable">Product Price:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              id="ProductPrice"
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="CategoryId" className="form-label frm-lable">Product Category:</label>
            <select
              className="form-control"
              name="categoryId"
              id="CategoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="form-control bg-primary text-white"
              id="btn"
              value="Add Product"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
