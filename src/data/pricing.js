export const fenceTypes = [
  {
    id: 'standard',
    name: 'Стандарт төмөр хашаа',
    pricePerMeter: 65000,
    image: '/images/fences/fence-3.jpg',
    description: 'Эдийн засагт хэмнэлттэй, өдөр тутмын хэрэглээнд тохирсон төмөр хашаа.',
    recommendedFor: '0.5–1 га талбай, хувийн сууц, хашаа.',
  },
  {
    id: 'premium',
    name: 'Премиум профиль листэн хашаа',
    pricePerMeter: 85000,
    image: '/images/fences/fence-7.jpg',
    description: 'Илүү бат бөх бүтэц, өнгөний сонголт өргөн, салхины хамгаалалт сайн.',
    recommendedFor: 'Хот суурин, өндөр шаардлагатай объект.',
  },
  {
    id: 'industrial',
    name: 'Индастриал хашаа (үйлдвэр, агуулах)',
    pricePerMeter: 110000,
    image: '/images/fences/fence-12.jpg',
    description: 'Үйлдвэр, агуулах, өндөр аюулгүй байдлын шаардлагатай талбайн хашаа.',
    recommendedFor: 'Үйлдвэр, агуулах, том талбай.',
  },
];

export const pricingConfig = {
  cornerPostExtra: 15000,
  gateBasePrice: 350000,
  laborPercent: 0.15, // хөдөлмөрийн зардлын дундаж хувь
};
