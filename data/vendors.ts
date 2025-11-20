export const vendors = [
  {
    id: 1,
    name: "Finders Farmhouse",
    distance: "4 km",
    rating: 4,
    location: { lat: 43.6532, lng: -79.3832 },
    image: "/images/slide1.jpg",
    description: "A small family-run farm offering fresh organic produce.",
    products: [1, 2, 3], // references product IDs
  },
  {
    id: 2,
    name: "Greenleaf Organics",
    distance: "2.5 km",
    rating: 5,
    location: { lat: 43.659, lng: -79.39 },
    image: "/images/slide2.jpg",
    description: "Locally sourced vegetables grown sustainably.",
    products: [4, 5, 6],
  },
  {
    id: 3,
    name: "Sunny Orchards",
    distance: "3 km",
    rating: 5,
    location: { lat: 43.655, lng: -79.395 },
    image: "/images/slide3.jpg",
    description: "Fresh seasonal fruits picked at peak ripeness.",
    products: [7, 8, 9],
  },
];
