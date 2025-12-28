export interface CategoryLink {
  name: string;
  href: string;
  slug: string;
  children?: CategoryLink[];
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  parent_id: string;
  createdAt: string;
  updatedAt: string;
}

export const allCategories: CategoryLink[] = [
  {
    name: "Cement",
    slug: "cement",
    href: "/cement",
    imageUrl:
      "https://imgs.search.brave.com/qvgwQeBcrJWqi5THp15opr2pel0qU2FPYgHYWPeeyNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDc2/MTk5NzU2L3Bob3Rv/L2NlbWVudC1iYWdz/LXBpbGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUdDM1Ru/X2wxcHlRVWhLSlpQ/Q0J6d0JyTlB1T1RV/WGZkemhLRElNRG1Q/RVk9",
    children: [
      {
        name: "OPC-53 Grade Cement",
        slug: "opc-53-grade-cement",
        href: "/cement/opc-53-grade-cement",
      },
      {
        name: "PPC Cement",
        slug: "ppc-cement",
        href: "/cement/ppc-cement",
      },
    ],
  },
  {
    name: "Sand & Aggregates",
    href: "/sand-aggregates",
    slug: "sand-aggregates",
    children: [],
    imageUrl:
      "https://imgs.search.brave.com/7hV68pUDm4icGsWsP39QyNu5J_0QNrrg-9sgqNYty3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bHp6Z2NoaW5hLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8wMi9zYW5kLWFn/Z3JlZ2F0ZS5qcGc",
  },
  {
    name: "TMT Steel Bars",
    href: "/tmt-steel-bars",
    slug: "tmt-steel-bars",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/130x130/9df78eab33525d08d6e5fb8d27136e95/s/u/sugna_tmt_image_3.jpg",
    children: [
      {
        name: "Fe-500 Grade TMT Bars",
        slug: "fe-500-grade-tmt-bars",
        href: "/tmt-steel-bars/fe-500-grade-tmt-bars",
      },
      {
        name: "Fe-550 Grade TMT Bars",
        slug: "fe-550-grade-tmt-bars",
        href: "/tmt-steel-bars/fe-550-grade-tmt-bars",
      },
      {
        name: "TMT Binding Wire",
        slug: "tmt-binding-wire",
        href: "/tmt-steel-bars/tmt-binding-wire",
      },
      {
        name: "Rebar Couplers",
        slug: "rebar-couplers",
        href: "/tmt-steel-bars/rebar-couplers",
      },
    ],
  },
  {
    name: "Bricks & Blocks",
    href: "/bricks-blocks",
    slug: "bricks-blocks",
    imageUrl:
      "https://imgs.search.brave.com/qPFroWe-e2itv251NVbvltwupSrBLVUcG-2MrtnCkDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/NC8yNS8xMi8wMC9i/cmljay0yMjU5NTEx/XzY0MC5qcGc",
    children: [
      {
        name: "Concrete Solid Blocks",
        slug: "concrete-solid-blocks",
        href: "/bricks-blocks/concrete-solid-blocks",
      },
      {
        name: "Flyash Bricks",
        slug: "flyash-bricks",
        href: "/bricks-blocks/flyash-bricks",
      },
      {
        name: "Autoclaved Aerated Concrete (AAC) Blocks",
        slug: "aac-blocks",
        href: "/bricks-blocks/autoclaved-aerated-concrete-aac-blocks",
      },
      {
        name: "Red Bricks",
        slug: "red-bricks",
        href: "/bricks-blocks/red-bricks",
      },
    ],
  },
  {
    name: "Electrical",
    href: "/electrical",
    slug: "electrical",
    imageUrl:
      "https://imgs.search.brave.com/5BGfar-qyCYHm559LwTbSMI7WJxupZ-ybkYD8q1s2IA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/aWZmZXJlbnQtZWxl/Y3RyaWNhbC10b29s/cy13b29kZW4tYmFj/a2dyb3VuZC1mbGF0/LWxheV8xNjkwMTYt/MjQ2MDQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",
    children: [
      {
        name: "Conduit Pipes and Fittings",
        slug: "conduit-pipes-fittings",
        href: "/electrical/conduit-pipes-fittings",
      },
      {
        name: "Wires and Cables",
        slug: "wires-cables",
        href: "/electrical/wires-cables",
      },
      {
        name: "Modular Switches and Sockets",
        slug: "modular-switches-sockets",
        href: "/electrical/modular-switches-sockets",
      },
      {
        name: "Electric Panels",
        slug: "electric-panels",
        href: "/electrical/electric-panels",
      },
      {
        name: "Others",
        slug: "others",
        href: "/electrical/others",
      },
      {
        name: "Switch Gear (DB/MCB/RCCB etc.)",
        slug: "switch-gear",
        href: "/electrical/switch-gear",
      },
    ],
  },
  {
    name: "Plumbing",
    href: "/plumbing",
    slug: "plumbing",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/f/i/fino.jpg",
    children: [
      {
        name: "CPVC Pipes and Fittings",
        slug: "cpvc-pipes-fittings",
        href: "/plumbing/cpvc-pipes-fittings",
      },
      {
        name: "UPVC Pipes and Fittings",
        slug: "upvc-pipes-fittings",
        href: "/plumbing/upvc-pipes-fittings",
      },
      {
        name: "SWR Pipes and Fittings",
        slug: "swr-pipes-fittings",
        href: "/plumbing/swr-pipes-fittings",
      },
      {
        name: "SWG Pipes",
        slug: "swg-pipes",
        href: "/plumbing/swg-pipes",
      },
      {
        name: "Specials and Accessories",
        slug: "specials-accessories",
        href: "/plumbing/specials-accessories",
      },
    ],
  },
  {
    name: "Wooden Products",
    href: "/wooden-products",
    slug: "wooden-products",
    imageUrl:
      "https://imgs.search.brave.com/HPtP6foGSjtm_evQ-xkSEOhglf1WMRKphrvhCLve4E4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcx/LmV4cG9ydGVyc2lu/ZGlhLmNvbS9wcm9k/dWN0X2ltYWdlcy9i/Yy1zbWFsbC9kaXJf/MTg0LzU0OTY3NzMv/aGFuZGNyYWZ0ZWQt/d29vZGVuLXByb2R1/Y3RzLTE1MTgxNTYx/NjYtMzYzNjA2NS5q/cGVn",
    children: [
      { name: "Plywood", slug: "plywood", href: "/wooden-products/plywood" },
      {
        name: "Block Boards",
        slug: "block-boards",
        href: "/wooden-products/block-boards",
      },
      {
        name: "Decorative Laminates",
        slug: "decorative-laminates",
        href: "/wooden-products/decorative-laminates",
      },
      { name: "Veneers", slug: "veneers", href: "/wooden-products/veneers" },
    ],
  },
  {
    name: "Tiles",
    href: "/tiles",
    slug: "tiles",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/s/a/sand-br.jpg",
    children: [
      { name: "Floor Tiles", slug: "floor-tiles", href: "/tiles/floor-tiles" },
      { name: "Wall Tiles", slug: "wall-tiles", href: "/tiles/wall-tiles" },
      {
        name: "Parking Tiles",
        slug: "parking-tiles",
        href: "/tiles/parking-tiles",
      },
      {
        name: "Vitrified Tiles",
        slug: "vitrified-tiles",
        href: "/tiles/vitrified-tiles",
      },
    ],
  },
  {
    name: "Bathroom Accessories",
    href: "/bathroom-accessories",
    slug: "bathroom-accessories",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/b/a/bafactghb0003.jpg",
    children: [
      {
        name: "Faucets",
        slug: "faucets",
        href: "/bathroom-accessories/faucets",
      },
      {
        name: "Showers",
        slug: "showers",
        href: "/bathroom-accessories/showers",
      },
      {
        name: "Sanitaryware",
        slug: "sanitaryware",
        href: "/bathroom-accessories/sanitaryware",
      },
      {
        name: "Other Accessories",
        slug: "other-accessories",
        href: "/bathroom-accessories/other-accessories",
      },
    ],
  },
  {
    name: "Hardware Fixtures",
    href: "/hardware-fixtures",
    slug: "hardware-fixtures",
    imageUrl:
      "https://imgs.search.brave.com/bn82am1v4UeFhYHiF_-nvR1dVD90atMyYxxtBmcxaIA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGlhdHQtaGFyZHdh/cmUuY29tL21lZGlh/L21lZ2FtZW51X2hp/YXR0L2dhdGUtaGFy/ZHdhcmUuanBn",
    children: [
      {
        name: "Luxury Handles",
        slug: "luxury-handles",
        href: "/hardware-fixtures/luxury-handles",
      },
      {
        name: "Premium Handles",
        slug: "premium-handles",
        href: "/hardware-fixtures/premium-handles",
      },
      {
        name: "Stainless Steel Handles",
        slug: "stainless-steel-handles",
        href: "/hardware-fixtures/stainless-steel-handles",
      },
      {
        name: "Stainless Steel Pull Handles",
        slug: "stainless-steel-pull-handles",
        href: "/hardware-fixtures/stainless-steel-pull-handles",
      },
      {
        name: "Mortise Locks",
        slug: "mortise-locks",
        href: "/hardware-fixtures/mortise-locks",
      },
      {
        name: "Latches and Hinges",
        slug: "latches-hinges",
        href: "/hardware-fixtures/latches-hinges",
      },
      {
        name: "Drawer and Cabinet Hardware",
        slug: "drawer-cabinet-hardware",
        href: "/hardware-fixtures/drawer-cabinet-hardware",
      },
      {
        name: "Euro Profile Cylinders",
        slug: "euro-profile-cylinders",
        href: "/hardware-fixtures/euro-profile-cylinders",
      },
    ],
  },
  {
    name: "Paints & Finishes",
    href: "/paints-finishes",
    slug: "paints-finishes",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/p/f/pfdepcinp0004_1_1_1_1_1.png",
    children: [
      {
        name: "Wall Care Putty",
        slug: "wall-care-putty",
        href: "/paints-finishes/wall-care-putty",
      },
      {
        name: "Decorative Paint Coating",
        slug: "decorative-paint-coating",
        href: "/paints-finishes/decorative-paint-coating",
      },
      {
        name: "Texture & Wall Care Finishes",
        slug: "texture-wall-care-finishes",
        href: "/paints-finishes/texture-wall-care-finishes",
      },
    ],
  },
  {
    name: "Lighting & Fixtures",
    href: "/lighting-fixtures",
    slug: "lighting-fixtures",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/e/d/edge_series-bajaj_1.jpg",
    children: [
      {
        name: "Indoor Luminaires",
        slug: "indoor-luminaires",
        href: "/lighting-fixtures/indoor-luminaires",
      },
      {
        name: "Office Lighting",
        slug: "office-lighting",
        href: "/lighting-fixtures/office-lighting",
      },
      {
        name: "Outdoor Luminaires",
        slug: "outdoor-luminaires",
        href: "/lighting-fixtures/outdoor-luminaires",
      },
      {
        name: "Roadway LED Lighting",
        slug: "roadway-led-lighting",
        href: "/lighting-fixtures/roadway-led-lighting",
      },
      {
        name: "Lighting Electronics and Controls",
        slug: "electronics-controls",
        href: "/lighting-fixtures/electronics-controls",
      },
    ],
  },
  {
    name: "Natural Stones",
    href: "/natural-stones",
    slug: "natural-stones",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/s/t/steel_grey_5.jpg",
    children: [
      { name: "Granites", slug: "granites", href: "/natural-stones/granites" },
      { name: "Marbles", slug: "marbles", href: "/natural-stones/marbles" },
    ],
  },
  {
    name: "RMC (Ready Mix Concrete)",
    href: "/rmc-ready-mix-concrete",
    slug: "rmc-ready-mix-concrete",
    imageUrl:
      "http://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/f/i/firstchoice-rmc_2.jpg",
    children: [],
  },
  {
    name: "Roofing Solutions",
    href: "/roofing-solutions",
    slug: "roofing-solutions",
    children: [],
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/r/s/rsrsotlrp0005.png",
  },
  {
    name: "UPVC Doors & Windows",
    href: "/upvc-doors-windows",
    slug: "upvc-doors-windows",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/small_image/270x340/170ec19af00183b5e0368529fc2daa2f/u/p/upupdofen0002-2.png",
    children: [
      {
        name: "UPVC Doors",
        slug: "upvc-doors",
        href: "/upvc-doors-windows/upvc-doors",
      },
      {
        name: "UPVC Windows",
        slug: "upvc-windows",
        href: "/upvc-doors-windows/upvc-windows",
      },
    ],
  },
  {
    name: "Home Automation",
    href: "/home-automation",
    slug: "home-automation",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/150x150/9df78eab33525d08d6e5fb8d27136e95/h/a/hahatrviv0026.png",
    children: [],
  },
];

