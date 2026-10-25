export interface EducationCategory {
  title: string;
  slug: string;
  description: string;
}

export const educationCategories: EducationCategory[] = [
  {
    title: "Retirement",
    slug: "retirement",
    description: "Explore retirement planning concepts and strategies.",
  },
  {
    title: "Investments & Asset Allocation",
    slug: "investments-asset-allocation",
    description: "Learn about investing, diversification, and asset allocation.",
  },
  {
    title: "Tax Education",
    slug: "tax-education",
    description: "Understand foundational tax concepts and considerations.",
  },
  {
    title: "Insurance & Risk Management",
    slug: "insurance-risk-management",
    description: "Explore insurance fundamentals and financial risk management.",
  },
  {
    title: "Long-Term Care",
    slug: "long-term-care",
    description: "Understand long-term care planning and related financial topics.",
  },
  {
    title: "Estate & Legacy Planning",
    slug: "estate-legacy-planning",
    description: "Learn about estate planning and wealth transfer concepts.",
  },
  {
    title: "College Funding",
    slug: "college-funding",
    description: "Explore education savings and college funding options.",
  },
];