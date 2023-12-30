"use client"

import { useEffect, useState } from "react";
import {
    BrandIcon,
    ClientOnly,
    Container,
    SideMenu,
    AuthLoader
} from '@/components/common'
import { useRouter } from "next/navigation";
import { decodeToken } from "@/helpers";
import { DataTable } from './(table)/data-table'
import { columns } from './(table)/columns'
import { orderReviewDetails } from '@/utils/getAllOrders'
import { Orders } from "@/types";

type Props = {}


function OrderReviewPage({ }: Props) {

    const router = useRouter();
    const [tokenValid, setTokenValid] = useState(false);
    const [orders, setOrders] = useState<Orders[]>([]);

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
                const data = await orderReviewDetails()
                setOrders(data);
            } catch (error) {
                console.log("Error fetching items:", error)
            }
        }

        fetchData();
    }, [router]);

    if (!tokenValid) {
        return <AuthLoader />;
    }

    const data = orderReviewDetails()

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
                                    <DataTable columns={columns} data={orders} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </Container>
        </>
    )
}

export default OrderReviewPage