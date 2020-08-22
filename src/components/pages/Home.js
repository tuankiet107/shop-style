import React, {Component} from 'react';

import Slides from '../views/Slides';
import Products from '../views/Products';
import NewNow from '../views/NewNow';
import Footer from '../views/Footer';

class Home extends Component {
    render(){
        return(
            <div>
                <Slides />

                <NewNow />

                <Products />

            </div>
        )
    }
}

export default Home;