import { Sidebar } from "~/components/layout/sidebar";
import { cn } from "~/utils/cn";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Layout({ className, children }: Props) {
  return (
    <div className={cn("flex min-h-screen")}>
      <Sidebar />
      <main className={cn("flex-[1] lg:ml-16", className)}>{children}</main>
    </div>
  );
}
