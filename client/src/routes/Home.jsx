import React from 'react';
import Header from '../components/Header';
import RestaurantForm from '../components/RestaurantForm';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
    return(
        <div>
            <Header/>
            <RestaurantForm/>
            <RestaurantList/>
        </div>
    );
}

export default Home;