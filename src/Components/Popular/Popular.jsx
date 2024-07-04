import React, { useContext } from 'react';
import './Popular.css';
import { ShopContext } from "../../Context/ShopContext";
import Item from '../Item/Item';

const Popular = () => {
    const { all_product } = useContext(ShopContext);
    const popularProducts = all_product.slice(0, 4);

    return (
        <div className="popular">
            <h1>Popular</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />;
                })}
            </div>
        </div>
    );
};

export default Popular;
