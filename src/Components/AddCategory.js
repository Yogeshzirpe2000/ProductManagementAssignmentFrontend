import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: ""
    });

    const changeHandler = (event) => {
        setFormData({
            ...formData,  
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:2029/categories', formData);
            console.log("Response from backend:", response.data);
            alert("Category added successfully!");
            setFormData({ name: "" });
        } catch (error) {
            console.error("There was an error adding the category!", error);
            alert("Failed to add category.");
        }
    };


    return (
        <div className="mt-5">
            <h1 className="text-success text-center">Add Category Details</h1>
            <div className="form-div pt-5 pb-5 mt-5">
                <form onSubmit={handleSubmit}> 
                    <div className="mb-3">
                        <label htmlFor="Categoryname" className="form-label frm-lable mt-2">
                            Category Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="Categoryname"
                            placeholder="Enter Category Name"
                            value={formData.name}  
                            onChange={changeHandler}  
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="submit"
                            className="form-control bg-primary"
                            id="btn"
                            value="Add Category"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
