"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

export function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs?: { item: string; link?: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs && breadcrumbs?.length >= 3 && <BreadcrumbSeparator />}
        {breadcrumbs &&
          breadcrumbs.map((br, idx) => (
            <React.Fragment key={idx}>
              {idx === breadcrumbs.length - 2 && (
                <React.Fragment key={idx}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={br.link}>{br.item}</BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              )}
              {idx === breadcrumbs.length - 1 && (
                <React.Fragment key={idx}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{br.item}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              )}
              {idx === breadcrumbs.length - 3 && (
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {breadcrumbs
                        .slice(0, breadcrumbs.length - 2)
                        .map((item, index) => (
                          <DropdownMenuItem key={`${item.item}-${index}`}>
                            <BreadcrumbLink href={item.link}>
                              {item.item}
                            </BreadcrumbLink>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
