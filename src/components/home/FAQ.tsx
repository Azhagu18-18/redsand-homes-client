"use client";

import { useState } from "react";
import { AnimatePresence, motion , type Variants } from "framer-motion";
import {
  HiMinus,
  HiPlus,
  HiQuestionMarkCircle,
} from "react-icons/hi2";

import Link from "next/link";


interface FAQItem {
  id: number;
  question: string;
  answer: string;
}


const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Are all properties listed on RedSand Homes legally verified?",
    answer:
      "Yes. Every property listed on RedSand Homes goes through a verification process including ownership validation, legal documentation review and compliance checks before it is published.",
  },
  {
    id: 2,
    question: "Can RedSand Homes help me with home loans?",
    answer:
      "Absolutely. We partner with leading banks and financial institutions to help you compare loan offers, complete documentation and secure competitive interest rates.",
  },
  {
    id: 3,
    question: "Do you provide assistance for property registration?",
    answer:
      "Yes. Our legal and documentation experts assist you throughout the registration process, ensuring every step is completed smoothly and transparently.",
  },
  {
    id: 4,
    question: "Can I schedule a property visit online?",
    answer:
      "Yes. You can easily schedule site visits through our platform, and our property consultants will coordinate the visit at your preferred date and time.",
  },
  {
    id: 5,
    question: "Do you offer investment consultation?",
    answer:
      "Yes. Our experienced advisors help identify high-growth investment opportunities based on your goals, budget and expected returns.",
  },
  {
    id: 6,
    question: "Are there any hidden charges?",
    answer:
      "No. We believe in complete transparency. All applicable charges, taxes and service fees are clearly communicated before any transaction proceeds.",
  },
];


const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">

        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 text-center"
        >
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-300">
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Everything You Need
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              to Know
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Find answers to the most common questions about buying, selling,
            investing and financing properties with RedSand Homes.
          </p>
        </motion.div>


        <div className="space-y-5">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-2xl
                  shadow-[0_15px_50px_rgba(0,0,0,0.15)]
                "
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    p-6
                    text-left
                    transition-colors
                    duration-300
                    hover:bg-white/5
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg">
                      <HiQuestionMarkCircle size={24} />
                    </div>

                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    {isOpen ? (
                      <HiMinus className="text-orange-300" size={24} />
                    ) : (
                      <HiPlus className="text-orange-300" size={24} />
                    )}
                  </motion.div>
                </button>
                                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-6 pb-6 pt-5">
                        <div className="pl-16">
                          <p className="leading-8 text-white/70">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Border */}

                <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-orange-400/0 transition-all duration-500 group-hover:border-orange-400/30" />
              </motion.div>
            );
          })}
        </div>
      <motion.div
  variants={itemVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="
    overflow-hidden
    rounded-[36px]
    border
    border-white/10
    bg-gradient-to-r
    from-orange-500/10
    via-white/5
    to-amber-500/10
    p-8
    backdrop-blur-2xl
    md:p-10
    mt-4
  "
>
  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
    <div className="max-w-2xl">
      <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
        Still Have Questions?
      </span>

      <h3 className="mt-5 text-3xl font-bold text-white md:text-4xl">
        We're Here to Help You
      </h3>

      <p className="mt-4 text-lg leading-8 text-white/70">
        Our property consultants are available to answer your questions,
        provide expert guidance, and help you make confident real estate
        decisions.
      </p>
    </div>

    <Link href="/contact">
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        inline-flex
        items-center
        justify-center
        gap-3
        self-start
        rounded-full
        bg-gradient-to-r
        from-orange-500
        via-amber-500
        to-orange-600
        px-8
        py-4
        font-semibold
        text-white
        shadow-[0_15px_40px_rgba(249,115,22,0.35)]
        transition-all
        duration-300
        hover:shadow-[0_20px_55px_rgba(249,115,22,0.45)]
        lg:self-center
      "
    >
      Contact Our Experts
      <HiPlus size={20} />
    </motion.button>
    </Link>
  </div>
</motion.div>
      </div>
    </section>
  );
}