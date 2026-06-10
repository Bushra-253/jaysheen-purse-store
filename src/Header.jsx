import React, { useEffect, useState } from 'react'

import './style.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Header = ({ refreshCart }) => {

  const [totalcart, setTotalcart] = useState(0)
  const [productcart, setProductcart] = useState([])
  const [loading, setLoading] = useState(false);
  axios.defaults.withCredentials = true;

  // GET CART DATA
  const cart = async () => {

    try {

      const response = await axios.get(
        "https://jaysheen-e-commerce-website-production.up.railway.app/cart/list",
        {
          withCredentials: true
        }
      );

      setTotalcart(response.data.count)
      setProductcart(response.data.data)

    } catch (error) {

      console.error("Error fetching cart:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load cart."
      );
    }
  };


  const [formdata, setFormdata] = useState({

    name: "",
    email: "",
    phone: "",
    location: "",
    products: ""
  });
  const adddata = (e) => {
    const { name, value } = e.target;


    // Baaki saare normal text inputs ke liye
    setFormdata({ ...formdata, [name]: value });

  };
  let savedata = async (event) => {

    event.preventDefault();

    setLoading(true);

    try {

      const checkoutData = {
        ...formdata,
        products: productcart
      };

      const res = await axios.post(
        'https://jaysheen-e-commerce-website-production.up.railway.app/checkout/store',
        checkoutData,
        {
          withCredentials: true
        }
      );

      console.log(res.data);

      setFormdata({
        name: '',
        email: '',
        phone: '',
        location: '',
        products: ''
      });

      setLoading(false);

      // CLOSE CHECKOUT MODAL
      const checkoutModalEl =
        document.getElementById('exampleModalls');

      const checkoutModal =
        window.bootstrap.Modal.getOrCreateInstance(
          checkoutModalEl
        );

      checkoutModal.hide();

      // OPEN CONFIRMATION MODAL
      const confirmModalEl =
        document.getElementById('confirmationModal');

      const confirmModal =
        window.bootstrap.Modal.getOrCreateInstance(
          confirmModalEl
        );

      confirmModal.show();

    } catch (error) {

      setLoading(false);

      console.log(error);

    }
  };

  // LOAD CART
  useEffect(() => {
    cart()
  }, [refreshCart]);

  // DELETE PRODUCT
  const handleDelete = async (productName) => {

    try {

      const response = await axios.delete(
        "https://jaysheen-e-commerce-website-production.up.railway.app/cart/delete",
        {
          data: { name: productName }
        }
      );

      if (response.data.success) {

        // REFRESH CART
        cart();
      }

    } catch (error) {

      console.error(
        "Failed to delete item:",
        error.response?.data?.message || error.message
      );
    }
  };



  const closeAndRefresh = () => {

    const confirmModalEl =
      document.getElementById('confirmationModal');

    const confirmModal =
      window.bootstrap.Modal.getOrCreateInstance(
        confirmModalEl
      );

    confirmModal.hide();

    window.location.reload();

  };


const totalPrice = productcart.reduce(
  (total, item) =>
    total + (Number(item.price) * Number(item.quantity)),
  0
);

const discount = totalPrice * 0.05;

