import React from 'react'
import CartItems from '../Components/CartItems/CartItems'
import { useEffect } from 'react'

const Cart = () => {
    
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
        <div>
          <CartItems/>
        </div>
    )
}

export default Cart
