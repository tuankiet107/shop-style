import React from "react";
import { Nav } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="btn-pagination">
      <span>Trang</span>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          {pageNumbers.map((number) => (
            <Nav.Link
              key={number}
              className="btn-outline-primary"
              onClick={() => paginate(number)}
            >
              {number}
            </Nav.Link>
          ))}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Pagination;
