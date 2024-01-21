"use client";

import React, { useEffect, useState } from "react";
import Style from "@/styles/Booking.module.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/utils/api";
import Swal from "sweetalert2";

const Booking_page = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rooms, setRoom] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedCookies = Cookies.get("TOKEN_LOGIN");
    setToken(storedCookies);
  }, []);
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + `/booking_view`, {
          headers: {
            booking_token: token,
          },
        });

        // Assuming the response.data has a property named 'room'
        setRoom(response?.data?.data || []);

        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  console.log(rooms);

  const handelCancle = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to cancel booking",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        console.log(id);

        const res = await axios.get(BASE_URL + `/booking_cencel/${id}`, {
          headers: {
            booking_token: token,
          },
        });
        console.log(res);

        Swal.fire({
          title: "Canceled!",
          text: "Your booking has been canceled.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while canceling the booking.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-vh-100">
      <h2 className="text-center mt-5 fw-bold text-primary">Booking Details</h2>

      {rooms?.map((room) => (
        <div key={rooms.id} className=" mb-5">
          <div className="shadow-sm  bg-light rounded border w-75 mx-auto">
            <div className="px-3">
              <p>Request No : </p>
              <p>Booking Id: {room?.booking_member_id} </p>
            </div>
            <div className="container d-md-flex justify-content-between border-top ">
              <div className="d-flex ">
                <div className="text-center d-flex-col text-white">
                  <div className="bg-primary bg-gradient px-3 py-2">Floor</div>
                  <div className="bg-primary bg-gradient bg-gradient px-3 py-2">
                    Flat No{" "}
                  </div>
                  <div className="bg-primary bg-gradient px-3 py-2">
                    Room No{" "}
                  </div>
                </div>
                <div className="d-flex-col text-white">
                  <div className="bg-info bg-gradient px-5 py-2">
                    {room?.floor_name}
                  </div>
                  <div className=" bg-info bg-gradient px-5 py-2">A - 01</div>
                  <div className="bg-info bg-gradient px-5 py-2">401, 403</div>
                </div>
              </div>
              <div>
                <p>
                  Booking Status: <span className="fw-bold">Pending</span>{" "}
                </p>
                <p>Bhoot Er Bari, Frangate, Dhaka</p>
                <p>
                  Mobile: <span className="fw-bold"> 010839749</span>
                </p>
              </div>

              {/* payment and cancle  button */}
              <div>
                <p>
                  Due Amount :{" "}
                  <span className="fw-bold"> $ {room?.due_amount} </span>{" "}
                </p>
                <div className="d-flex align-items-end p-3 ">
                  <Button variant="primary me-2" onClick={handleShow}>
                    Payment Booking
                  </Button>
                  <Button
                    onClick={() => handelCancle(room?.booking_member_id)}
                    className="btn btn-danger"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* modal  */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make Payment </Modal.Title>
          </Modal.Header>
          <Modal.Body>Payment with Stripe </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              pay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Booking_page;
