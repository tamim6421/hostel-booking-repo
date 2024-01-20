/* eslint-disable react/prop-types */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

 const Img = ({ src, className }) => {
   return (
      <LazyLoadImage className={className || ""} alt="" effect="blur" src={src} style={{border:'5px solid #dee2e6'}} />
    );
  };

export default Img;