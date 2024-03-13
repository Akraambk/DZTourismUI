import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./newRoom.scss";
import axios from "axios";

const NewRoom = () => {
  const [roomType, setRoomType] = useState({
    name: "",
    description: "",
    id_Hotel: "",
    bed_Type: "",
    room: []
  });
  const [roomNumbers, setRoomNumbers] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:9090/Hotel/getAllHotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const handleRoomTypeChange = (e) => {
    setRoomType({
      ...roomType,
      [e.target.name]: e.target.value
    });
  };

  const handleRoomNumbersChange = (e) => {
    setRoomNumbers(e.target.value);
  };

  const handleRoomDescriptionChange = (e) => {
    setRoomDescription(e.target.value);
  };

  const handleRoomCapacityChange = (e) => {
    setRoomCapacity(e.target.value);
  };

  const addRooms = () => {
    const roomNumbersArray = roomNumbers.split(",").map(roomNumber => roomNumber.trim());
    const rooms = roomNumbersArray.map(roomNumber => ({
      room_number: roomNumber,
      availability_status: true, 
      description: roomDescription,
      capacity: roomCapacity
    }));
    setRoomType({
      ...roomType,
      room: rooms
    });
    
  };

  const submitForm = async () => {
    try {
      await axios.post("http://localhost:9090/RoomType/CreateRoomType", roomType);
      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error creating room type and rooms:", error);
    }
  };

  const addRoomsAndSubmit = () => {
    addRooms(); // Add rooms to the room list
    submitForm(); // Submit the form
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room Type and Rooms</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="roomName">Room Type Name:</label>
                <input type="text" id="roomName" name="name" value={roomType.name} onChange={handleRoomTypeChange} />
              </div>
              <div className="formInput">
                  <label htmlFor="roomDescription">Room Type Description:</label>
                  <input type="text" id="roomDescription" name="description" value={roomType.description} onChange={handleRoomTypeChange} />
              </div>
              <div className="formInput">
                <label htmlFor="hotel">Hotel:</label>
                <select id="hotel" name="id_Hotel" value={roomType.id_Hotel} onChange={handleRoomTypeChange}>
                  <option value="">Select a hotel</option>
                  {hotels.map(hotel => (
                  <option key={hotel.id_Hotel} value={hotel.id_Hotel}>{hotel.id_Hotel}  {hotel.name}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="roomNumbers">Room Numbers (separated by comma):</label>
                <input type="text" id="roomNumbers" value={roomNumbers} onChange={handleRoomNumbersChange} />
              </div>
              <div className="formInput">
                <label htmlFor="roomDescriptionInput">Room Description:</label>
                <input type="text" id="roomDescriptionInput" value={roomDescription} onChange={handleRoomDescriptionChange} />
              </div>
              <div className="formInput">
                <label htmlFor="roomCapacity">Room Capacity:</label>
                <input type="text" id="roomCapacity" value={roomCapacity} onChange={handleRoomCapacityChange} />
              </div>
              <div className="formInput">
                <button type="button" onClick={addRoomsAndSubmit}>Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;


