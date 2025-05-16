"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Divider from "@/components/ui/divider";
import DynamicGrid from "./DynamicGrid";
import { useTranslation } from "@/hooks/useTranslation";

// Define FAQ type to avoid 'any'
interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useTranslation();

  function getFavoriteColor() {
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const day = new Date().getDay();
    return t(`faq.colors.${dayNames[day]}`);
  }

  return (
    <section id="faq" className="py-20 bg-AzulMeiaNoite relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" />
      <div className="container mx-auto px-4 md:px-28">
        <h2 className="text-1xl font-bold text-center text-AzulCeu font-poppins mb-3">
          {t("faq.title")}
        </h2>
        <h1 className="text-3xl font-extrabold text-center text-BrancoCreme mb-12 font-poppins">
          {t("faq.subtitle")}
        </h1>

        <div className="space-y-5">
          <Accordion type="single" collapsible>
            {(t("faq.questions") as FAQItem[]).map((faq, index) => (
              <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
                <AccordionTrigger className="text-BrancoCreme text-lg font-semibold p-4 rounded-lg font-poppins text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-AzulMeiaNoite">
                  <div className="text-BrancoCreme font-spaceGrotesk mb-4">
                    {index === 11
                      ? // For Tiago's favorite color question
                        `${faq.answer}${getFavoriteColor()}${t(
                          "faq.colorSuffix"
                        )}`
                      : faq.answer}
                  </div>
                </AccordionContent>
                <Divider />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
