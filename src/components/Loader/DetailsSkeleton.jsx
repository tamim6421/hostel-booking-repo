import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";

const DetailsSkeleton = () => {
  return (
    <Container className="min-vh-100">
      <div className="">
        <div>
          <Col lg={12} md={12} sm={12} className="p-3 ">
            <div className=" shadow-sm rounded-1 bg-white">
              <div className="card-body">
                <Skeleton count={10} />
              </div>
            </div>
          </Col>
          
        </div>
        <div className="mt-5">
          
          <Col lg={6} md={12} sm={12} className="p-3 ">
            <div className=" shadow-sm rounded-1 bg-white">
              <div className="card-body">
                <Skeleton count={6} />
              </div>
            </div>
          </Col>
        </div>
      </div>
    </Container>
  );
};

export default DetailsSkeleton;
