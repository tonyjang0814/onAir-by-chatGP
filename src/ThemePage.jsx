import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PhotoTheme = {
  Normal: "normal",
  Sepia: "sepia",
  BlackAndWhite: "black-white",
} 
function ThemePage() {
  const navigate = useNavigate();
  const handleThemeChange = (theme) => {
    localStorage.setItem("photoTheme", theme);
    navigate('/print');
  }
  return (
    <div>
      <h2>Choose Photo Theme</h2>
      <button onClick={()=>navigate('/size')}>Back</button>
      <br />
      <br />
        <button onClick={()=>handleThemeChange(PhotoTheme.Normal)}>Normal</button>
        <button onClick={()=>handleThemeChange(PhotoTheme.BlackAndWhite)}>Black/White</button>
        <button onClick={()=>handleThemeChange(PhotoTheme.Sepia)}>Sepia</button>
    </div>
  );
}

export default ThemePage;
