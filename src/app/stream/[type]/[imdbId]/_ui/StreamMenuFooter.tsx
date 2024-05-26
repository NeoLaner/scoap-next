import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import ButtonPlay from "./ButtonPlay";
function StreamMenuFooter() {
  return (
    <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2  justify-center gap-3 overflow-hidden rounded-full border border-gray-10 bg-primary-2 p-2 px-4">
      <button className="rounded-md ">
        <BsShare size={18} />
      </button>

      <ButtonPlay />
    </div>
  );
}

export default StreamMenuFooter;
