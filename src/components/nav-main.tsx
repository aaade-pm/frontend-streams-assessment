"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  };

export function NavMain({
  items,
}: {
  items: NavItem[];
}) {
  const pathname = usePathname();

  const routesSplit = pathname.split("/");

  /**
   * eg runppermint.com/dashboard/reports/123
   * baseRoute = reports
   */
  const baseRoute = routesSplit[2];
  const isDashboard = routesSplit[2] === undefined;

  const isActive = (route: string) => {
    if (route === "/dashboard") {
      return isDashboard;
    }

    return baseRoute === route.split("/")[2];
  };

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-[12px]">
        {items.map((item) => (
          <>
            {item.items && item.items.length > 0 ? (
              <Collapsible
                asChild
                defaultOpen={isActive(item.url)}
                className={cn("group/collapsible")}>
                <SidebarMenuItem
                  className={cn(
                    isActive(item.url) && "bg-[#EDEDFF] rounded-[12px]"
                  )}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && (
                        <item.icon
                          className={cn(
                            "text-sidebar-primary-foreground w-[12px] h-[12px]",
                            isActive(item.url) && "text-[#623BA5]"
                          )}
                        />
                      )}
                      <span
                        className={cn(isActive(item.url) && "text-[#623BA5]")}>
                        {item.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180",
                          isActive(item.url) && "text-[#623BA5]"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span
                                className={cn(
                                  isActive(subItem.url) && "text-[#623BA5]"
                                )}>
                                {subItem.title}
                              </span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={cn(
                  isActive(item.url) && "bg-sidebar-accent rounded-[12px]"
                )}>
                <a href={item.url}>
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "text-sidebar-primary-foreground w-[12px] h-[12px]",
                        isActive(item.url) && "text-[#623BA5]"
                      )}
                    />
                  )}
                  <span className={cn("text-sidebar-primary-foreground", isActive(item.url) && "text-[#623BA5]")}>
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            )}
          </>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
