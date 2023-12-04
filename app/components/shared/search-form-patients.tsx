import { useSearchParams } from "@remix-run/react";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "~/components/ui/input";

interface Props {
  action?: string;
  placeholder?: string;
  className?: string;
}

export function SearchFormPatients({
  action = "/patients",
  placeholder = "Search...",
}: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <form method="GET" action={action} className="w-full">
      <fieldset className="group relative flex items-center gap-1">
        <label htmlFor="search" hidden />
        <Input
          id="searchPatients"
          type="search"
          name="q"
          placeholder={placeholder}
          defaultValue={query}
          autoComplete="off"
          className="px-3 ps-12 w-full transition duration-200"
        />
        <span className="pointer-events-none absolute flex ps-3">
          <IconSearch className="h-6 w-6 text-muted-foreground group-focus-within:text-primary" />
        </span>
      </fieldset>
    </form>
  );
}
