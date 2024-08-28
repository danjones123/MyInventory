import React, { useState, useEffect } from "react";
import "./AddBoxForm.css";
import { useNavigate } from "react-router-dom";

function AddBoxForm() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    boxContents: [],
    room: "",
  });
  const [newContent, setNewContent] = useState("");
  const [rooms, setRooms] = useState([]);

  // Fetch the list of rooms from the API when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/inv/v1/rooms");
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          console.error("Failed to fetch rooms:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewContentChange = (e) => {
    setNewContent(e.target.value);
  };

  // Add a new content item to the contents array
  const handleAddContent = () => {
    if (newContent.trim() !== "") {
      setFormData({
        ...formData,
        boxContents: [...formData.boxContents, newContent],
      });
      setNewContent(""); // Clear the input field after adding
    }
  };

  // Remove a content item from the contents array
  const handleRemoveContent = (contentToRemove) => {
    setFormData({
      ...formData,
      boxContents: formData.boxContents.filter(
        (content) => content !== contentToRemove
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/inv/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        nav("/view-box");
        // You can redirect the user, clear the form, or show a success message here
      } else {
        console.error("Error submitting the form:", response.statusText);
        // Handle errors here, such as showing an error message
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors here, such as showing an error message
    }
  };

  //Calls localhost:8080/inv/v1/ with POST
  //body -> "name: str", "boxContents: list<str>", "room: str"

  return (
    <div className="form-container">
      <h2>Add a New Box</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contents:</label>
          <ul>
            {formData.boxContents.map((content, index) => (
              <li key={index}>
                {content}
                <button
                  type="button"
                  onClick={() => handleRemoveContent(content)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newContent}
            onChange={handleNewContentChange}
            placeholder="Add new content"
          />
          <button type="button" onClick={handleAddContent}>
            Add Content
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="room">Room:</label>
          <select
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBoxForm;
