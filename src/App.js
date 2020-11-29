import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

import * as fp from "fingerpose";
import c3 from "./audio/c3.mp3";
import c4 from "./audio/c4.mp3";
import c5 from "./audio/c5.mp3";
import c6 from "./audio/c6.mp3";
import c7 from "./audio/c7.mp3";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [note, setNote] = useState(null);
  const song = {thumb_down:c3, index_down:c4, middle_down:c5, ring_down:c6, pinky_down:c7};

  const runHandpose = async () => {
    const net = await handpose.load();
    //console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //-------------------------------------- 
      // thumb down
      const thumbDescription = new fp.GestureDescription('thumb_down');
      // thumb:
      thumbDescription.addCurl(fp.Finger.Thumb, fp. FingerCurl.HalfCurl, 1.0);
      thumbDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
      thumbDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
      thumbDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

      // index:
      thumbDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      thumbDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.75);

      // middle:
      thumbDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);      
      thumbDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.75);

      // ring:
      thumbDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);      
      thumbDescription.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp,0.75);

      // pinky:
      thumbDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);      
      thumbDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp,0.75);
      
      thumbDescription.setWeight(fp.Finger.Thumb, 3);
      //--------------------------
      // index down
      const indexDescription = new fp.GestureDescription('index_down');
      // thumb:
      indexDescription.addCurl(fp.Finger.Thumb, fp. FingerCurl.HalfCurl, 0.25);
      indexDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
      indexDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
      indexDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

      // index:
      indexDescription.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
      indexDescription.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
      indexDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

      // middle:
      indexDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
      indexDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.75);

      // ring:
      indexDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
      indexDescription.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp,0.75);

      // pinky:
      indexDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
      indexDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.75);
      indexDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 0.5);

      indexDescription.setWeight(fp.Finger.Index, 3);
      //--------------------------
      // middle down
      const middleDescription = new fp.GestureDescription('middle_down');
      // thumb:
      middleDescription.addCurl(fp.Finger.Thumb,fp. FingerCurl.HalfCurl, 0.25);
      middleDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
      middleDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
      middleDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

      // index:
      middleDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      middleDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.75);

      // middle:
      middleDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
      middleDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
      middleDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.75);

      // ring:
      middleDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 0.75);
      //middleDescription.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp,0.75);

      // pinky:
      middleDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 0.75);
      middleDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.75);

      middleDescription.setWeight(fp.Finger.Middle, 3);
      //--------------------------
      // ring down
      const ringDescription = new fp.GestureDescription('ring_down');
      // thumb:
      ringDescription.addCurl(fp.Finger.Thumb, fp. FingerCurl.HalfCurl, 0.25);
      ringDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
      ringDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
      //ringDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

      // index:
      ringDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      ringDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.75);

      // middle:
      ringDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);      
      //ringDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.75);

      // ring:
      ringDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
      ringDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 1.0);
      ringDescription.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp,0.75);

      // pinky:
      ringDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
      ringDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.75);
      
      middleDescription.setWeight(fp.Finger.Ring, 3);

      //--------------------------
      // pinky down
      const pinkyDescription = new fp.GestureDescription('pinky_down');
      // thumb:
      pinkyDescription.addCurl(fp.Finger.Thumb, fp. FingerCurl.HalfCurl, 0.25);
      pinkyDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
      pinkyDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
      pinkyDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

      // index:
      pinkyDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
      pinkyDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.75);

      // middle:
      pinkyDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);      
      pinkyDescription.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.75);

      // ring:
      pinkyDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);      
      pinkyDescription.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp,0.75);

      // pinky:
      pinkyDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
      pinkyDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 1.0);
      //pinkyDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.75);
    
      pinkyDescription.setWeight(fp.Finger.Pinky, 3);

      // Make Detections
      const hand = await net.estimateHands(video);
      //console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([       
          thumbDescription,
          indexDescription,
          middleDescription,
          ringDescription,
          pinkyDescription,

        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 7.0);
        //console.log(gesture.gestures);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setNote(gesture.gestures[maxConfidence].name);
          console.log(note);
      
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();
  // useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        {/*audio track*/}
        {note !== null ? (
          <audio  
          autoPlay={true}
          
          >
          <source src={song[note]} />
          </audio>
        ): (
          ""
        )}

      </header>
    </div>
  );
}

export default App;