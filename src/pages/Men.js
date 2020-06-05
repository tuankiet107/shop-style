import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { addBasket } from '../actions/addAction';

import boy1 from '../img/boys/img1.webp';
import boy2 from '../img/boys/img2.webp';
import boy3 from '../img/boys/img3.webp';
import boy4 from '../img/boys/img4.webp';
import boy5 from '../img/boys/img5.webp';
import boy6 from '../img/boys/img6.webp';

function Men(){
    // this is here to get all product from store
    let products = 
    [    {
        id: "83eccdfe-753c-41bb-99f8-69d42f3bf892",
        name: "Photocat",
        price: 19.00,
        image: boy1,
        numbers: 0,
        inCart: false,
      }, 
      {
        id: "37f16990-6173-4789-b911-046bd3c75aab",
        name: "Dabjam",
        price: 45.00,
        image: boy2,
        numbers: 0,
        inCart: false
      }, 
      {
        id: "e40a2186-d52c-4a39-a24f-491801e50317",
        name: "Fivespan",
        price: 45.00,
        image: boy3,
        numbers: 0,
        inCart: false
      },
      {
        id: "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
        name: "Trilith",
        price: 15.00,
        image: boy4,
        numbers: 0,
        inCart: false
      },
      {
        id: "a84bfsaf-4casf-4cfas-9f00-fasfajsfassf",
        name: "Triple",
        price: 85.00,
        image: boy5,
        numbers: 0,
        inCart: false
      },
      {
        id: "fasfasfsaf-jfj6u-4cfas-0100-1asf5sfas5",
        name: "Banana",
        price: 40.00,
        image: boy6,
        numbers: 0,
        inCart: false
      }
    ]

    let result = products.map((product,index) => {
        return  <div className="info-product" key={index}>
                    <img alt="" src={product.image} />
                    <div className="details">
                        <span>{product.name}</span>
                        <span>{product.price}.000đ</span>
                    </div>
                    <div className="overlay"></div>
                    <div onClick={ () => addBasket(product)} className="button"><a> Add to cart </a> </div>
                </div>
    })
    return(
        <div className="page-products">
            <div className="title">Men</div>
            <Container>
                <Row>
                    <Col xs={12}>
                        {result}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Men;