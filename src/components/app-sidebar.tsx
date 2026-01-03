import * as React from "react";
import {
  Users,
  Home,
  Binoculars,
  Waves,
  Settings,
  PanelRightClose,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { cn } from "@/lib/utils";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Studies",
      url: "/dashboard/tests",
      icon: Binoculars,
    },

    {
      title: "Streams",
      url: "/dashboard/streams",
      icon: Waves,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-3 mb-6">
        <div className={cn("px-2", !open && "px-1.5")}>
          <PanelRightClose
            onClick={() => setOpen(!open)}
            className="cursor-pointer rotate-180 w-[18px] h-[18px] text-sidebar-primary-foreground/70"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
