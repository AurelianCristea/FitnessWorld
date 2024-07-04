import React, { useContext, useState } from 'react';
import './CSS/Supplements.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import Banner from '../Components/Banner/Banner';
import loading_icon from '../Components/Assets/loading_icon.png';
import { useEffect } from 'react';

const Supplements = () => {
    const { all_product } = useContext(ShopContext);
    const [itemsToShow, setItemsToShow] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCategoryFilters, setShowCategoryFilters] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const loadMore = () => {
        setItemsToShow(prev => prev + 12);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const toggleCategoryFilters = () => {
        setShowCategoryFilters(prevState => !prevState);
    };

    const totalItemsToShow = itemsToShow > all_product.length ? all_product.length : itemsToShow;

    return (
        <div className='supplements'>
            <Banner />
            <div className='supplemets-indexSort'>
                <p>
                    <span>Showing 1-{totalItemsToShow}</span> out of {all_product.length} products
                </p>
                <div className='supplements-sort' onClick={toggleCategoryFilters}>
                    Sort by <img src={dropdown_icon} alt="" />
                    {showCategoryFilters && (
                        <div className="category-options">
                            <button onClick={() => handleCategoryChange('all')}>All</button>
                            <button onClick={() => handleCategoryChange('protein')}>Protein</button>
                            <button onClick={() => handleCategoryChange('creatine')}>Creatine</button>
                            <button onClick={() => handleCategoryChange('aminos')}>Aminos</button>
                            <button onClick={() => handleCategoryChange('pre')}>Pre-Workout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="supplements-products">
                {all_product.slice(0, itemsToShow).map((item, index) => {
                    if (selectedCategory === 'all' || item.category === selectedCategory) {
                        return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price} />
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="supplements-loadmore" onClick={loadMore}>
                Load More
                <img src={loading_icon} alt="" />
            </div>
        </div>
    )
}

export default Supplements;
