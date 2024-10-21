import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete, MdSave } from 'react-icons/md'; 

const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null); // ID of category being edited
  const [editName, setEditName] = useState(''); // Updated category name

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2029/categories');
        
        if (response.data && response.data.content) {
          setCategories(response.data.content);
        } else {
          setError("Categories not found");
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2029/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      console.log(`Category with ID: ${id} deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete category:', err);
      setError('Failed to delete category.');
    }
  };

  // Handle edit button click
  const handleEdit = (category) => {
    setEditId(category.id);  
    setEditName(category.name); 
  };

  // Handle save updated category
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:2029/categories/${id}`, { name: editName });
      setCategories(
        categories.map((category) => 
          category.id === id ? { ...category, name: editName } : category
        )
      );
      setEditId(null); 
      console.log(`Category with ID: ${id} updated successfully.`);
    } catch (err) {
      console.error('Failed to update category:', err);
      setError('Failed to update category.');
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="showCategory">
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>
                  {editId === category.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  {editId === category.id ? (
                    <MdSave onClick={() => handleSave(category.id)} style={{ cursor: 'pointer', color: 'green' }} />
                  ) : (
                    <MdEdit onClick={() => handleEdit(category)} style={{ cursor: 'pointer' }} />
                  )}
                </td>
                <td>
                  <MdDelete onClick={() => handleDelete(category.id)} style={{ cursor: 'pointer', color: 'red' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCategory;
