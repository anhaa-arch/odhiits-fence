export const fences = [
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `ODHIITS Хашаа ${i + 1}`,
    image: `/images/fences/fence-${i + 1}.jpg`,
    description: "ODHIITS инженерийн шийдэл бүхий бат бөх төмөр хашаа.",
    priceHint: "65,000₮/м-ээс",
    tag: i % 2 === 0 ? "Стандарт" : "Премиум"
  }))
];
