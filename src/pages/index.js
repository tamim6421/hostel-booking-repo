import Head from "next/head";
import Image from "next/image";
import Style from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/api";
import { baseImgUrl } from "@/utils/imgUrl";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";



export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
       .get(BASE_URL + "/building_view")
       .then((response) => {
          setData(response?.data);
       });
    },[]);


   //console.log(data);

  return (
    <>
      <Head>
        <title>NR  HOSTEL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${Style.home} pt-3`}>
        <Container>
           <div className="headerTitle mb-3">
             <h3 class="text-primary text-center fs-2 fw-bolder ">Book Your Seat</h3>
           </div>
          <Row>


      {data?.data?.map((item, index) => (
          <Col key={index} md={3} sm={12}>
                <div
                  style={{ border: "1px solid gray", borderRadius: "5px" }}
                   className="mb-4 bg-light bg-gradient shadow"
                >

    {item?.building_image !== null ? (
           <Image src={baseImgUrl + item?.building_image} className="img-fluid w-full" width={500} height={500} alt="" />
           //<Image src="https://library.amaderthikana.com/uploads/booking/booking-1264680501.png" className="img-fluid w-full" width={300} height={600} alt="" />
        ) : ( 
            <Image src="/fh.jpg" className="img-fluid w-full" width={300} height={300} alt="" />
        )}  
              
                <span
                  className="text-center text-white d-flex justify-content-center align-items-center"
                  style={{ background: "gray", padding: "3px 12px"}}
                >
                  Available seat: 20
                </span>
                <hr/>
                <div className="p-2">
                  <h4 style={{ fontSize: "20px", fontWeight: 700 }}>
                    {item?.building_name}
                  </h4>
                  <h5 style={{ fontSize: "18px" }}>{item?.building_address}</h5>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                       <Link href={`/building-details/${item.id}`} className="d-flex justify-content-center text-decoration-none">
                            <Button className="py-1 btn btn-info text-white px-3">বিস্তারিত</Button>
                      </Link>
                  </div>
                </div>
                 </div>
             </Col>
           ))}




          </Row>
        </Container>
      </main>
    </>
  );
}
