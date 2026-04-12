export const gates = [
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `ODHIITS Хаалга ${i + 1}`,
    image: `/images/gates/gate-${i + 1}.jpg`,
    description: "ODHIITS загварлаг, аюулгүй байдлыг хангасан төмөр хаалга.",
    priceHint: "350,000₮-өөс",
    tag: i % 2 === 0 ? "Стандарт" : "Премиум"
  }))
];
