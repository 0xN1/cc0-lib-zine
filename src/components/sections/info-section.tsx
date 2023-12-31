"use client";

import React, { useRef } from "react";
import { motion as m, useTransform, useScroll, useSpring } from "framer-motion";
import SplitLetters from "../anim/split-letters";

const infos = [
  "30 NOV 2023 2200 GMT+8",
  "LIMITED TO 50 PCS",
  "62 PAGES",
  "NFT ON ZORA NETWORK",
  "0.03ETH [SHIPPING + TAX]",
  "FIRST COME FIRST SERVE",
  "MINT & REDEEM",
];

const stagChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const childrenAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

type Props = {};

const InfoSection = (props: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const specialMove = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, 0]),
    {
      stiffness: 400,
      damping: 90,
    },
  );
  const editionMove = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 0]),
    {
      stiffness: 400,
      damping: 90,
    },
  );

  return (
    <div
      id="info"
      className="s2 flex h-screen w-full flex-col justify-between overflow-hidden bg-grayC p-4 font-chakra sm:px-12 sm:py-8"
    >
      <div
        ref={container}
        className="s2 flex h-screen w-full flex-col justify-between p-2 sm:px-12 sm:py-8"
      >
        <div className="s2-mid relative flex h-full w-full flex-col items-center justify-between">
          <div className="relative -mb-24 flex h-full w-full items-center sm:-mb-32 ">
            <m.span
              style={{ x: specialMove }}
              className="absolute right-1/4 scale-100 text-[100px] font-bold text-grayD sm:text-[250px] xl:scale-125"
            >
              <SplitLetters text="SPECIAL" duration={2} />
            </m.span>
          </div>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
            viewport={{
              once: true,
            }}
            className="z-10 w-full max-w-prose bg-prim p-8 text-justify font-jetbrains text-sm font-medium uppercase sm:p-20 sm:text-4xl"
          >
            {infos.map((data, index) => (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: 0.1 * index,
                  duration: 1,
                  ease: "backOut",
                }}
                className="inline-flex gap-2"
                key={index}
              >
                <span className="break-all hover:bg-zinc-800 hover:text-prim">
                  {data}
                </span>
                {index !== infos.length - 1 && (
                  <span className="mr-2 self-center text-sm sm:text-2xl">
                    ++
                  </span>
                )}
              </m.div>
            ))}
          </m.div>
          <div className="relative -mt-24 flex h-full w-full items-center sm:-mt-32">
            <m.span
              style={{ x: editionMove }}
              className="absolute left-1/4 scale-100 text-[100px] font-bold text-grayD sm:text-[250px] xl:scale-125"
            >
              <SplitLetters text="EDITION" duration={2} />
            </m.span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
