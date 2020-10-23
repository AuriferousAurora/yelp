import React, { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import { globals } from '../globals';

const baseURL = globals.baseURL;

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);

    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch(baseURL + 'restaurants').then((res) => res.json())
            setRestaurants(response.data.restaurants);
            } catch (err) { console.log(err); }
        }
        fetchData();
    }, [])

    return ( 
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {restaurants && restaurants.map(r => {
                            return(
                                <tr key={r.id}>
                                    <td>{r.name}</td>
                                    <td>{r.location}</td>
                                    <td>{'$'.repeat(r.price_range)}</td>
                                    <td>***</td>
                                    <td><button className="btn btn-warning">Edit</button></td>
                                    <td><button className="btn btn-danger">Delete</button></td>
                                </tr>
                            )
                        })}                    
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;