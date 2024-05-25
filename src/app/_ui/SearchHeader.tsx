"use client";

import { useParams, useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

function SearchHeader() {
  const params = useParams();
  const [searchInput, setSearchInput] = useState(
    decodeURIComponent((params.searchInput as string) ?? ""),
  );
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;

    router.push(`/search/${encodeURIComponent(searchInput.toLowerCase())}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="hover:outline-border-color-stronger-focus focus:outline-border-color-stronger-focus w-48 rounded-full  !border-none bg-gray-4 px-4 py-1 outline-none transition-all hover:outline focus:outline md:w-96"
        placeholder="Searching..."
        id="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </form>
  );
}

export default SearchHeader;