const finalPrice = totalPrice - discount;
  return (
    <>
      <nav className="navbar navbar-expand-lg a">
        <div className="container-fluid b">

          <img
            src="./Downloads/logo.jpeg"
            width={50}
            height={50}
            className='b1'
            alt=""
          />
<div className=" d-sm-flex d-lg-none">
  <button
    className="btn btn-outline-dark fw-bold"
    data-bs-toggle="modal"
    data-bs-target="#cartModal"
  >
    <i className="fa-solid fa-cart-arrow-down"></i>
    {" "}Cart ({totalcart})
  </button>
</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item b4">
                <Link
                  className="nav-link active fw-bold"
                  to={'/'}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item b4">
                <a className="nav-link fw-bold text-dark" href="#about" >
                  About
                </a>
              </li>

              <li className="nav-item dropdown b4">
                <a
                  className="nav-link fw-bold text-dark"
                  href="#product"
                >
                  Products
                </a>
              </li>

             

              <li className="nav-item b4">
                <a
                  className="nav-link fw-bold text-dark"
                  href={'#contact'}
                >
                  Contact
                </a>
              </li>

            </ul>

           <div className="d-none d-lg-flex">
  <button
    className="btn btn-outline-dark fw-bold"
    data-bs-toggle="modal"
    data-bs-target="#cartModal"
  >
    <i className="fa-solid fa-cart-arrow-down"></i>
    {" "}Cart ({totalcart})
  </button>
</div>

          </div>
        </div>
      </nav>

      {/* MODAL */}

   <div className="modal" id="cartModal">

  <div className="modal-dialog modal-lg">

    <div className="modal-content">

      <div className="modal-header a">

        <h1 className="modal-title fs-5 text-dark">
          PRODUCTS ON CART
        </h1>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div className="modal-body c6 ">

        <table className='table table-bordered '>

          <thead className=''>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {
              productcart.length < 1 ?

                <tr>
                  <td
                    colSpan={7}
                    className='text-center'
                  >
                    Product not found
                  </td>
                </tr>

                :

                productcart.map((v, i) => {

                  const itemTotal =
                    Number(v.price) * Number(v.quantity);

                  return (
                    <tr key={i}>

                      <td >{i + 1}</td>

                      <td>{v.name}</td>

                      <td>
                        <img
                          src={`https://jaysheen-e-commerce-website-production.up.railway.app/uploads/${v.image}`}
                          alt=""
                          width={80}
                        />
                      </td>

                      <td>
                        Rs. {v.price}
                      </td>

                      <td>
                        {v.quantity}
                      </td>

                      <td>
                        Rs. {itemTotal}
                      </td>

                      <td>
                        <button
                          className="a text-dark  btn-sm"
                          onClick={() => handleDelete(v.name)}
                        >
                          <i className="fa-solid fa-trash-can "></i>
                        </button>
                      </td>

                    </tr>
                  )
                })
            }

          </tbody>

        </table>

        {/* PRICE SECTION */}

        <div className="text-center  my-5">

          <p>
            Total Price :
            <span className="text-dark">
              {" "}
              Rs.
              {
                productcart.reduce(
                  (total, item) =>
                    total +
                    (Number(item.price) *
                      Number(item.quantity)),
                  0
                )
              }
            </span>
          </p>

          <p>
            Delievery Charges :
            <span className="text-dark">
              {" "}
               Rs.
              300
               
            </span>
          </p>

          <h5>
            Final Price :
            <span className="text-dark">
              {" "}
              Rs.
              {
                (
                  productcart.reduce(
                    (total, item) =>
                      total +
                      (Number(item.price) *
                        Number(item.quantity)),
                    0
                  ) +
                 300
                ).toFixed(2)
              }
            </span>
          </h5>

        </div>

      </div>

      <div className="modal-footer">

        <button
          className='a text-dark'
          onClick={() => {

            // CLOSE CART MODAL
            const cartModalEl =
              document.getElementById('cartModal');

            const cartModal =
              window.bootstrap.Modal.getOrCreateInstance(
                cartModalEl
              );

            cartModal.hide();

            // OPEN CHECKOUT MODAL
            const checkoutModalEl =
              document.getElementById('exampleModalls');

            const checkoutModal =
              window.bootstrap.Modal.getOrCreateInstance(
                checkoutModalEl
              );

            checkoutModal.show();

          }}
        >
          Checkout
        </button>

      </div>

    </div>

  </div>

</div>

      <div
        className="modal "
        id="confirmationModal"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                Order Confirmation
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={closeAndRefresh}
              ></button>
            </div>

            <div className="modal-body text-center">

              <h4 className="text-success">
                ✅ Order placed successfully!
              </h4>

              <p>
                Thank you for your order.
              </p>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-primary"
                onClick={closeAndRefresh}
              >
                OK
              </button>
            </div>

          </div>
        </div>
      </div>



      <div className="modal " id="exampleModalls" tabIndex="-1" >        <div className="modal-dialog">
        <div className="modal-content">
          <form >
            <div className="modal-header a ">
              <h1 className="modal-title fs-5 text-dark " id="exampleModalLabel">CHECKOUT</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                loading && (
                  <h4 className="text-center text-primary mb-3">
                    Processing your order...
                  </h4>
                )
              }
              
              <label className=' ' htmlFor="">Name:</label><br />
              <input className='bg-light text-dark d2  my-2 text-dark' name='name' type="text" placeholder='Enter Your Name' onChange={adddata} value={formdata.name} required /><br />
              <label className='' htmlFor="">Email:</label><br />
              <input className='bg-light text-dark d2  my-2' name='email' type="Email" placeholder='Enter Your Email' value={formdata.email} onChange={adddata} required /><br />
              <label className='' htmlFor="">Phone Number:</label><br />
              <input className='bg-light text-dark d2  my-2' name='phone' type="text" placeholder='Enter Your PhoneNumber' value={formdata.phone} onChange={adddata} required /><br />
              <label className='' htmlFor="">Address:</label><br />
              <textarea
                className="bg-light text-dark d2"
                name="location"
                value={formdata.location}
                onChange={adddata}
              />

            </div>
            <button
              type="button"
              className='a text-dark my-5'
              onClick={savedata}
            >
              save
            </button>
          </form>
        </div>
      </div>
      </div >
    </>
  )
}

export default Header
