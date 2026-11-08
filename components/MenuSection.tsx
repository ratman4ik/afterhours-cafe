"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const menu = {
  Coffee: [
    { name: "Espresso", price: "2.80", note: "House roast · dark caramel · cacao", image: "menu-espresso.webp", alt: "Espresso in a dark ceramic cup at the café bar", position: "50% 60%" },
    { name: "Flat White", price: "3.80", note: "Double shot · microfoam", image: "menu-flat-white.webp", alt: "Flat white with rosetta art on a walnut café counter", position: "52% 58%" },
    { name: "Orange Tonic", price: "5.20", note: "Cold espresso · bitter orange · tonic", image: "menu-orange-tonic.webp", alt: "Layered espresso orange tonic in a tall glass", position: "50% 52%" },
    { name: "Midnight Filter", price: "4.00", note: "Rotating single origin · bottomless", image: "menu-midnight-filter.webp", alt: "Midnight filter coffee with a glass carafe and ceramic cup", position: "50% 58%" },
  ],
  Kitchen: [
    { name: "Ricotta Toast", price: "10.50", note: "Charred sourdough · roast tomato · basil", image: "afterhours-toast.webp", alt: "Ricotta toast with roasted tomatoes", position: "52% 58%" },
    { name: "Night Eggs", price: "12.00", note: "Soft eggs · chilli crisp · grilled focaccia", image: "menu-night-eggs.webp", alt: "Soft eggs and chilli crisp over grilled focaccia", position: "56% 54%" },
    { name: "Mushroom Melt", price: "13.50", note: "Oyster mushroom · aged cheddar · mustard", image: "menu-mushroom-melt.webp", alt: "Pressed sourdough melt with oyster mushrooms and cheddar", position: "50% 52%" },
    { name: "Soup After Dark", price: "8.50", note: "Seasonal bowl · cultured butter · bread", image: "menu-soup-after-dark.webp", alt: "Roasted squash soup with sourdough and cultured butter", position: "52% 56%" },
  ],
  Sweets: [
    { name: "Burnt Basque", price: "6.80", note: "Cream cheese · sea salt", image: "afterhours-sweets.webp", alt: "A slice of burnt Basque cheesecake", position: "38% 62%" },
    { name: "Miso Caramel Bun", price: "5.20", note: "Warm spice · sesame", image: "menu-miso-caramel-bun.webp", alt: "Twisted pastry bun glazed with miso caramel", position: "50% 54%" },
    { name: "Dark Chocolate Pot", price: "7.00", note: "Olive oil · rye crumb", image: "menu-dark-chocolate-pot.webp", alt: "Dark chocolate pot with olive oil and rye crumb", position: "50% 58%" },
    { name: "Affogato", price: "5.50", note: "Vanilla soft serve · espresso", image: "menu-affogato.webp", alt: "Espresso pouring over vanilla soft serve", position: "50% 52%" },
  ],
} as const;

type Category = keyof typeof menu;
const basePath = process.env.NODE_ENV === "production" ? "/afterhours-cafe" : "";

export function MenuSection() {
  const [category, setCategory] = useState<Category>("Coffee");
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeItem = menu[category][activeIndex];

  const changeCategory = (next: Category) => {
    setCategory(next);
    setActiveIndex(0);
  };

  return (
    <section className="menu-section section-pad" id="menu" aria-labelledby="menu-heading">
      <div className="section-kicker"><span>02</span> THE OFFER</div>
      <div className="menu-head">
        <h2 id="menu-heading">EAT.<br /><em>DRINK.</em><br />STAY LATE.</h2>
        <div className="menu-intro">
          <span>DAY MENU / NIGHT ENERGY</span>
          <p>A tight menu, built for unhurried evenings. Seasonal ingredients, good bread, serious coffee.</p>
        </div>
      </div>

      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {(Object.keys(menu) as Category[]).map((item) => (
          <button
            key={item}
            id={`menu-tab-${item.toLowerCase()}`}
            type="button"
            role="tab"
            aria-selected={category === item}
            aria-controls="menu-panel"
            className={category === item ? "active" : ""}
            onClick={() => changeCategory(item)}
          >
            {item}
            {category === item && <motion.span layoutId="menu-line" />}
          </button>
        ))}
      </div>

      <div className="menu-experience">
        <figure className="menu-visual" id="menu-preview" aria-live="polite">
          <div className="menu-visual__frame">
            <AnimatePresence mode="wait">
              <motion.div
                className="menu-visual__image"
                key={`${category}-${activeItem.name}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(12% 0 88% 0)", scale: 1.05 }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)", scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(88% 0 12% 0)", scale: 1.03 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.55, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={`${basePath}/images/${activeItem.image}`}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 36vw"
                  style={{ objectPosition: activeItem.position }}
                />
              </motion.div>
            </AnimatePresence>
            <span className="menu-visual__number">0{activeIndex + 1}</span>
          </div>
          <figcaption>
            <span>DEMO IMAGERY · VISUAL DIRECTION</span>
            <strong>{activeItem.name}</strong>
          </figcaption>
        </figure>

        <div
          className="menu-list"
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`menu-tab-${category.toLowerCase()}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.38 }}
            >
              {menu[category].map((item, index) => (
                <motion.button
                  type="button"
                  className="menu-row"
                  key={item.name}
                  aria-controls="menu-preview"
                  aria-pressed={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
                >
                  <span className="menu-index">0{index + 1}</span>
                  <span className="menu-item-copy"><strong>{item.name}</strong><small>{item.note}</small></span>
                  <span className="menu-price">€{item.price}</span>
                  <span className="menu-arrow" aria-hidden="true">↗</span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="menu-note">Sample menu · prices include VAT · allergens available on request</p>
    </section>
  );
}
