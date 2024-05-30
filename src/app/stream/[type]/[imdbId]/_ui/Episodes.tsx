"use client";

import { useSearchParams } from "next/navigation";

function Episodes() {
  const params = useSearchParams();

  const season = params.get("season");

  if (!season) return null;
  return (
    <div className="absolute right-0 top-[96px] h-full w-full bg-app-color-gray-1 md:w-fit">
      <div>
        <select value={1}>
          <option value={1}>season 1</option>
        </select>
      </div>
    </div>
  );
}

export default Episodes;
