import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemList = () => {
  // State to hold the list of items
  const [items, setItems] = useState([]);

  // State to manage loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/inv/v1/");
        setItems(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of items
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            {item.boxContents.map((content) => (
              <li>{content}</li>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
