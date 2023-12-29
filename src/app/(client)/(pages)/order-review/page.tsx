"use client"

import { BrandIcon, Container, SideMenu } from '@/components/common'
import { IMainCategory } from '@/types'
import { getMainAndSubById } from '@/utils/getMainAndSubById'
import { useEffect, useState } from 'react'

type Props = {}

function OrderReviewPage({ }: Props) {

    const [categories, setCategories] = useState<IMainCategory[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMainAndSubById(4);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>

            <div>

                <div className='flex items-center justify-between mb-16'>

                    <div className="mt-4">
                        <BrandIcon mode='dark' />
                    </div>

                </div>

                <div className='lg:flex lg:justify-between lg:mt-10 lg:gap-2'>

                    <SideMenu />

                    <div className='flex items-center justify-center w-full border-2 border-green-400'>
                        <h1>Order Review</h1>
                        <div>
                            {categories.map((category) => (
                                <div className='flex flex-col gap-3' key={category.mainCategoryId}>
                                    <h2 className='text-green-400'>{category.mainCategoryName}</h2>

                                    {/* Render categoryOnes */}
                                    <div>
                                        <h3 className='text-red-200'>Category Ones</h3>
                                        {category.categoryOnes.map((categoryOne) => (
                                            <div key={categoryOne.subCatOneId}>
                                                <p>{categoryOne.subCatOneName}</p>
                                                {/* Add more details as needed */}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Render categoryTwos */}
                                    <div>
                                        <h3 className='text-red-200'>Category Twos</h3>
                                        {category.categoryOnes.flatMap((categoryOne) =>
                                            categoryOne.categoryTwos.map((categoryTwo) => (
                                                <div key={categoryTwo.subCatTwoId}>
                                                    <p>{categoryTwo.subCatTwoName}</p>
                                                    {/* Add more details as needed */}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </Container>
    )
}

export default OrderReviewPage