import { ISideMenuItems } from "@/types";
import { LogOut, LayoutGrid, List, Users, ShoppingBasket } from "lucide-react";

export const sideMenuItems: ISideMenuItems[] = [
  {
    id: 1,
    path: "/items",
    icon: LayoutGrid,
    description: "Items",
  },
  {
    id: 2,
    path: "/categories",
    icon: List,
    description: "Categories",
  },
  {
    id: 3,
    path: "/moderators",
    icon: Users,
    description: "Moderators",
  },
  {
    id: 4,
    path: "/order-review",
    icon: ShoppingBasket,
    description: "Order Review",
  },
];
