import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RestaurantContextProvider } from './context/RestaurantContext';

import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

render(
    <RestaurantContextProvider>
        <div className='container'>
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/restaurant/:id/' component={RestaurantDetailPage} />
                <Route exact path='/restaurant/:id/update' component={UpdatePage} />
            </Switch>
        </Router>
        </div>
    </RestaurantContextProvider>, document.getElementById('root'));