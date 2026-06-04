import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Blogs } from '../Data/Blogs.js'
import Card from '../Components/Card.jsx'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState("");
  const [productdata, setProductdata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };
  // REFRESH HEADER CART
  const [refreshCart, setRefreshCart] = useState(false);

  let [count, setCount] = useState(1)

  let add = () => {
    setCount(count + 1)
  }

  const getdata = async () => {

    try {

      const res = await axios.get(
        'https://jaysheen-e-commerce-website-production.up.railway.app/product/list'
      );

      setProductdata(res.data.data);

      console.log(res.data)

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const increase = () => {
    setCount(prev => prev + 1);
  };

  const decrease = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  // ADD TO CART
  const addtocart = async () => {
    try {
      const response = await fetch(
        "https://jaysheen-e-commerce-website-production.up.railway.app/cart/store",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedProduct.name,
          image: selectedImage, // currently selected image
            price: selectedProduct.price,
            description: selectedProduct.description,
            quantity: count,
          }),
        }
      );

      const data = await response.json();

      setRefreshCart((prev) => !prev);

      setShow(false);
      setSelectedProduct(null);

      setCount(1);

      // CLOSE MODAL COMPLETELY


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header refreshCart={refreshCart} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center text-opacity-90 my-3">
            <h3 className='text-dark b5'>Purse Store <i className="fa-solid fa-bag-shopping"></i></h3>
            <h5 className='text-dark b4'>HOME {'<<'} WEBSITE {'<<'}JAYSHEEN STORE</h5>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src="./Downloads/img for carousel 1.png" className="d-block object-fit-cover w-100" height="400vh" alt="..." />
            <div className="carousel-caption d-md-block" style={{ position: "absolute", top: "20px", left: "50px", textAlign: "left", transform: "none", maxWidth: "300px" }}>
              <h3 className='text-dark fw-bold b5'>"A masterpiece for your wardrobe."</h3>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="./Downloads/img for carousel 4.png" className="d-block object-fit-cover w-100" height="400vh" alt="..." />
            <div className="carousel-caption d-md-block" style={{ top: "0", bottom: "auto" }}>
              <h3 className='text-dark fw-bold b5'>"Hours of craft. One unique piece."</h3>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="./Downloads/img for carousel 5.png" className="d-block object-fit-cover w-100" height="400vh" alt="..." />
            <div className="carousel-caption d-md-block" style={{ top: "0", bottom: "auto" }}>
              <h3 className='text-dark fw-bold b5'>"The waitlist is open. Secure yours."</h3>
              <h2 className='text-dark fw-bold b5'>"Designed by you. Handcrafted by us."</h2>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-5">
        <h3 className='text-dark fw-bold b5'>DEAL OF THE DAY <i className="fa-solid fa-truck "></i></h3>
      </div>

      {/* Products Listing */}
      <div className="container mt-3" id='product'>
        <div className="row">

          {productdata.map((v, i) => (

            <div className="col-lg-4 col-md-6 mb-4" key={i}>

              <div className="card h-100 b6 c2 c1">

                {/* Swiper Start */}

                <div
                  id={`carousel-${i}`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {v.images?.flat(2)?.map((img, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={`https://jaysheen-e-commerce-website-production.up.railway.app/uploads/${encodeURIComponent(img)}`}
                          className="d-block w-100"
                          alt={v.name}
                          style={{
                            height: "225px",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            console.log("Failed:", img);
                            console.log(e.target.src);
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Previous Button */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carousel-${i}`}
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>

                  {/* Next Button */}
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carousel-${i}`}
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
                {/* Swiper End */}

                <div className="card-body">

                  <h6 className="card-title text-center fw-bold">
                    Rs. {v.price}/-
                  </h6>

                  <p className="card-title text-center">
                    {v.name}
                  </p>

                  <button
  className="btn text-dark a"
 onClick={() => {
  setSelectedProduct(v);

  const images = v.images?.flat(Infinity) || [];

  if (images.length > 0) {
    setSelectedImage(images[0]);
  } else {
    setSelectedImage("");
  }

  setShow(true);
}}
>
  Show Details
</button>
                </div>

              </div>

            </div>

          ))}

        </div>
      </div>
      {/* Info Sections */}
      <div className="container" id='about'>
        <div className="row my-5">
          <div className="col-lg-4 a b7 me-3">
            <h3>Our Mission <i className="fa-solid fa-book"></i></h3>
            <p>Provide trendy, practical,and reliable products <br />Ensure cutomer satisfaction through trusted services <br />Offer a smooth and enjoyable shopping experience <br /> Continuously update collection to match modern lifestyles</p>
          </div>
          <div className="col-lg-4 a me-3 b7">
            <h3>Our Vision <i className="fa-solid fa-eye"></i></h3>
            <p>To become a trusted one-step destination where customers can find quality, style, nad innovation across sports, fasshion, gadgets, home, and lifestyle collection</p>
          </div>
          <div className="col-lg-3 a me-3 b7">
            <h3>Our Value <i className="fa-regular fa-heart"></i></h3>
            <p>Quality First <br />Cutomer Trust <br />Variety & innovation <br /> Affordable Excellence</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="a" id='contact'>
        <h1 className='text-dark my-5'>OUR CUTOMER LOVE US</h1>
        <div className="row">
          <div className="col-lg-4 ms-3">
            <h3>Contact Us</h3>
            <p>Plz contact us if you have any Query or You want to Cutomize your Own Prduct on our Whatsapp No:</p>
            <div className="mt-3">
              <h3>03262555637 </h3>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Quick links</h3>
            <p>Home Page <br /> Search <br /> Privacy Policy <br /> Contact</p>
          </div>
          <div className="col-lg-3">
            <h3>Links</h3>
            <p>All collections <br />hjh <br /> All products</p>
          </div>
          <div className="mt-2">
            <i className="fa-regular fa-copyright"></i><p>2026--JAYSHEEN.Designed by Bushra Noor</p>
          </div>
        </div>
      </div>


      {show && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">

              {/* Condition check */}
              {selectedProduct && (
                <>
                  <form action="">
                    <input type="hidden" value={selectedProduct.name} name='name' />
<input
  type="hidden"
  value={selectedImage || ""}
  name="image"
/>                    <input type="hidden" value={selectedProduct.price} name='price' />
                    <input type="hidden" value={selectedProduct.description} name='description' />



                    <div className="modal-header a">
                      <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                        {selectedProduct.name}
                      </h1>
                      <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>






                    <div className="modal-body p-0 text-center">
                      <div className="container py-4 px-4">
                        {/* g-5 creates a wide, clean space between the left and right columns */}
                        <div className="row g-5 align-items-start">
                         <div className="col-lg-6 c3">

  {/* Main Image */}
  <div className="text-center mb-3">
    <img
      className="img-fluid w-100 rounded"
      src={
        selectedImage
          ? `https://jaysheen-e-commerce-website-production.up.railway.app/uploads/${encodeURIComponent(selectedImage)}`
          : ""
      }
      alt=""
      style={{
        maxHeight: "400px",
        objectFit: "contain",
      }}
      onError={(e) =>
        console.log("Main Image Error:", e.target.src)
      }
    />
  </div>

  {/* Thumbnail Carousel */}
  {selectedProduct.images?.flat(Infinity)?.length > 0 && (
  <div
    id="thumbnailCarousel"
    className="carousel slide"
    data-bs-ride="false"
  >
    <div className="carousel-inner">

      {selectedProduct.images
        .flat(Infinity)
        .reduce((groups, img, index, arr) => {
          if (index % 4 === 0) {
            groups.push(arr.slice(index, index + 4));
          }
          return groups;
        }, [])
        .map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`carousel-item ${
              groupIndex === 0 ? "active" : ""
            }`}
          >
            <div className="row g-2">

              {group.map((img, index) => (
                <div
                  key={index}
                  className="col-3"
                >
                  <img
                    src={`https://jaysheen-e-commerce-website-production.up.railway.app/uploads/${encodeURIComponent(
                      img
                    )}`}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    className="img-fluid"
                    style={{
                      height: "90px",
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "3px solid black"
                          : "1px solid #ccc",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}

            </div>
          </div>
        ))}
    </div>

    {selectedProduct.images.flat(Infinity).length > 4 && (
      <>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#thumbnailCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#thumbnailCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </>
    )}
  </div>
)}
</div>




                          <div className="col-lg-6 d-flex flex-column gap-4">


                            <div>
                              <h5 className="text-dark mb-1" style={{ fontSize: "1.1rem" }}>Price</h5>
                              <h3 className="text-dark fw-bold m-0">Rs: {selectedProduct.price}</h3>
                            </div>


                            <div>
                              <h5 className="text-dark mb-2" style={{ fontSize: "1.1rem" }}>Description</h5>
                              <p className="text-dark lh-base m-0">
                                {selectedProduct.description || "No description available for this item."}
                              </p>
                            </div>

                            <div>
                              <h5 className="text-dark mb-2" style={{ fontSize: "1.1rem" }}>
                                Quantity
                              </h5>

                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="input-group"
                                  style={{ width: "160px" }}
                                >
                                  {/* Minus Button */}
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={decrease}
                                  >
                                    −
                                  </button>

                                  {/* Quantity Input */}
                                  <input
                                    type="number"
                                    className="form-control text-center bg-light text-dark"
                                    value={count}
                                    name="quantity"
                                    readOnly
                                  />

                                  {/* Plus Button */}
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={increase}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="modal-footer a">
                      <button type="button" className=" text-dark a" onClick={handleClose}>Close</button>
                      <button type="button" className="a text-dark " onClick={addtocart}>Add to Cart</button>
                    </div>
                  </form>

                </>
              )}

            </div>
          </div>
        </div>



      )}

    </>
  )
}