export interface Brand {
  name: string;
  slug: string;
  href: string;
  imageUrl?: string;
  description: string;
}

export const allBrands: Brand[] = [
  {
    name: "Ambuja Cement",
    slug: "ambuja-cement",
    href: "/brands/ambuja-cement",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/Ambuja-Cement.jpg",
    description: "Premium interior and exterior paints for long-lasting beauty",
  },
  {
    name: "Asian Paints",
    slug: "asian-paints",
    href: "/brands/asian-paints",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/asian2.jpg",
    description:
      "Leading paint brand known for innovation and superior finish.",
  },
  {
    name: "Birla A1 StrongCrete",
    slug: "birla-a1-strongcrete",
    href: "/brands/birla-a1-strongcrete",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/strongcrete.jpg",
    description: "High-performance cement designed for durable construction.",
  },
  {
    name: "Bondit Construction Chemicals",
    slug: "bondit",
    href: "/brands/bondit",
    description:
      "Construction chemicals trusted for waterproofing and bonding.",
  },
  {
    name: "CenturyPly",
    slug: "centuryply",
    href: "/brands/centuryply",
    description: "Premium plywood and laminates known for durability.",
  },
  {
    name: "Grasim",
    slug: "grasim",
    href: "/brands/grasim",
    description: "Quality cement products trusted across India.",
  },
  {
    name: "Godrej",
    slug: "godrej",
    href: "/brands/godrej",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/godrej2.jpg",
    description: "Reliable home improvement and fittings solutions.",
  },
  {
    name: "Greenpanel",
    slug: "greenpanel",
    href: "/brands/greenpanel",
    description: "India’s largest manufacturer of MDF and wood panels.",
  },
  {
    name: "Greenstone AAC Blocks",
    slug: "greenstone",
    href: "/brands/greenstone",
    description: "Lightweight AAC blocks for energy-efficient construction.",
  },
  {
    name: "Havells",
    slug: "havells",
    href: "/brands/havells",
    description:
      "Top electrical brand offering wires, switches, and appliances.",
  },
  {
    name: "Hindware",
    slug: "hindware",
    href: "/brands/hindware",
    description: "Modern sanitaryware and bathroom solutions.",
  },
  {
    name: "Jaquar",
    slug: "jaquar",
    href: "/brands/jaquar",
    description: "Premium bathroom fittings and luxury bathware.",
  },
  {
    name: "Jindal Steel & Power",
    slug: "jindal-steel-power",
    href: "/brands/jindal-steel-power",
    description:
      "Trusted steel products used across major infrastructure projects.",
  },
  {
    name: "Kajaria",
    slug: "kajaria",
    href: "/brands/kajaria",
    description: "India’s No.1 tile brand offering elegant designs.",
  },
  {
    name: "My Home by Saint-Gobain",
    slug: "my-home-saint-gobain",
    href: "/brands/my-home-saint-gobain",
    description: "World-class gypsum and building solutions.",
  },
  {
    name: "Somany",
    slug: "somany",
    href: "/brands/somany",
    description: "Stylish tiles and sanitaryware designed for modern homes.",
  },
  {
    name: "Tata Tiscon",
    slug: "tata-tiscon",
    href: "/brands/tata-tiscon",
    description:
      "India’s leading TMT steel bars known for strength and safety.",
  },
  {
    name: "RINL Vizag Steel",
    slug: "vizag-steel",
    href: "/brands/vizag-steel",
    description: "High-quality steel products from Vizag Steel Plant.",
  },
];
