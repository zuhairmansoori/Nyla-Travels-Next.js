"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput({
  divClassName,
  inputClassName
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // agar user ne kuch type kiya hai (already saved value se alag),
    // to hi "searching..." indicator dikhao
    if (search !== (searchParams.get("search") || "")) {
      setIsPending(true);
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.replace(`?${params.toString()}`);
      setIsPending(false);
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleClear() {
    setSearch("");
  }

  return (
    <div className={`relative w-full mt-10 sm:w-80 ${divClassName}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search country..."
        className={`pl-9 pr-9 ${inputClassName}` }
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
        {isPending && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}

        {!isPending && search && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}