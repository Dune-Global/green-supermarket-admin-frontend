import React from "react";
import {
  BrandIcon,
  Button,
  Container,
} from "@/components/common";
import { description, email, developers, name } from "@/constants";
import { FooterLinks, FooterLogos } from "@/data";
import Link from "next/link";
import { Year } from "@/helpers";

type Props = {};


const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-900 mt-16 text-gray-0 sticky top-full">
      <Container>
        <div className="divide-y-[1px] divide-gray-800">
          <div className="grid lg:grid-cols-3 grid-cols-1 py-10 gap-y-14">
            {/* GREEN SUPERMARKET */}
            <div className="flex flex-col lg:w-full gap-5 text-center lg:text-left">
              <BrandIcon mode="light" />
              <p className="text-sm text-gray-200">{description}</p>
              <Link
                href={`mailto:${email}`}
                className="text-gray-0 hover:text-gray-200 text-sm break-words"
              >
                {email}
              </Link>
            </div>
            {/* useful list */}
            <div className="flex flex-col lg:ml-28 gap-5 text-center">
              <h2 className="font-semibold uppercase ">useful links</h2>
              <div className="text-gray-200 flex flex-col gap-y-2">
                {FooterLinks.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-center items-center"
                  >
                    <Link
                      className="hover:underline w-fit hover:text-gray-0"
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-center lg:text-right list-none  ">
              <h2 className="font-semibold uppercase">follow us on</h2>
              <div className=" flex justify-center lg:justify-end gap-5 z-50">
                {FooterLogos.map((item) => (
                  <Link href={item.link} key={item.id}>
                    <Button
                      size="icon"
                      className="hover:bg-green-400 hover:text-gray-0"
                    >
                      <item.icon strokeWidth={1} />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-1 justify-between py-5 text-xs md:text-sm">
            <div className="">
              Copyright &copy;{Year} | {name}{" "}
            </div>
            <div className=" ">
              Designed & Developed by{" "}
              <span className="uppercase"> {developers}</span>{" "}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
