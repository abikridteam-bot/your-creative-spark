import exhibition from "@/assets/work-exhibition.jpg";
import stage from "@/assets/work-stage.jpg";
import fabrication from "@/assets/work-fabrication.jpg";
import activation from "@/assets/work-activation.jpg";

export const images = { exhibition, stage, fabrication, activation };

export const services = [
  "Managing Events",
  "Exhibition Design",
  "Retail & Malls",
  "Activation Stands",
  "AV Solutions",
  "Wood Working",
  "Artistic Fabrication",
  "Acrylic & Signboards",
  "Styrofoam",
  "Fiberglass",
  "Fitouts & Interiors",
  "Container Customization",
  "Furniture & Upholstery",
  "Prefab Structures",
  "Specialized Painting",
  "CNC Works",
];

export const serviceImages = [
  stage,
  exhibition,
  activation,
  activation,
  stage,
  fabrication,
  fabrication,
  fabrication,
  fabrication,
  fabrication,
  exhibition,
  activation,
  exhibition,
  fabrication,
  fabrication,
  fabrication,
];

export const projects = [
  {
    title: "Pavilion Zero",
    category: "Exhibition Design",
    copy: "A modular black-steel pavilion with reactive lime lighting, built and installed in eleven days.",
    image: exhibition,
    tall: true,
  },
  {
    title: "Mainstage Live",
    category: "AV Production",
    copy: "Full stage, rigging, lighting and screen production for a large-scale outdoor activation.",
    image: stage,
    tall: false,
  },
  {
    title: "Retail Takeover",
    category: "Brand Experience",
    copy: "A luxury mall pop-up fabricated in-house — glass, acrylic, joinery and integrated LED.",
    image: activation,
    tall: false,
  },
  {
    title: "The Workshop",
    category: "Fabrication",
    copy: "CNC, metal, fiberglass and specialized paint — everything produced under one roof.",
    image: fabrication,
    tall: true,
  },
];

export const materials = [
  { name: "Wood", image: fabrication },
  { name: "Acrylic", image: exhibition },
  { name: "CNC", image: fabrication },
  { name: "Fiberglass", image: activation },
  { name: "Styrofoam", image: fabrication },
  { name: "Metal", image: fabrication },
  { name: "Paint", image: exhibition },
  { name: "Fabrication", image: stage },
];

export const process = [
  { n: "01", title: "Discover", copy: "We listen, audit the brief and map the objective behind the event." },
  { n: "02", title: "Concept", copy: "Creative direction, spatial concepts and visual storytelling." },
  { n: "03", title: "Design", copy: "Technical drawings, 3D visuals and engineering-ready detailing." },
  { n: "04", title: "Produce", copy: "In-house fabrication across wood, metal, acrylic, fiberglass and CNC." },
  { n: "05", title: "Deliver", copy: "Logistics, installation, AV, on-site management and dismantling." },
];

export const certifications = [
  { code: "ISO 9001", title: "Quality Management" },
  { code: "ISO 14001", title: "Environmental Management" },
  { code: "ISO 45001", title: "Occupational Health & Safety" },
];
