import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Product() {

  const [productdata, setProductdata] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  const [formdata, setFormdata] = useState({
    category: "",
    name: "",
    price: "",
    description: "",
    images: []
  });

  // Handle Input
  const adddata = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormdata({
        ...formdata,
        images: [...files]
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value
      });
    }
  };

  // Submit Form
  const senddata = async (event) => {
    event.preventDefault();

    try {

      let data = new FormData();

      data.append('category', formdata.category);
      data.append('name', formdata.name);
      data.append('price', formdata.price);
      data.append('description', formdata.description);

      formdata.images.forEach((img) => {
        data.append('images', img);
      });

      let res;

      if (editId) {

        res = await axios.post(
          `http://localhost:5001/product/update/${editId}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

      } else {

        res = await axios.post(
          'http://localhost:5001/product/store',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

      }

      console.log(res.data);

      setFormdata({
        category: "",
        name: "",
        price: "",
        description: "",
        images: []
      });

      setExistingImages([]);
      setEditId(null);

      getdata();

    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  // Get Data
  const getdata = async () => {
    try {

      const res = await axios.get(
        'http://localhost:5001/product/list'
      );

      setProductdata(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const deletedata = async (id) => {
    try {

      await axios.get(
        `http://localhost:5001/product/delete/${id}`
      );

      getdata();

    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const editdata = (item) => {

    setFormdata({
      category: item.category,
      name: item.name,
      price: item.price,
      description: item.description,
      images: []
    });

    setExistingImages(
      Array.isArray(item.images)
        ? item.images.flat()
        : []
    );

    setEditId(item._id);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div style={{ padding: '20px' }}>

      <h2>
        {editId ? "Update Product" : "Add Product"}
      </h2>

      <form onSubmit={senddata}>

        {/* Name */}
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={adddata}
          className="form-control"
          required
        />

        {/* Price */}
        <label className="mt-2">Price</label>
        <input
          type="number"
          name="price"
          value={formdata.price}
          onChange={adddata}
          className="form-control"
          required
        />

        {/* Description */}
        <label className="mt-2">Description</label>
        <textarea
          name="description"
          value={formdata.description}
          onChange={adddata}
          className="form-control"
        />

        {/* Images */}
        <label className="mt-2">Product Images</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={adddata}
          className="form-control"
          accept="image/*"
        />

        {/* Existing Images Preview */}
        {
          editId &&
          existingImages.length > 0 && (
            <>
              <label className="mt-3">
                Current Images
              </label>

              <div className="d-flex flex-wrap gap-2 mt-2">

                {existingImages?.flat(2)?.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5001/uploads/${encodeURIComponent(img)}`}
                    width={100}
                    height={100}
                    className="me-2 mb-2"
                    style={{
                      objectFit: "cover",
                      border: "1px solid #ddd"
                    }}
                    alt={img}
                  />
                ))}

              </div>
            </>
          )
        }

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          {
            editId
              ? "Update Product"
              : "Save Product"
          }
        </button>

      </form>

      {/* Table */}

      <table className="table table-bordered mt-4">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Images</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {
            productdata.length < 1 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center"
                >
                  Product Not Found
                </td>
              </tr>
            ) : (

              productdata.map((v, i) => (

                <tr key={v._id}>

                  <td>{i + 1}</td>

                  <td>{v.name}</td>

                  <td>{v.price}</td>



                  <td>
                    {v.images?.flat(2)?.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5001/uploads/${encodeURIComponent(img)}`}
                        width={70}
                        height={70}
                        className="me-2 mb-2"
                        style={{ objectFit: "cover" }}
                        alt={img}
                      />
                    ))}


                  </td>

                  <td>{v.description}</td>

                  <td>

                    <button
                      className="btn btn-primary me-2"
                      onClick={() => editdata(v)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => deletedata(v._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )
          }

        </tbody>

      </table>

    </div>
  );
}