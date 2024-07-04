import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import { useEffect } from 'react'

const Home = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <Hero/>
            <Popular/>
            <NewsLetter/>
        </div>
    )
}

export default Home

