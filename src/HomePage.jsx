import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
  },[])
  return (
    <div>
      <h1>Welcome to our Photo App!</h1>
      <p>Click the button below to get started.</p>
      <button onClick={()=>navigate('/size')}>Choose Photo Size</button>
    </div>
  );
}

export default HomePage;
