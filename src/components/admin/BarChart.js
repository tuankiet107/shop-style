import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";
import { Bar } from "react-chartjs-2";
import firebase from "firebase";
import ConvertDate from "../features/ConvertDate";
import ConvertPrice from "../features/ConvertPrice";

function BarChart() {
  const [products, setProducts] = useState([]);
  const [fiveProducts, setFiveProducts] = useState([]);
  let data,
    numbers = [],
    names = [];
  let date = new Date();

  useEffect(() => {
    async function getTopFiveProducts() {
      firebase
        .firestore()
        .collection("orders")
        .doc("HoHkP9DFHkPdW04iewmG")
        .get()
        .then((doc) => {
          let temp = doc.data();
          let tempPro = [];
          Object.keys(temp).forEach((item) => {
            tempPro.push(temp[item]);
          });
          setProducts(tempPro);
        });
    }

    getTopFiveProducts();
  }, []);

  if (products.length > 0) {
    let arr = [];
    products.forEach((item) => {
      let objDate = ConvertDate(item);
      if (objDate.month === date.getMonth() + 1) {
        arr.push(...item.products);
      }
    });

    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }
    let groupedPeople = groupBy(arr, "id");

    let results = [];
    Object.keys(groupedPeople).forEach((item) => {
      let qty = groupedPeople[item].reduce((totalQty, product) => {
        return totalQty + product.quantity;
      }, 0);
      let obj = groupedPeople[item][0];
      results.push({ ...obj, quantity: qty });
    });

    results.sort((a, b) => b.quantity - a.quantity);
    data = results.splice(0, 5);
    for (let i of data) {
      names.push(i.name);
      numbers.push(i.quantity);
    }
  }

  return (
    <Row>
      <MenuLeft />
      <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
        <Container className="page-chart">
          <h3>
            Thống kê top 5 sản phẩm bán được nhiều nhất trong tháng
            {date.getMonth() + 1 + "/" + date.getFullYear()}
          </h3>

          <div className="bar-chart">
            <Bar
              data={{
                labels: names,
                datasets: [
                  {
                    label: "Đã bán (số lượng)",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      "#c45850",
                    ],
                    data: numbers,
                  },
                ],
              }}
              width={800}
              height={300}
            />
          </div>
          <div className="table-products">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Mã</th>
                  <th>Giá tiền</th>
                  <th>Đã bán</th>
                </tr>
              </thead>
              <tbody>
                {data !== undefined
                  ? data.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={product.image} alt="" />
                          </td>
                          <td className="name">{product.name}</td>
                          <td>{product.id}</td>
                          <td>
                            {product.priceDiscount
                              ? ConvertPrice(product.priceDiscount)
                              : ConvertPrice(product.price)}
                          </td>
                          <td>{product.quantity}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
        </Container>
      </Col>
    </Row>
  );
}

export default BarChart;
