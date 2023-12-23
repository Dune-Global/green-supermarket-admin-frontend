import { BrandIcon, Container, SideMenu } from "@/components/common"

type Props = {}

function ItemsPage({ }: Props) {
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
                        <h1>Hello this is the table for items page</h1>
                    </div>

                </div>

            </div>

        </Container>
    )
}

export default ItemsPage