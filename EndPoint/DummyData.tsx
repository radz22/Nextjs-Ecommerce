interface Product {
  id: number;
  location: string;
  productname: string;
  price: number;
  image: string;
}

export const DummyDataProduct1: Product[] = [
  {
    id: 1,
    location: "Living Room",
    productname: "Browning Living Room Sofa",
    price: 2000,
    image:
      "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-brown-sofa-300x300.png",
  },

  {
    id: 2,
    location: "Home Office",
    productname: "Egpytian Vase",
    price: 1200,
    image:
      "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/egyptian-brown-vase-300x300.png",
  },

  {
    id: 3,
    location: "Living Room",
    productname: "Green Living Sofa",
    price: 2500,
    image:
      "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-green-sofa-300x300.png",
  },

  {
    id: 4,
    location: "Chair",
    productname: "Modern Emerald Fabric Chair",
    price: 1000,
    image:
      "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-green-fabric-chair-300x300.png",
  },
];
