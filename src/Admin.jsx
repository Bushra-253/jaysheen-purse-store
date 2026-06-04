import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [active, setActive] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "settings", label: "Settings" },
  ];
const styles = {
  

  main: {
    flex: 1,
    // backgroundColor: "#f1f5f9",
  },



  content: {
    padding: "20px",
  },

  cardGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "200px",
    backgroundColor: "blue",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    
  },

};
  // ✅ FETCH API DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const [productRes, orderRes] = await Promise.all([
        fetch("http://localhost:5001/Product/list"),
        fetch("http://localhost:5001/checkout/get"),
      ]);

      const productData = await productRes.json();
      const orderData = await orderRes.json();

      setProducts(productData.data );
      setOrders(orderData.data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const renderContent = () => {
  if (loading) return <h3>Loading...</h3>;

  // ================= DASHBOARD =================
  if (active === "dashboard") {
    return (
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <h3>📦 Total Products</h3>
          <h1>{products.length}</h1>
          <Link to={'/Product'}  className="text-white">Show Products</Link>
        </div>

        <div style={styles.card}>
          <h3>🧾 Total Orders</h3>
          <h1>{orders.length}</h1>
          <Link to={'/orders'} className="text-white">Show Orders</Link>

        </div>
      </div>
    );
  }

  // ================= PRODUCTS PAGE =================
  if (active === "products") {
    return (
      <div>
        <h2>📦 Products Page</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ================= ORDERS PAGE =================
  if (active === "orders") {
    return (
      <div>
        <h2>🧾 Orders Page</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>{o.totalPrice || o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ================= SETTINGS =================
  if (active === "settings") {
    return <h2>⚙️ Settings Page</h2>;
  }

  return null;
};

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
    
      {/* MAIN */}
      
      <div style={styles.main}>
      
      <h1 className="text-dark">Dashboard</h1>
        <div style={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}