import { useMutation } from "@tanstack/react-query";
import StremioService from "../_services/stremIo/stremIoServices";
import { usePlayerContext } from "./usePlayerProvider";

export function useCreateTorrentStream() {
  const { dispatch } = usePlayerContext();
  const { mutate, isPending, data } = useMutation({
    mutationFn: ({
      fileIdx,
      infoHash,
    }: {
      fileIdx: number;
      infoHash: string;
    }) => StremioService.createTorrentStream({ fileIdx, infoHash }),
    onSuccess: (data) => {
      dispatch({
        type: "SET_MEDIA_SOURCE",
        payload: { mediaSrc: { src: data, type: "video/mp4" } },
      });
    },
  });

  return { mutate, isPending, data };
}
