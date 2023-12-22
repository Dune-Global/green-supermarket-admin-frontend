import { BrandIcon, ClientOnly, Container, SideMenu } from '@/components/common'
import { Moderator, columns } from './(table)/columns'
import { DataTable } from './(table)/data-table'

type Props = {}

async function getModerators(): Promise<Moderator[]> {
    const res = await fetch("https://658042866ae0629a3f54c662.mockapi.io/api/moderators/moderators")

    const data = await res.json()
    return data
}

async function ModeratorsPage({ }: Props) {

    const data = await getModerators()

    return (
        <Container>

            <ClientOnly>
                <div className='z-10'>

                    <div className='flex items-center justify-between mb-16'>
                        <div className="mt-4">
                            <BrandIcon mode='dark' />
                        </div>
                    </div>

                    <div className='lg:flex lg:justify-between lg:mt-10 lg:gap-2'>

                        <SideMenu />

                        <div className='flex items-center justify-center w-full overflow-x-auto'>
                            <div className='min-w-full'>
                                <DataTable columns={columns} data={data} />
                            </div>
                        </div>

                    </div>

                </div>
            </ClientOnly>

        </Container>
    )
}

export default ModeratorsPage