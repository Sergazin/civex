// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import * as React from "react";
import Swal from "sweetalert2";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { AuthCubit } from "./auth/auth_cubit";

const menuItems: {
  title: string;
  icon: string;
  url: string | Function;
}[] = [
  { title: "Главная", icon: "bx bx-home", url: "/" },
  { title: "AI поиск резюме", icon: "bx bxs-magic-wand", url: "/find-cv" },
  { title: "Добавить резюме", icon: "bx bx-add-to-queue", url: "/add-cv" },
  { title: "Хранилище резюме", icon: "bx bx-store", url: "/cv-store" },
  {
    title: "Выход",
    icon: "bx bx-log-out",
    url: async () => {
      Swal.fire({
        title: "Выход",
        text: "Вы уверены, что хотите выйти?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да, выйти",
      }).then((result) => {
        if (result.isConfirmed) {
          AuthCubit.logout();
        }
      });
    },
  },
];

export default function SideBarWrapper($: { children: React.ReactNode }) {
  const nav = useNavigate();
  const route = useRouterState();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="w-64">
          <SidebarHeader>
            <div className="text-center flex items-center gap-4 justify-center px-4 pt-6">
              <img src="/assets/logo.svg" alt="CiVeX" className="w-16 h-16" />
              <h2 className="text-2xl font-semibold">CiVeX</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="p-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={route.location.pathname === item.url}
                    onClick={() => {
                      if (typeof item.url === "string") {
                        nav({ to: item.url });
                      } else {
                        item.url();
                      }
                    }}
                    className="py-6 text-base px-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-4">
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <div className="h-4"></div>
          {$.children}
          <div className="h-8"></div>
        </main>
      </div>
    </SidebarProvider>
  );
}
