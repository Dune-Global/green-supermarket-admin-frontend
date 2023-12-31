"use client";

import { useEffect, useState } from "react";
import {
  BrandIcon,
  Container,
  SideMenu,
  AuthLoader,
  ClientOnly,
} from "@/components/common";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/helpers";
import { getItemDetails } from "@/utils/getItemDetails";
import { columns } from "./(table)/columns";
import { DataTable } from "./(table)/data-table";
import { Item } from "@/types";

type Props = {};

function ItemsPage({ }: Props) {
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        router.push("/");
        return;
      }

      try {
        const { status, data } = await decodeToken(jwtToken);
        if (status === 200) {
          setTokenValid(true);
        } else {
          router.push("/");
        }

        if (data.roles === "EMPLOYEE" || data.roles === "DELIVER") {
          router.push("/order-review")
        }

      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/");
      }
    };

    checkTokenValidity();

    const fetchData = async () => {
      try {
        const data = await getItemDetails();
        setItems(data);
      } catch (error) {
        console.log("Error fetching items:", error)
      }
    }

    fetchData();
  }, [router]);

  if (!tokenValid) {
    return <AuthLoader />;
  }


  return (
    <Container>
      <ClientOnly>
        <div>
          <div className="flex items-center justify-between mb-16">
            <div className="mt-4">
              <BrandIcon mode="dark" />
            </div>
          </div>

          <div className="lg:flex lg:justify-between lg:mt-10 lg:gap-2">
            <SideMenu />

            <div className="flex flex-col justify-start w-full overflow-x-auto">
              <div className="min-w-full">
                <DataTable columns={columns} data={items} />
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </Container>
  );
}

export default ItemsPage;
