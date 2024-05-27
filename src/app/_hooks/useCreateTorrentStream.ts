import { useMutation } from "@tanstack/react-query";
import StremioService from "../_services/stremIo/stremIoServices";

export function useCreateTorrentStream() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: ({
      fileIdx,
      infoHash,
    }: {
      fileIdx: number;
      infoHash: string;
    }) => StremioService.createTorrentStream({ fileIdx, infoHash }),
  });

  return { mutate, isPending, data };
}
