"use client";

import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDownIcon } from "./icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type AccordionItem = {
  id: string;
  /** Rendered inside the trigger button. */
  title: ReactNode;
  /** Rendered inside the panel. */
  content: ReactNode;
};

// Shared accordion for Soluciones and FAQ (DESIGN.md §Components): animated
// height rather than a display toggle, an icon that rotates, and one panel
// open at a time. Fully operable by keyboard — the trigger is a real button,
// so Enter/Space and Tab work without any key handling of our own.
export function Accordion({ items }: { items: AccordionItem[] }) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `${baseId}-${item.id}-trigger`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-orange-deep"
              >
                <span className="text-lg font-bold sm:text-xl">{item.title}</span>
                <motion.span
                  aria-hidden
                  className="shrink-0 text-orange"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.38,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
