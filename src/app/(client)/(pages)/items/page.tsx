"use client";

import { useEffect, useState } from "react";
import {
  BrandIcon,
  Container,
  SideMenu,
  AuthLoader,
} from "@/components/common";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/helpers";

type Props = {};

function ItemsPage({}: Props) {
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        router.push("/");
        return;
      }

      try {
        const { status } = await decodeToken(jwtToken);
        if (status === 200) {
          setTokenValid(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/");
      }
    };

    checkTokenValidity();
  }, [router]);

  if (!tokenValid) {
    return <AuthLoader />;
  }

  return (
    <Container>
      <div>
        <div className="flex items-center justify-between mb-16">
          <div className="mt-4">
            <BrandIcon mode="dark" />
          </div>
        </div>

        <div className="lg:flex lg:justify-between lg:mt-10 lg:gap-2">
          <SideMenu />

          <div className="flex items-center justify-center w-full border-2 border-green-400">
            <h1>Hello this is the table for items page</h1>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ItemsPage;
