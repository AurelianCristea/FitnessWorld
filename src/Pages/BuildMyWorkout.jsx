import React, { useContext, useState } from 'react';
import './CSS/BuildMyWorkout.css'; 
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Exercise from '../Components/Exercise/Exercise'; 
import Banner from '../Components/Banner/Banner';
import loading_icon from '../Components/Assets/loading_icon.png';
import { useEffect } from 'react';

const BuildMyWorkout = () => {
    const {all_workout} = useContext(ShopContext); 
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

    const totalItemsToShow = itemsToShow > all_workout.length ? all_workout.length : itemsToShow;

    return (
        <div className='build-my-workout'>
            <Banner />
            <div className='workout-indexSort'>
                <p>
                    <span>Showing 1-{totalItemsToShow}</span> out of {all_workout.length} workouts
                </p>
                <div className='workout-sort' onClick={toggleCategoryFilters}>
                    Sort by <img src={dropdown_icon} alt="" />
                    {showCategoryFilters && (
                        <div className="category-options">
                            <button onClick={() => handleCategoryChange('all')}>All</button>
                            <button onClick={() => handleCategoryChange('chest')}>Chest</button>
                            <button onClick={() => handleCategoryChange('back')}>Back</button>
                            <button onClick={() => handleCategoryChange('legs')}>Legs</button>
                            <button onClick={() => handleCategoryChange('shoulders')}>Shoulders</button>
                            <button onClick={() => handleCategoryChange('bicep')}>Biceps</button>
                            <button onClick={() => handleCategoryChange('tricep')}>Triceps</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="workout-products">
                {all_workout.slice(0, itemsToShow).map((item, index) => {
                    if (selectedCategory === 'all' || item.category === selectedCategory) {
                        return <Exercise key={index} id={item.id} name={item.name} image={item.image} />
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="workout-loadmore" onClick={loadMore}>
                Load More
                <img src={loading_icon} alt="" />
            </div>
        </div>
    )
}

export default BuildMyWorkout;
