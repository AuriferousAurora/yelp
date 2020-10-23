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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(baseURL + 'restaurants/' + id, { method: 'DELETE' })
                                .then((res) => res.json());
            if (response.status === 'success') {
                setRestaurants(restaurants.filter((r) => { return r.id !== id; }));
            } else { throw response.data.status; }
        } catch (err) {
            console.log(err);
        }
    }

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
                                    {/* () => instead of just passing the name without parenthese passes a reference to the function so it won't execute immediately. */}
                                    <td><button className="btn btn-danger" onClick={() => handleDelete(r.id)}>Delete</button></td>
                                </tr>
                            )
                        })}                    
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;