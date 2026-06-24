import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    name: 'Spring Pastels',
    bg: 'linear-gradient(135deg, #F2C4D0 0%, #FAF7F4 100%)',
    brands: 'Peruzzi · Masai',
    textColor: '#2C2C2C',
    linkColor: '#D4819A',
  },
  {
    name: 'Bold Colour',
    bg: 'linear-gradient(135deg, #D4819A 0%, #F2C4D0 100%)',
    brands: 'Marie Mero · Deck',
    textColor: '#FFFFFF',
    linkColor: '#FFFFFF',
  },
  {
    name: 'Coastal Casual',
    bg: 'linear-gradient(135deg, #FAF7F4 0%, #9E9085 100%)',
    brands: 'Deck · Robell',
    textColor: '#2C2C2C',
    linkColor: '#2C2C2C',
  },
  {
    name: 'Evening Edit',
    bg: 'linear-gradient(135deg, #2C2C2C 0%, #9E9085 100%)',
    brands: 'Marie Mero · Peruzzi',
    textColor: '#FFFFFF',
    linkColor: '#F2C4D0',
  },
];

export default function HorizontalCollections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      (context) => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance() + 'px',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + getDistance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        const cards = track.querySelectorAll<HTMLElement>('.collection-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.94 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 90%',
                end: 'left 30%',
                scrub: true,
              },
            }
          );
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div id="collections">
      {/* Section heading above the pinned area */}
      <div
        style={{
          padding: '80px 48px 40px',
          backgroundColor: '#FAF7F4',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9E9085',
            marginBottom: '12px',
          }}
        >
          Curated For You
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300,
            color: '#2C2C2C',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Featured Collections
        </h2>
      </div>

      {/* Desktop horizontal scroll */}
      <div
        ref={sectionRef}
        className="h-section"
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          ref={trackRef}
          className="h-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            paddingLeft: '48px',
            paddingRight: '48px',
            gap: '24px',
            width: 'max-content',
          }}
        >
          {collections.map((col, i) => (
            <div
              key={i}
              className="collection-card"
              style={{
                width: '60vw',
                height: '80vh',
                background: col.bg,
                borderRadius: '4px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '48px',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Watermark number */}
              <span
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '32px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '120px',
                  fontWeight: 300,
                  color: col.textColor,
                  opacity: 0.06,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(48px, 5vw, 72px)',
                    color: col.textColor,
                    fontWeight: 300,
                    lineHeight: 1.1,
                    marginBottom: '12px',
                    margin: '0 0 12px 0',
                  }}
                >
                  {col.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: col.textColor,
                    opacity: 0.6,
                    marginBottom: '28px',
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    margin: '0 0 28px 0',
                  }}
                >
                  {col.brands}
                </p>
                <a
                  href="#collections"
                  style={{
                    color: col.linkColor,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    letterSpacing: '0.08em',
                  }}
                >
                  View Collection →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical cards */}
      <div
        className="md:hidden"
        style={{
          padding: '0 20px 60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#FAF7F4',
        }}
      >
        {collections.map((col, i) => (
          <div
            key={i}
            style={{
              background: col.bg,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '36px 28px',
              minHeight: '280px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '40px',
                color: col.textColor,
                fontWeight: 300,
                lineHeight: 1.1,
                margin: '0 0 8px 0',
              }}
            >
              {col.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: col.textColor,
                opacity: 0.6,
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
              }}
            >
              {col.brands}
            </p>
            <a
              href="#collections"
              style={{
                color: col.linkColor,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              View Collection →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
