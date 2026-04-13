export const fenceOptions = [
  {
    id: 'three-rail',
    name: '3 дагтай хашаа',
    basePricePerM2: 35000,
    baseHeightM: 1.5,
    image: '/images/fences/fence-1.jpg',
    specs: [
      'Савх 20x20 1mm',
      'Дай 20x30 1.2mm',
      'Шон 1.5mm'
    ],
    description: 'Энгийн, эдийн засагт хэмнэлттэй 3 дагтай төмөр хашаа.'
  },
  {
    id: 'mesh-34',
    name: 'Матаастай хашаа',
    basePricePerM2: 34000,
    baseHeightM: 1.5,
    image: '/images/fences/fence-2.jpg',
    specs: [
      'Матаастай хашаа',
      'Савх 20x20 1mm',
      'Дай 20x30 1.2mm',
      'Шон 40x40'
    ],
    description: 'Матаастай, стандарт хэрэглээнд тохирсон хашаа.'
  },
  {
    id: 'premium-38',
    name: 'Премиум хашаа',
    basePricePerM2: 38000,
    baseHeightM: 1.5,
    image: '/images/fences/fence-3.jpg',
    specs: [
      'Премиум хийц, илүү нягт бүтэц'
    ],
    description: 'Илүү бат бөх, гоёлын чанартай хашаа.'
  }
];

export const heightMultipliers = {
  1.2: 0.95,
  1.3: 0.95,
  1.4: 0.97,
  1.5: 1.0,
  1.6: 1.05,
  1.8: 1.10,
  2.0: 1.15,
};
