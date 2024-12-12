import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import PlayerRemote from "./PlayerRemote";

function PlayerTogetherAddon() {
  useSocketListeners();
  return (
    <>
      <PlayerRemote />
    </>
  );
}

export default PlayerTogetherAddon;
