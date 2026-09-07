// Real URLs only, once confirmed — see PRODUCT.md §Capabilities and Constraints.
// Nothing here is hardcoded: components that use this must render nothing
// (not a broken/placeholder link) for any field left unset.
export const social = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
} as const;
