"use client";
import { TimeSlider, VolumeSlider } from "@vidstack/react";
import { mediaSocket } from "~/lib/socket/socket";

export function Volume() {
  return (
    <VolumeSlider.Root className="volume-slider group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
      <VolumeSlider.Track className="ring-media-focus relative z-0 h-[5px] w-full rounded-sm bg-gray-400 group-data-[focus]:ring-[3px]">
        <VolumeSlider.TrackFill className="bg-solid-primary-2 absolute h-full w-[var(--slider-fill)] rounded-sm bg-primary will-change-[width]" />
      </VolumeSlider.Track>

      <VolumeSlider.Preview
        className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
        noClamp
      >
        <VolumeSlider.Value
          className="rounded-sm bg-black px-2 py-px text-[13px] font-medium"
          type="pointer"
          format="percent"
        />
      </VolumeSlider.Preview>
      <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border  border-primary bg-background opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
    </VolumeSlider.Root>
  );
}

export interface TimeSliderProps {
  thumbnails?: string;
}

export function Time({
  thumbnails,
  disabled = false,
}: TimeSliderProps & { disabled?: boolean }) {
  function handleOnSeek(videoTs: number) {
    mediaSocket.emit("seek", { payload: { videoTs } });
  }
  return (
    <TimeSlider.Root
      onMediaSeekRequest={handleOnSeek}
      className="time-slider group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none"
    >
      <TimeSlider.Chapters className="relative flex h-full w-full items-center rounded-[1px]">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center rounded-[1px]"
              style={{ contain: "layout style" }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="ring-media-focus relative z-0 h-[5px] w-full rounded-sm bg-gray-400 group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="absolute h-full w-[var(--chapter-fill)] rounded-sm bg-primary will-change-[width]" />
                <TimeSlider.Progress className="bg-blackA5 absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm will-change-[width]" />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />

      <TimeSlider.Preview className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
          >
            <TimeSlider.Thumbnail.Img />
          </TimeSlider.Thumbnail.Root>
        ) : null}

        <TimeSlider.ChapterTitle className="mt-2 text-sm" />

        <TimeSlider.Value
          className="text-[13px]"
          type="pointer"
          format="time"
        />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}

// export function Time({
//   thumbnails,
//   disabled = false,
// }: TimeSliderProps & { disabled?: boolean }) {
//   const { duration, currentTime } = useMediaStore();
//   const [showTimestamp, setShowTimestamp] = useState(false);
//   const { seek } = useMediaRemote();

//   function handleOnSeek(e: any, time: number) {
//     let target = time;
//     // Read the time from the click event if it exists
//     (e.target, time);

//     if (e) {
//       const rect = e.target.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const max = rect.width;
//       target = (x / max) * this.Player().getDuration();
//     }
//     target = Math.max(target, 0);
//     seek(target);
//     const hlsTarget =
//       Math.floor(Date.now() / 1000) - this.HTMLInterface.getDuration() + target;
//     // this.socket.emit("CMD:seek", this.state.isLiveHls ? hlsTarget : target);
//     mediaSocket.emit("seek", { payload: { videoTs: target } });
//   }

//   const onMouseOver = () => {
//     // ('mouseover');
//     setShowTimestamp(true);
//   };

//   const onMouseOut = () => {
//     // ('mouseout');
//     setShowTimestamp(true);
//   };

//   const onMouseMove = (e: any) => {
//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const max = rect.width;
//     const pct = x / max;
//     // (x, max);
//     const target = pct * this.props.duration;
//     // (pct);
//     if (pct >= 0) {
//       this.setState({ hoverTimestamp: target, hoverPos: pct });
//     }
//   };

//   return (
//     <progress
//       size="tiny"
//       color="blue"
//       onClick={duration < +Infinity ? handleOnSeek : undefined}
//       onMouseOver={onMouseOver}
//       onMouseOut={onMouseOut}
//       onMouseMove={onMouseMove}
//       className={``}
//       inverted
//       style={{
//         flexGrow: 1,
//         marginTop: 0,
//         marginBottom: 0,
//         position: "relative",
//         minWidth: "50px",
//       }}
//       value={currentTime}
//       total={duration}
//     >
//       {/* {buffers} */}
//       {
//         <div
//           style={{
//             position: "absolute",
//             bottom: "0px",
//             left: `calc(${(currentTime / duration) * 100 + "% - 6px"})`,
//             pointerEvents: "none",
//             width: "12px",
//             height: "12px",
//             transform:
//               duration < Infinity && showTimestamp
//                 ? "scale(1, 1)"
//                 : "scale(0, 0)",
//             transition: "0.25s all",
//             borderRadius: "50%",
//             backgroundColor: "#54c8ff",
//           }}
//         ></div>
//       }
//       {/* {duration < Infinity && showTimestamp && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "0px",
//             left: `calc(${this.state.hoverPos * 100 + "% - 27px"})`,
//             pointerEvents: "none",
//           }}
//         >
//           <Label basic color="blue" pointing="below">
//             <div>{formatTimestamp(this.state.hoverTimestamp)}</div>
//           </Label>
//         </div>
//       )} */}
//     </progress>
//   );
// }
