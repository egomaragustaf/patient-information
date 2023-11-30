import { NavLink } from "@remix-run/react";
import { cn } from "~/utils";
import { buttonVariants } from "~/components/ui/button";
import {
  IconHeartHandshake,
  IconLayoutDashboard,
  IconReportMedical,
  IconUserCircle,
} from "@tabler/icons-react";

export const settingsNavItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <IconLayoutDashboard className="icon" width={22} height={22} />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <IconUserCircle className="icon" width={22} height={22} />,
  },
  {
    title: "Patients",
    to: "/patients",
    icon: <IconHeartHandshake className="icon" width={24} height={24} />,
  },
  {
    title: "Medical Records",
    to: "/medical-records",
    icon: <IconReportMedical className="icon" width={22} height={22} />,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string;
    title: string;
    icon?: React.ReactNode;
  }[];
}

export function Sidebar() {
  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <aside className="w-full overflow-visible sm:block sm:max-w-[240px]">
        <SidebarNav items={settingsNavItems} />
      </aside>
    </div>
  );
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex w-full gap-2 overflow-auto sm:flex-col p-2",
        className
      )}
      {...props}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-primary hover:bg-slate-800 hover:text-slate-50 text-slate-50"
                : "hover:bg-muted",
              "justify-start gap-2 text-base"
            )
          }>
          {item.icon}
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
