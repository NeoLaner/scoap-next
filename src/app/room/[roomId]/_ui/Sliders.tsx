"use client";
import { TimeSlider, VolumeSlider } from "@vidstack/react";

export function Volume() {
  return (
    <VolumeSlider.Root className="volume-slider group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
      <VolumeSlider.Track className="bg-white/30 ring-media-focus relative z-0 h-[5px] w-full rounded-sm group-data-[focus]:ring-[3px]">
        <VolumeSlider.TrackFill className="bg-media-brand absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
      </VolumeSlider.Track>

      <VolumeSlider.Preview
        className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
        noClamp
      >
        <VolumeSlider.Value
          className="bg-black rounded-sm px-2 py-px text-[13px] font-medium"
          type="pointer"
          format="percent"
        />
      </VolumeSlider.Preview>
      <VolumeSlider.Thumb className="bg-white ring-white/40 absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] opacity-0 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
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
  return (
    <TimeSlider.Root className="time-slider group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none">
      <TimeSlider.Chapters className="relative flex h-full w-full items-center rounded-[1px]">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center rounded-[1px]"
              style={{ contain: "layout style" }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="bg-white/30 ring-media-focus relative z-0 h-[5px] w-full rounded-sm group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="bg-media-brand absolute h-full w-[var(--chapter-fill)] rounded-sm will-change-[width]" />
                <TimeSlider.Progress className="bg-white/50 absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm will-change-[width]" />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb className="bg-white ring-white/40 absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] opacity-0 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />

      <TimeSlider.Preview className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="border-white bg-black block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border"
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
