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
        payload: { mediaSrc: { src: data.src, type: data.type } },
      });
    },
  });

  return { mutate, isPending, data };
}
