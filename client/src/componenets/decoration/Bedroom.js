import React, { useState } from "react";
import "./Bedroom.css";



import bedroom from "../assets/bedroom.PNG";
import dressingRoom from "../assets/dressingroom.PNG";
import kitchen from "../assets/kitchen.PNG";
import livingRoom from "../assets/living room.PNG";
import bathroom from "../assets/bathroom.PNG"; 
import modernBedroom from "../assets/modern bedroom.PNG";
import modernDressingRoom from "../assets/modern dressingroom.PNG";
import modernKitchen from "../assets/modern kitchen.PNG";
import santaLivingRoom from "../assets/santa livingroom.PNG";
import modernBathroom from "../assets/modern bathroom.PNG"; 

function Bedroom() {
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModernDecor, setIsModernDecor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roomImages = {
    bedroom: bedroom,
    dressingroom: dressingRoom,
    kitchen: kitchen,
    livingroom: livingRoom,
    bathroom: bathroom, 
  };

  const modernImages = {
    bedroom: modernBedroom,
    dressingroom: modernDressingRoom,
    kitchen: modernKitchen,
    livingroom: santaLivingRoom,
    bathroom: modernBathroom, 
  };

  const roomDescriptions = {
    bedroom: "A cozy bedroom for relaxation and sleep.",
    dressingroom:
      "A spacious dressing room for storing clothes and accessories.",
    kitchen:
      "A modern kitchen equipped with appliances for cooking and dining.",
    livingroom: "A comfortable living room for socializing and entertainment.",
    bathroom: "A clean and modern bathroom for personal hygiene.", 
    // Description
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setSelectedImage(reader.result);
        setIsLoading(false);
      };
    };
  };

  const toggleModernDecor = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsModernDecor(!isModernDecor);
      setSelectedImage(
        isModernDecor
          ? roomImages[selectedRoomType]
          : modernImages[selectedRoomType]
      );
      setIsLoading(false);
    }, 1500); // 1.5 seconds delay
  };

  return (
   

    <div>
      <h1 id="color-type-span">My LAB</h1>
      <div className="room-container">
        {selectedImage ? (
          <>
            <img src={selectedImage} alt="Room" className="room-image" />
            {isLoading && <div className="loading-indicator">Loading...</div>}
          </>
        ) : (
          <div className="placeholder-room">No image selected</div>
        )}
      </div>
      <div className="primary-buttons">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
        <button
          onClick={toggleModernDecor}
          disabled={!selectedImage || isLoading}
        >
          {isLoading
            ? "Loading..."
            : isModernDecor
            ? "Remove Modern Decor"
            : "Add Modern Decor"}
        </button>
      </div>
      <div className="secondary-buttons">
        <div className="anything" title={roomDescriptions.bedroom}>
          <button 
            onClick={() => {
              setSelectedRoomType("bedroom");
              setSelectedImage(isModernDecor ? modernBedroom : bedroom);
            }}
          >
            Bedroom
          </button>
          <span className="anythingtext">{roomDescriptions.bedroom}</span>
        </div>
        <div className="anything" title={roomDescriptions.dressingroom}>
          <button
            onClick={() => {
              setSelectedRoomType("dressingroom");
              setSelectedImage(
                isModernDecor ? modernDressingRoom : dressingRoom
              );
            }}
          >
            Dressing Room
          </button>
        </div>
        <div className="anything" title={roomDescriptions.kitchen}>

          <button
            onClick={() => {
              setSelectedRoomType("kitchen");
              setSelectedImage(isModernDecor ? modernKitchen : kitchen);
            }}
          >
            Kitchen
          </button>
          <span className="anythingtext">{roomDescriptions.kitchen}</span>
        </div>
        <div className="anything" title={roomDescriptions.livingroom}>
          <button
            onClick={() => {
              setSelectedRoomType("livingroom");
              setSelectedImage(isModernDecor ? santaLivingRoom : livingRoom);
            }}
          >
            Living Room
          </button>
          <span className="anythingtext">{roomDescriptions.livingroom}</span>
        </div>
        <div className="anything" title={roomDescriptions.bathroom}>
          <button
            onClick={() => {
              setSelectedRoomType("bathroom");
              setSelectedImage(isModernDecor ? modernBathroom : bathroom);
            }}
          >
            Bathroom
          </button>
          <span className="anythingtext">{roomDescriptions.bathroom}</span>
        </div>
      </div>
    </div>
  );
}

export default Bedroom;
