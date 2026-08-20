import React, { useEffect, useRef, useState } from "react";

let nativeSupport = null;
function supportsScrollTimeline() {
  if (nativeSupport !== null) return nativeSupport;
  nativeSupport =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("(animation-timeline: view()) and (animation-range: entry)");
  return nativeSupport;
}

const REVEAL_TRANSFORMS = {
  up: "translateY(64px) scale(0.98)",
  down: "translateY(-48px)",
  left: "translateX(-72px)",
  right: "translateX(72px)",
  scale: "scale(0.82)",
  rotate: "rotate(-6deg) scale(0.92) translateY(40px)",
};

/**
 * Scroll-triggered entrance reveal. Uses the native CSS `.reveal-*`
 * classes (index.css) when the browser supports scroll-driven
 * animations; otherwise falls back to an IntersectionObserver-toggled
 * transition, per parallax-scroll-effects.md's guidance.
 */
export function Reveal({
  as: Tag = "div",
  type = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [useNative] = useState(supportsScrollTimeline);

  useEffect(() => {
    if (useNative) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [useNative]);

  const fallbackStyle = useNative
    ? null
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : REVEAL_TRANSFORMS[type],
        transition: `opacity 0.8s var(--ease-smooth) ${delay}s, transform 0.8s var(--ease-smooth) ${delay}s`,
      };

  return (
    <Tag
      ref={ref}
      className={`${useNative ? `reveal-${type}` : ""} ${className}`}
      style={{ ...fallbackStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A single parallax-drifting layer. speed: pixels of total drift across
 * the element's scroll-through range (positive = moves up faster than
 * scroll; negative = lags behind / moves down).
 */
export function ParallaxLayer({
  as: Tag = "div",
  speed = 60,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const [useNative] = useState(supportsScrollTimeline);

  useEffect(() => {
    if (useNative) return;
    const el = ref.current;
    if (!el) return;

    let raf = null;
    const compute = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (element bottom at top of viewport) .. 1 (element top at bottom)
      const progress = 1 - (rect.top + rect.height / 2) / vh;
      setOffset(progress * speed);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [useNative, speed]);

  const fallbackStyle = useNative
    ? null
    : { transform: `translateY(${offset}px)`, willChange: "transform" };

  return (
    <Tag
      ref={ref}
      className={`${useNative ? "parallax-layer" : ""} ${className}`}
      style={{ ...(useNative ? { "--pv-speed": speed } : fallbackStyle), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Wrapper establishing the shared view-timeline for a group of ParallaxLayers. */
export function ParallaxScope({ as: Tag = "div", className = "", style, children, ...rest }) {
  return (
    <Tag className={`parallax-scope ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
