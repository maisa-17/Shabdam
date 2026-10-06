"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Soft gradient card with a badge, title, description and link, adapted from the gradient-card component.
// The card lifts on hover and its corner graphic (an image or an icon) springs and tilts.

const cardVariants = cva(
  "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/60 p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8",
  {
    variants: {
      gradient: {
        rose: "bg-gradient-to-br from-brand-soft to-blush/50",
        sand: "bg-gradient-to-br from-cream to-sand",
        blush: "bg-gradient-to-br from-[#fff4f4] to-blush-soft/70",
        peach: "bg-gradient-to-br from-[#fff6ef] to-[#fbd9c4]/60",
      },
    },
    defaultVariants: {
      gradient: "sand",
    },
  }
);

export type CardGradient = NonNullable<VariantProps<typeof cardVariants>["gradient"]>;

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string; // hex colour for the badge dot, e.g. "#E3000F"
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  /** Decorative corner graphic: an image URL… */
  imageUrl?: string;
  /** …or an icon element (used when there is no image). */
  icon?: React.ReactNode;
}

const cardAnimation = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -4 },
};

const graphicAnimation = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 6 },
};

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, icon, ...props }, ref) => {
    return (
      <MotionConfig reducedMotion="user">
        <motion.div variants={cardAnimation} initial="rest" whileHover="hover" animate="rest" className="h-full" ref={ref}>
          <div className={cn(cardVariants({ gradient }), className)} {...props}>
            {/* Decorative corner graphic */}
            {imageUrl ? (
              <motion.img
                src={imageUrl}
                alt=""
                aria-hidden
                variants={graphicAnimation}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="pointer-events-none absolute -right-1/4 -bottom-1/4 w-3/4 opacity-80"
              />
            ) : (
              icon && (
                <motion.span
                  aria-hidden
                  variants={graphicAnimation}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="pointer-events-none absolute -right-6 -bottom-6 text-brand/10 [&>svg]:h-40 [&>svg]:w-40"
                >
                  {icon}
                </motion.span>
              )
            )}

            <div className="relative z-10 flex h-full flex-col">
              {/* Badge */}
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-ink-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: badgeColor }} />
                {badgeText}
              </span>

              {/* Title and description */}
              <div className="grow">
                <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.01em] text-ink md:text-2xl">{title}</h3>
                {description && <p className="max-w-xs text-[15px] leading-relaxed text-ink-3">{description}</p>}
              </div>

              {/* Call to action */}
              <Link href={ctaHref} className="group mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-brand-dark">
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </MotionConfig>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
