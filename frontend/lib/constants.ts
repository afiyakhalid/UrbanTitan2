export interface CategoryLink {
  name: string;
  href: string;
  slug: string;
  children?: CategoryLink[];
}

export const categoryLinks: CategoryLink[] = [
  {
    name: "Cement",
    slug: "cement",
    href: "/cement",
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
  },
  {
    name: "TMT Steel Bars",
    href: "/tmt-steel-bars",
    slug: "tmt-steel-bars",
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
    children: [
      { name: "Granites", slug: "granites", href: "/natural-stones/granites" },
      { name: "Marbles", slug: "marbles", href: "/natural-stones/marbles" },
    ],
  },
  {
    name: "RMC (Ready Mix Concrete)",
    href: "/rmc-ready-mix-concrete",
    slug: "rmc-ready-mix-concrete",
    children: [],
  },
  {
    name: "Roofing Solutions",
    href: "/roofing-solutions",
    slug: "roofing-solutions",
    children: [],
  },
  {
    name: "UPVC Doors & Windows",
    href: "/upvc-doors-windows",
    slug: "upvc-doors-windows",
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
    children: [],
  },
  {
    name: "Home Decor",
    href: "/home-decor",
    slug: "home-decor",
    children: [
      {
        name: "Interior/Exterior",
        slug: "interior-exterior",
        href: "/home-decor/interior-exterior",
      },
      {
        name: "Home Accessories",
        slug: "home-accessories",
        href: "/home-decor/home-accessories",
      },
      {
        name: "Writing Boards",
        slug: "writing-boards",
        href: "/home-decor/writing-boards",
      },
    ],
  },
  {
    name: "Modular Kitchen",
    href: "/modular-kitchen",
    slug: "modular-kitchen",
    children: [
      {
        name: "RO System",
        slug: "ro-system",
        href: "/modular-kitchen/ro-system",
      },
      {
        name: "Accessories",
        slug: "accessories",
        href: "/modular-kitchen/accessories",
      },
    ],
  },
  {
    name: "Construction Chemicals",
    href: "/construction-chemicals",
    slug: "construction-chemicals",
    children: [
      {
        name: "Adhesive",
        slug: "adhesive",
        href: "/construction-chemicals/adhesive",
      },
      {
        name: "Dry Mix",
        slug: "dry-mix",
        href: "/construction-chemicals/dry-mix",
      },
      {
        name: "Solvents",
        slug: "solvents",
        href: "/construction-chemicals/solvents",
      },
    ],
  },
  {
    name: "Glass Hardware",
    href: "/glass-hardware",
    slug: "glass-hardware",
    children: [
      { name: "Mirrors", slug: "mirrors", href: "/glass-hardware/mirrors" },
    ],
  },
];

export interface Brand {
  name: string;
  slug: string;
  href: string;
}

export const allBrands: Brand[] = [
  {
    name: "Ambuja Cement",
    slug: "ambuja-cement",
    href: "/brands/ambuja-cement",
  },
  { name: "Asian Paints", slug: "asian-paints", href: "/brands/asian-paints" },
  {
    name: "Birla A1 StrongCrete",
    slug: "birla-a1-strongcrete",
    href: "/brands/birla-a1-strongcrete",
  },
  {
    name: "Bondit Construction Chemicals",
    slug: "bondit",
    href: "/brands/bondit",
  },
  { name: "CenturyPly", slug: "centuryply", href: "/brands/centuryply" },
  { name: "Grasim", slug: "grasim", href: "/brands/grasim" },
  { name: "Godrej", slug: "godrej", href: "/brands/godrej" },
  { name: "Greenpanel", slug: "greenpanel", href: "/brands/greenpanel" },
  {
    name: "Greenstone AAC Blocks",
    slug: "greenstone",
    href: "/brands/greenstone",
  },
  { name: "Havells", slug: "havells", href: "/brands/havells" },
  { name: "Hindware", slug: "hindware", href: "/brands/hindware" },
  { name: "Jaquar", slug: "jaquar", href: "/brands/jaquar" },
  {
    name: "Jindal Steel & Power",
    slug: "jindal-steel-power",
    href: "/brands/jindal-steel-power",
  },
  { name: "Kajaria", slug: "kajaria", href: "/brands/kajaria" },
  {
    name: "My Home by Saint-Gobain",
    slug: "my-home-saint-gobain",
    href: "/brands/my-home-saint-gobain",
  },
  { name: "Somany", slug: "somany", href: "/brands/somany" },
  { name: "Tata Tiscon", slug: "tata-tiscon", href: "/brands/tata-tiscon" },
  {
    name: "RINL Vizag Steel",
    slug: "vizag-steel",
    href: "/brands/vizag-steel",
  },
];
