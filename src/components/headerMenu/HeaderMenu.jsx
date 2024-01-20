/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./headerMenu.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";

const HeaderMenu = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [cookies, setCookies] = useState("");

  useEffect(() => {
    // Fetch cookies when the component mounts
    const storedCookiess = Cookies.get("TOKEN_LOGIN");
    setCookies(storedCookiess);
  }, [router]); // Empty dependency array ensures that this effect runs only once on mount

  console.log(cookies);



  // let storedCookiess = Cookies.get("TOKEN_LOGIN");
  // setCookies(storedCookiess)

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

    // Logout button
    const handleLogout = () => {
      const removeCookies = Cookies.remove("TOKEN_LOGIN");
      setCookies(removeCookies);
      // localStorage.removeItem("user-info");
      router.push("/");
    };

  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" className={Style.navbar}>
      <Container>
        <Navbar.Brand className={Style.menuBrand}>
          <Link href="/">
            {/* <img
              className={Style.logo}
              src="/duclub.png"
              alt=""
              onClick={() => setExpanded(false)}
            /> */}
           <div>
            <span className="text-danger fs-2 fw-bolder">NR</span> <span className="fs-4 text-primary fw-bolder">HOSTEL</span>
           </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
          <Nav
            className={`${Style.nav} ms-auto justify-content-end d-flex menu-right p-0`}
          >
            {/* Home Link */}

            <Nav>
              <Link
                href="/"
                onClick={() => setExpanded(false)}
                className={`${activeItem === "/" ? Style.active : ""} ${
                  Style.link
                }`}
              >
                Home
              </Link>


            </Nav>
            {cookies ? (
              <Nav>


                {/* <Link
                  href="/dashboard"
                  onClick={() => setExpanded(false)}
                  className={`${
                    activeItem === "/dashboard" ? Style.active : ""
                  } ${Style.link}`}
                >
                  Dashboard
                </Link> */}

                <Link
                    href="/booking_page"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/booking_page" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Booking Info
                  </Link>

                  {/* <dispatchEvent className="mt-3 ">Danger</dispatchEvent> */}
                  <p
                   size="sm"
                   variant="info"
                   className="fs-6 mt-3 fw-bold "
                    onClick={handleLogout} style={{cursor: "pointer"}}
                  >
                     <FiLogOut className="me-1 text-danger fw-bold" />
                   Logout
                  </p>
                    
                    
           
                   

              </Nav>
            ) : (
              <>
                <Nav>
                  <Link
                    href="/login"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/login" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Login
                  </Link>
                
                </Nav>
               
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export async function getServerSideProps() {
  // Fetch cookies on the server side
  const storedCookies = Cookies.get("TOKEN_LOGIN") || "";
  return {
    props: {
      cookies: storedCookies,
    },
  };
}

export default HeaderMenu;


