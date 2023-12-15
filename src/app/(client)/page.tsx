import { Container } from "@/components/common";
import Image from "next/image";
import { LoginModal } from "@/components/modals";


export default function Home() {

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full">

        <div className="hidden lg:relative lg:block lg:w-2/5">
          <Image src="/assets/images/adminLoginImage.png" fill={true} style={{ objectFit: "cover" }} alt="Green supermarket background" />
        </div>

        <div className="flex items-center justify-center h-screen lg:w-3/5">
          <Container>
            <LoginModal />
          </Container>
        </div>

      </div>
    </>
  )
}