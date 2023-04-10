import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrintPage = () => {
  const [numPrints, setNumPrints] = useState(1);
  const [photoSize, setPhotoSize] = useState("");
  const [photoTheme,setPhotoTheme] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [promptPaymentModule,setPromptPaymentModule] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedPhotoSize = localStorage.getItem('photoSize');
    if (storedPhotoSize) {
        console.log("storedPhotoSize",storedPhotoSize);
      setPhotoSize(storedPhotoSize);
    }

    const storedPhotoTheme = localStorage.getItem('photoTheme');
    if (storedPhotoTheme) {
        console.log("storedPhotoTheme",storedPhotoTheme);
      setPhotoTheme(storedPhotoTheme);
    }

    //  Minimum allowed photo print number is 2 for 6x2 print size.
    if (storedPhotoSize === "6x2") {
        setNumPrints(2);
    }
  }, []);
  useEffect(() => {
    if((photoSize === "6x2" && numPrints == 2) || numPrints == 1) {
        setBtnDisabled(true);
    } else {
        setBtnDisabled(false);
    }
  },[numPrints]);
  const handleIncrement = () => {
    setNumPrints((prevNumPrints) => prevNumPrints + 1);
  };

  const handleDecrement = () => {
    setNumPrints((prevNumPrints) => prevNumPrints - 1);
  };

  const costPerPrint = photoSize === "6x2" ? 4 : photoSize === "6x4" ? 6 : 8;
  const totalCost = numPrints * costPerPrint;
  const onConfirmPayment = () => {
    setPromptPaymentModule(true);
  }
  return (
    <div>
      <h1>Print Page</h1>
      <p>Selected Photo Size: {photoSize}</p>
      <p>Selected Photo Theme: {photoTheme}</p>
      <p>Total Cost: ${totalCost}</p>
      <div>
        <p>Number of Prints:</p>
        <button onClick={handleDecrement} disabled={btnDisabled}>
          -
        </button>
        <span>{numPrints}</span>
        <button onClick={handleIncrement}>+</button>
        <button onClick={onConfirmPayment}>Confirm</button>
        {promptPaymentModule &&
            <button onClick={() => navigate("/photoShoot")}>Simulate Payment OK</button>
        }
      </div>
    </div>
  );
};

export default PrintPage;
