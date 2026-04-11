export const gates = [
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Хаалга ${i + 1}`,
    image: `/images/gates/gate-${i + 1}.jpg`,
    description: "Чанартай төмөр хийц, бат бэх стандарт загвар."
  }))
];
