"use client";

import {
  AuthLoader,
  BrandIcon,
  ClientOnly,
  Container,
  SideMenu,
} from "@/components/common";
import { Moderator, columns } from "./(table)/columns";
import { DataTable } from "./(table)/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeToken } from "@/helpers";
import { getModerators } from "@/utils/getModerators";

type Props = {};

function ModeratorsPage({}: Props) {
  const router = useRouter();
  const [tokenValid, setTokenValid] = useState(false);
  const [moderators, setModerators] = useState<Moderator[]>([]);

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

    const fetchData = async () => {
      try {
        const data = await getModerators();
        setModerators(data);
      } catch (error) {
        console.error("Error fetching moderators:", error);
      }
    };

    fetchData();
  }, [router]);

  if (!tokenValid) {
    return <AuthLoader />;
  }

  return (
    <Container>
      <ClientOnly>
        <div className="z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="mt-4">
              <BrandIcon mode="dark" />
            </div>
          </div>
          <div className="lg:flex lg:justify-between lg:mt-10 lg:gap-2">
            <SideMenu />
            <div className="flex flex-col justify-start w-full overflow-x-auto">
              <div className="min-w-full">
                <DataTable columns={columns} data={moderators} />
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </Container>
  );
}

export default ModeratorsPage;
