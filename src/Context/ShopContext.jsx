import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    const getDefaultCart = (products) => {
        let cart = {};
        for (let index = 0; index < products.length; index++) {
            cart[products[index].id] = 0;
        }
        return cart;
    };

    const getDefaultWorkoutCart = (workouts) => {
        let workoutCart = {};
        for (let index = 0; index < workouts.length; index++) {
            workoutCart[workouts[index].id] = 0;
        }
        return workoutCart;
    };

    const [all_product, setAllProduct] = useState([]);
    const [all_workout, setAllWorkout] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [workoutItems, setWorkoutItems] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get("https://localhost:7286/Products/getProducts");
                const workoutResponse = await axios.get("https://localhost:7286/Exercises/getExercises");

                const mappedProducts = productResponse.data.map(product => ({
                    id: product.id,
                    name: product.productName,
                    price: product.price,
                    description: product.description,
                    image: require(`../Components/Assets/${product.imagePath.split('\\').pop()}`),
                    category: product.category
                }));

                const mappedWorkouts = workoutResponse.data.map(workout => ({
                    id: workout.id,
                    name: workout.exerciseName,
                    category: workout.category,
                    description: workout.description,
                    image: require(`../Components/Assets/${workout.imagePath.split('\\').pop()}`), 
                    video: require(`../Components/Assets/${workout.videoPath.split('\\').pop()}`) 
                }));

                setAllProduct(mappedProducts);
                setAllWorkout(mappedWorkouts);
                setCartItems(getDefaultCart(productResponse.data));
                setWorkoutItems(getDefaultWorkoutCart(workoutResponse.data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const updateProductList = (updatedProducts) => {
        setAllProduct(updatedProducts);
    };

    const updateWorkoutList = (updatedWorkouts) => {
        setAllWorkout(updatedWorkouts);
    };

    const addToCart = (itemId, quantity, flavour) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + quantity,
            [`${itemId}_flavour`]: flavour,
        }));
    };

    const removeFromCart = (itemId, quantity) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemId] || 0) - quantity;
            if (newQuantity <= 0) {
                const newCartItems = { ...prev };
                delete newCartItems[itemId];
                return newCartItems;
            } else {
                return { ...prev, [itemId]: newQuantity };
            }
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0 && !isNaN(item)) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0 && !isNaN(item)) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const clearCart = () => {
        setCartItems(getDefaultCart(all_product));
    };

    const clearWorkouts = () => {
        setWorkoutItems(getDefaultWorkoutCart(all_workout));
    };

    const addToWorkout = (itemId) => {
        setWorkoutItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromWorkout = (itemId, quantity) => {
        setWorkoutItems((prev) => {
            const newQuantity = (prev[itemId] || 0) - quantity;
            if (newQuantity <= 0) {
                const newCartItems = { ...prev };
                delete newCartItems[itemId];
                return newCartItems;
            } else {
                return { ...prev, [itemId]: newQuantity };
            }
        });
    };

    const getTotalWorkoutItems = () => {
        let totalItems = 0;
        for (const item in workoutItems) {
            if (workoutItems[item] > 0 && !isNaN(item)) {
                totalItems += workoutItems[item];
            }
        }
        return totalItems;
    };

    const contextvalue = {
        all_product,
        all_workout,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        clearCart,
        clearWorkouts,
        addToWorkout,
        removeFromWorkout,
        workoutItems,
        getTotalWorkoutItems,
        updateProductList,
        updateWorkoutList
    };

    return (
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
