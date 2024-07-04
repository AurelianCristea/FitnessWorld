import React from "react";
import './ProductDisplay.css'
import minus_icon from '../Assets/minus_icon.png'
import plus_icon from '../Assets/plus_icon.png'
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useEffect } from "react";
import { useRef } from "react";



const ProductDisplay = (props) => {
  
  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(quantity);

  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");

  useEffect(() => {
      quantityRef.current = quantity;
  }, [quantity]);

  const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
      if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1);
      }
  };
 
    return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-price">
            {product.price} $
        </div>
        <div className="productdisplay-right-flavor">
          <h1>Select Flavor:</h1>
          <select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
              <option value="Chocolate">Chocolate</option>
              <option value="Vanilla">Vanilla</option>
              <option value="PeanutButter">Peanut Butter</option>
              <option value="Caramel">Caramel</option>
              <option value="SaltedCaramel">Salted Caramel</option>
              <option value="CookiesAndCream">Cookies and Cream</option>
          </select>
        </div>
        <div className="productdisplay-right-quantity">
          <h3>Quantity:</h3>
          <img src={minus_icon} alt="" onClick={decreaseQuantity} />
          <h4>{quantity}</h4>
          <img src={plus_icon} alt="" onClick={increaseQuantity} />
        </div>
        <button onClick={() => addToCart(product.id, quantityRef.current, selectedFlavor)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDisplay;