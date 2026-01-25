import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export async function getDestinationImage(destination) {
  const result = await unsplash.search.getPhotos({
    query: destination,
    page: 1,
    perPage: 1,
    orientation: "landscape",
  });

  if (result.errors) {
    console.error("Unsplash API error:", result.errors[0]);
    return null;
  }

  const photo = result.response.results[0];
  return photo?.urls?.regular;
}
