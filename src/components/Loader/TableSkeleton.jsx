import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";

const TableSkeleton = () => {
  return (
    <Container className="min-vh-100">
     

      <Row>
       

        <Col lg={12} md={12} sm={12} className="p-3 ">
          <div className=" shadow-sm rounded-1 bg-white">
            <div className="card-body">
              <Skeleton count={7} />
            </div>
          </div>
        </Col>



      </Row>
    </Container>
  );
};

export default TableSkeleton;
