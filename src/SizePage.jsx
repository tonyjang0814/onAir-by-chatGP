import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PhotoSize = {
  SixTwo: "6x2",
  SixFour: "6x4",
  SixSix: "6x6",
} 

function SizePage() {
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    localStorage.setItem("photoSize",event.target.value);
  };

  return (
    <div>
      <h2>Choose Photo Size</h2>
      <form>
        <label>
          6x2
          <input
            type="radio"
            name="size"
            value="6x2"
            checked={size === "6x2"}
            onChange={handleSizeChange}
          />
        </label>
        <br />
        <label>
          6x4
          <input
            type="radio"
            name="size"
            value="6x4"
            checked={size === "6x4"}
            onChange={handleSizeChange}
          />
        </label>
        <br />
        <label>
          6x6
          <input
            type="radio"
            name="size"
            value="6x6"
            checked={size === "6x6"}
            onChange={handleSizeChange}
          />
        </label>
      </form>
      {size && (
          <button onClick={()=>navigate('/theme')}>Choose Photo Theme</button>
      )}
    </div>
  );
}

export default SizePage;
