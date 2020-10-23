import React, { useContext, useState } from 'react';
import { globals } from '../globals';
import { RestaurantContext } from '../context/RestaurantContext'

const AddRestauraunt = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    const { addRestaurants } = useContext(RestaurantContext);

    const handleSumbit = async (e) => {
        // Prevents page reload which loses state in React application.
        e.preventDefault();

        const data = { name, location, price_range: priceRange };
        const baseURL= globals.baseURL;

        try {
            const response = await fetch(baseURL + 'restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => res.json());
            console.log(response);
            addRestaurants(response.data.restaurant)
        } catch (err) {
            console.log(err);
        }
    }

    return ( <div className='mb-4'>
                <form action="">
                    <div className="form-row">
                        <div className="col">
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                        </div>
                        <div className="col">
                            <input value={location} onChange={e => setLocation(e.target.value)}type="text" className="form-control" placeholder="location"/>
                        </div>
                        <div className="col">
                            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}className="custom-select my-1 mr-sm-2">
                                <option disabled>Price Range</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        </div>
                        <button type='submit' onClick={handleSumbit} className="btn btn-primary">Add</button>
                    </div>
  
                </form></div>);
}

export default AddRestauraunt;