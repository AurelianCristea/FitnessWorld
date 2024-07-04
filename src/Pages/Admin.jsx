import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import './CSS/Admin.css';

const Admin = () => {
    const { all_product, all_workout, updateProductList,updateWorkoutList} = useContext(ShopContext);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '', image: '' });
    const [newWorkout, setNewWorkout] = useState({ name: '', category: '', description: '', image: '', video: '' });

    
    const handleAddProduct = async () => {
        try {
            const response = await axios.post('https://localhost:7286/Products/addProduct', {
                productName: newProduct.name,
                price: newProduct.price,
                category: newProduct.category,
                description: newProduct.description,
                imagePath: newProduct.image
            });
            if (response.status === 200) {
                console.log('Product added successfully');
                updateProductList([...all_product, { id: response.data, ...newProduct }]);
                setNewProduct({ name: '', price: '', description: '', category: '', image: '' });
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete('https://localhost:7286/Products/deleteProduct', {
                params: { id: productId }
            });
            if (response.status === 200) {
                console.log('Product deleted successfully');
                updateProductList(all_product.filter(product => product.id !== productId));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    
    const handleAddWorkout = async () => {
        try {
            const response = await axios.post('https://localhost:7286/Exercises/addExercise', {
                exerciseName: newWorkout.name,
                category: newWorkout.category,
                description: newWorkout.description,
                imagePath: newWorkout.image,
                videoPath: newWorkout.video
            });
            if (response.status === 200) {
                console.log('Workout added successfully');
                updateWorkoutList([...all_workout, { id: response.data, ...newWorkout }]);
                setNewWorkout({ name: '', category: '', description: '', image: '', video: '' });
            } else {
                console.error('Failed to add workout');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    };

    
    const handleDeleteWorkout = async (workoutId) => {
        try {
            const response = await axios.delete('https://localhost:7286/Exercises/deleteExercise', {
                params: { id: workoutId }
            });
            if (response.status === 200) {
                console.log('Workout deleted successfully');
                updateWorkoutList(all_workout.filter(workout => workout.id !== workoutId));
            } else {
                console.error('Failed to delete workout');
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="admin-sections">
                <div className="admin-section">
                    <h2>Products</h2>
                    <div className="admin-form">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image Path"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <button onClick={handleAddProduct}>Add Product</button>
                    </div>
                    <div className="admin-list">
                        {all_product.map((product) => (
                            <div key={product.id} className="admin-item">
                                <p>{product.name}</p>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-section">
                    <h2>Workouts</h2>
                    <div className="admin-form">
                        <input
                            type="text"
                            placeholder="Workout Name"
                            value={newWorkout.name}
                            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newWorkout.category}
                            onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newWorkout.description}
                            onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image Path"
                            value={newWorkout.image}
                            onChange={(e) => setNewWorkout({ ...newWorkout, image: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Video Path"
                            value={newWorkout.video}
                            onChange={(e) => setNewWorkout({ ...newWorkout, video: e.target.value })}
                        />
                        <button onClick={handleAddWorkout}>Add Workout</button>
                    </div>
                    <div className="admin-list">
                        {all_workout.map((workout) => (
                            <div key={workout.id} className="admin-item">
                                <p>{workout.name}</p>
                                <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
