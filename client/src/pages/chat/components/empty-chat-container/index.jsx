import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";

const EmptyChatContainer = () => {
  return (
    <div
      className="flex-1 md:bg-[#12141c] md:flex flex-col justify-center items-center hidden 
      transition-all duration-1000"
    >
      <Lottie
        isClickToPauseDisabled
        height={220}
        width={220}
        options={animationDefaultOptions}
      />

      <div className="text-white text-center mt-12 flex flex-col items-center gap-4">
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-wide">
          No Conversation Selected
        </h2>
        <p className="text-gray-400 max-w-md text-base lg:text-lg leading-relaxed">
          Select a contact or start a new channel.
        </p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
