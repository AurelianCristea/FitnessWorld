import React, { useContext } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Supplements from "./Pages/Supplements";
import BuildMyWorkout from "./Pages/BuildMyWorkout";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import Exercise from "./Pages/Exercise";
import Workout from "./Pages/Workout";
import Admin from "./Pages/Admin";
import UserOrders from "./Pages/UserOrders";
import UserWorkout from "./Pages/UserWorkout";
import { UserContext } from "./Context/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AaKhG0YMkdlLnORYF_b42IL3pTf3tXnoMjw7q3zkbcrEbYSZu_yitLXJ2z_PGkPvj-6f2DoxYjX_VTuT",
        }}
      >
        <BrowserRouter>
          <Navbar loggedInUser={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/suplimente" element={<Supplements />} />
            <Route path="/workout" element={<BuildMyWorkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/exercise" element={<Exercise />}>
              <Route path=":exerciseId" element={<Exercise />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/workoutitems" element={<Workout />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/workouts" element={<UserWorkout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
