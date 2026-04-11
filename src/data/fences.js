export const fences = [
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Хашаа ${i + 1}`,
    image: `/images/fences/fence-${i + 1}.jpg`,
    description: "Байгальд ээлтэй будгийн систем, олон жилийн эдэлгээ."
  }))
];
