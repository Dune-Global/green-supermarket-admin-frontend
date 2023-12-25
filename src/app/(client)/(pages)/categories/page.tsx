import { BrandIcon, Container, ClientOnly, SideMenu } from "@/components/common"
import { Category, columns } from './(table)/columns'
import { DataTable } from './(table)/data-table'

type Props = {}

async function getModerators(): Promise<Category[]> {

    const data = [
        {
            mainCategoryId: '1',
            mainCategoryName: 'Vegetables',
            subCategories: '5',
        },
        {
            mainCategoryId: '2',
            mainCategoryName: 'Fruits',
            subCategories: '3',
        },
        {
            mainCategoryId: '3',
            mainCategoryName: 'Beverages',
            subCategories: '2',
        },
        {
            mainCategoryId: '4',
            mainCategoryName: 'Desserts',
            subCategories: '7',
        },
        {
            mainCategoryId: '5',
            mainCategoryName: 'Sweets',
            subCategories: '5',
        },
        {
            mainCategoryId: '6',
            mainCategoryName: 'Vegetables',
            subCategories: '5',
        },
        {
            mainCategoryId: '7',
            mainCategoryName: 'Fruits',
            subCategories: '3',
        },
        {
            mainCategoryId: '8',
            mainCategoryName: 'Beverages',
            subCategories: '2',
        },
        {
            mainCategoryId: '9',
            mainCategoryName: 'Desserts',
            subCategories: '7',
        },
        {
            mainCategoryId: '10',
            mainCategoryName: 'Sweets',
            subCategories: '5',
        },
        {
            mainCategoryId: '11',
            mainCategoryName: 'Desserts',
            subCategories: '7',
        },
        {
            mainCategoryId: '12',
            mainCategoryName: 'Sweets',
            subCategories: '5',
        },
    ]

    return data
}

async function CategoriesPage({ }: Props) {

    const data = await getModerators()

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
                                    <DataTable columns={columns} data={data} />
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