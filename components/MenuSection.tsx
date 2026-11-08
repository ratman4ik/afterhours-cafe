"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const menu = {
  Coffee: [
    ["Espresso", "2.80", "House roast · dark caramel · cacao"],
    ["Flat White", "3.80", "Double shot · microfoam"],
    ["Orange Tonic", "5.20", "Cold espresso · bitter orange · tonic"],
    ["Midnight Filter", "4.00", "Rotating single origin · bottomless"],
  ],
  Kitchen: [
    ["Ricotta Toast", "10.50", "Charred sourdough · roast tomato · basil"],
    ["Night Eggs", "12.00", "Soft eggs · chilli crisp · grilled focaccia"],
    ["Mushroom Melt", "13.50", "Oyster mushroom · aged cheddar · mustard"],
    ["Soup After Dark", "8.50", "Seasonal bowl · cultured butter · bread"],
  ],
  Sweets: [
    ["Burnt Basque", "6.80", "Cream cheese · sea salt"],
    ["Miso Caramel Bun", "5.20", "Warm spice · sesame"],
    ["Dark Chocolate Pot", "7.00", "Olive oil · rye crumb"],
    ["Affogato", "5.50", "Vanilla soft serve · espresso"],
  ],
} as const;

type Category = keyof typeof menu;

export function MenuSection() {
  const [category, setCategory] = useState<Category>("Coffee");
  const reduceMotion = useReducedMotion();

  return (
    <section className="menu-section section-pad" id="menu" aria-labelledby="menu-heading">
      <div className="section-kicker"><span>02</span> THE OFFER</div>
      <div className="menu-head">
        <h2 id="menu-heading">EAT.<br /><em>DRINK.</em><br />STAY LATE.</h2>
        <p>A tight menu, built for unhurried evenings. Seasonal ingredients, good bread, serious coffee.</p>
      </div>

      <div className="menu-tabs" role="tablist" aria-label="Menu categories">
        {(Object.keys(menu) as Category[]).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
            {category === item && <motion.span layoutId="menu-line" />}
          </button>
        ))}
      </div>

      <div className="menu-list" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.38 }}
          >
            {menu[category].map(([name, price, note], index) => (
              <motion.article
                className="menu-row"
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
              >
                <span className="menu-index">0{index + 1}</span>
                <div><h3>{name}</h3><p>{note}</p></div>
                <strong>€{price}</strong>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="menu-note">Sample menu · prices include VAT · allergens available on request</p>
    </section>
  );
}
