"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

function SearchHeader() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;
    router.push(`/search/${searchInput.toLowerCase()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-48 rounded-full !border-none bg-gray-4  px-4 py-1 outline-none hover:outline hover:outline-primary-9 focus:outline focus:outline-primary-9 md:w-96"
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
