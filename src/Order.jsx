import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/checkout/get"
      );

      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5001/checkout/status/${id}`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="container mt-4">
      <h2>Orders</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-responsive">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Date</th>

              <th>Products</th>
              <th>Total</th>
              <th>Delievery Charges</th>
              <th>Final Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td>{order.name}</td>

                <td>{order.email}</td>

                <td>{order.phone}</td>

                <td>{order.location}</td>
<td>
  {new Date(
    new Date(order.createdAt).getTime() + 0 * 60 * 60 * 1000
  ).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</td>
               <td>
  <button
    className="btn btn-primary btn-sm"
    data-bs-toggle="modal"
    data-bs-target="#productsModal"
    onClick={() => setSelectedOrder(order)}
  >
    Show Products
  </button>
</td>

                <td>Rs. {order.totalPrice}</td>

                <td>Rs. {order.delieverycharges}</td>

                <td>
                  <strong>Rs. {order.finalPrice}</strong>
                </td>

                <td>
                  <span
                    className={`badge ${
                      order.status === "Pending"
                        ? "bg-warning text-dark"
                        : order.status === "Completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        updateStatus(order._id, "Completed")
                      }
                    >
                      Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(order._id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        updateStatus(order._id, "Pending")
                      }
                    >
                      Pending
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
  className="modal fade text-center"
  id="productsModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl">
    <div className="modal-content">

      <div className="modal-header">
        <h5 className="modal-title">
          Products of {selectedOrder?.name}
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div className="modal-body">
        <div className="row">
          {selectedOrder?.products?.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card text-center h-100 shadow-sm">

                <img
                  src={`http://localhost:5001/uploads/${product.image}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "400px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body">
                  <h5>{product.name}</h5>

                  <p>
                    <strong>Price:</strong> Rs. {product.price}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>

                  <p>
                    <strong>Total:</strong>{" "}
                    Rs. {product.price * product.quantity}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
      </div>
    </div>
  );
}