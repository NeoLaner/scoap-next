"use client";

import { useParams, useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Input } from "~/components/ui/input";

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
      <Input
        className="rounded-lg md:w-96"
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
