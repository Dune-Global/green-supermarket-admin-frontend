"use client"

import {
    AuthLoader,
    BrandIcon,
    Container,
    ClientOnly,
    SideMenu
} from "@/components/common"
import { columns } from './(table)/columns'
import { DataTable } from './(table)/data-table'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeToken } from "@/helpers";
import { getCategories } from "@/utils/getCategories";
import { Category } from "@/types"

type Props = {}

function CategoriesPage({ }: Props) {
    const router = useRouter();
    const [tokenValid, setTokenValid] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

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
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, [router]);

    if (!tokenValid) {
        return <AuthLoader />;
    }

    return (
        <>
            <Container>
                <ClientOnly>
                    <div>
                        <div className='flex items-center justify-between mb-16'>
                            <div className="mt-4">
                                <BrandIcon mode='dark' />
                            </div>
                        </div>
                        <div className='lg:flex lg:justify-between lg:mt-10 lg:gap-2'>
                            <SideMenu />
                            <div className='flex flex-col justify-start w-full overflow-x-auto'>
                                <div className='min-w-full'>
                                    <DataTable columns={columns} data={categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </Container>
        </>
    )
}

export default CategoriesPage