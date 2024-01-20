import React from 'react';
import { Container } from 'react-bootstrap';
import Style from './Footer.module.css'
import Image from 'next/image';

const Footer = () => {
    return (
        <div style={{background: "#cecece"}}>
            <Container>
                <div className="text-center py-3">
                    <p className="m-0">© 2023 DU Club. Developed By
                    
                     <a href="http://ancovabd.com/">
                     <Image src="/ancova.jpeg" alt="" className="img-fluid custom-image" style={{height:"30px"}} width={100} height={100} />
                        </a> </p>
                </div>
            </Container>
        </div>
    );
};

export default Footer;