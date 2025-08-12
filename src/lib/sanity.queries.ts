import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && defined(slug.current)]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    type,
    price,
    isPreorder,
    preorderReleaseAt,
    "image": images[0],
    "hoverImage": images[1],
    variants[]{
      sku,
      size,
      color,
      price,
      stock,
      limitedEdition
    },
    "drop": drop->{_id, title, "slug": slug.current}
  } | order(_updatedAt desc)
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    description_IT,
    description_EN,
    "slug": slug.current,
    type,
    price,
    sizes,
    isPreorder,
    preorderReleaseAt,
    images,
    variants[]{
      sku,
      size,
      color,
      price,
      stock,
      limitedEdition
    },
    "drop": drop->{_id, title, "slug": slug.current}
  }
`;

export const DROPS_QUERY = groq`
  *[_type == "drop" && defined(slug.current)]{
    _id,
    title,
    "slug": slug.current,
    releaseAt
  } | order(releaseAt desc)
`;

export const DROP_BY_SLUG_QUERY = groq`
  *[_type == "drop" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    releaseAt,
    description,
    products[]->{
      _id,
      title,
      "slug": slug.current,
      "image": images[0]
    }
  }
`;
