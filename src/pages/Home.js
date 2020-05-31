import React, {Component} from 'react';

import Slides from '../components/Slides';
import Products from '../components/Products';
import SlideSlick from '../components/SlideSlick';
import Footer from '../components/Footer';

class Home extends Component {
    render(){
        return(
            <div>
                <Slides />

                <SlideSlick />

                <Products />

                <Footer />

                <div className="footer-copyright">
                    <p>
                    All Rights Reserved. © 1999  
                    <a href="/home"> The ShopStyle  </a>
                    Design By: 
                    <a href="/home"> Tuan Kiet</a>
                    </p>
                </div>

            </div>
        )
    }
}

export default Home;