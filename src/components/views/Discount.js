import React, { useEffect, useState } from "react";
import firebase from "firebase";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Discount() {
  let settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1000,
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const [data, setData] = useState();
  let products = [];

  useEffect(() => {
    async function getDataFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .get()
        .then((doc) => {
          setData(doc.data());
        });
    }

    getDataFromDB();
  }, []);

  if (data) {
    Object.keys(data.products).forEach((product) => {
      if (data.products[product].discount) {
        products.push(data.products[product]);
      }
    });
  }

  products.sort((a, b) => {
    return b.date - a.date;
  });

  let result = products.map((product, index) => {
    return (
      <div className="box" key={index}>
        <div className="image">
          <img alt="" src={product.image} />
        </div>
        <div className="details">
          <span className="name">{product.name}</span>
          <span className="price">{product.price}.000đ</span>
        </div>
      </div>
    );
  });

  return (
    <div className="discount">
      <div className="title">
        <h2>Giảm giá</h2>
      </div>
      <Slider {...settings}>{result}</Slider>
    </div>
  );
}

export default Discount;
