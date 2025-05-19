import Lottie from "lottie-react";
import animationData from '../../public/robber animation.json'; // Your Lottie file

function RobberAnimation() {
   return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: 400, width: 400 }}
    />
  );
}

export default RobberAnimation;
