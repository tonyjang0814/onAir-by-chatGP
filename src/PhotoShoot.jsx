import React, { useState, useEffect, useRef } from "react";

const PhotoShoot = () => {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5);
    
  const [flash, setFlash] = useState(false);
  const [activateNextStep, setActivateNextStep] = useState(false);
  useEffect(() => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let interval = null;

    if (count < 4) {
      interval = setInterval(() => {
        if (remainingTime <= 0) {
          clearInterval(interval);
          takePhoto();
        } else {
          setRemainingTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, remainingTime]);

  const downloadURI = (uri, filename) => {
    const link = document.createElement("a");
    link.href = uri;
    link.download = filename;
    link.click();
  }

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const photoImageInURL = canvas.toDataURL("image/jpeg")
    downloadURI(photoImageInURL, `photo${count}`)  
    setPhotos((prevPhotos) => [...prevPhotos, photoImageInURL]);
    setCount((prevCount) => prevCount + 1);
    setRemainingTime(5);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />

      {count < 4 && <p>Remaining Time: {remainingTime} seconds</p>}

      {count === 4 && (
        <div>
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "white",
          opacity: flash ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default PhotoShoot;
