import Lottie from "lottie-react";
import animationData from '../../public/werewolfknife.json'; // Your Lottie file

function WerewolfAnimation() {
   return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: 400, width: 400 }}
    />
  );
}

export default WerewolfAnimation;
