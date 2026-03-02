import axios from "axios";

const apiNinjasClient = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/",
  headers: {
    "X-Api-Key":
      process.env.REACT_APP_API_NINJAS_KEY ||
      "GP9LgTFDYuvVKw7NqiD2EUfETFBVgDspZPPKTRdi",
  },
});

export const mapDogData = (dog) => {
  // Combine behavioral traits to synthesize a "temperament" string
  const traits = [];
  if (dog.playfulness > 3) traits.push("Playful");
  if (dog.energy > 3) traits.push("Energetic");
  if (dog.trainability > 3) traits.push("Easy to train");
  if (dog.protectiveness > 3) traits.push("Protective");
  if (dog.good_with_children > 3) traits.push("Good with children");
  if (dog.barking > 3) traits.push("Vocal");

  const temperament = traits.length > 0 ? traits.join(", ") : "Calm";

  return {
    id: dog.name.replace(/\s+/g, "-").toLowerCase(), // API-Ninjas doesn't have IDs, using name as slug
    name: dog.name,
    image: dog.image_link,
    weight: `${Math.round(dog.min_weight_male * 0.453592)} - ${Math.round(dog.max_weight_male * 0.453592)}`,
    height: `${Math.round(dog.min_height_male * 2.54)} - ${Math.round(dog.max_height_male * 2.54)}`,
    life_span: `${dog.min_life_expectancy} - ${dog.max_life_expectancy} years`,
    temperament: temperament,
    // Original traits for Detail view if needed
    traits: {
      playfulness: dog.playfulness,
      energy: dog.energy,
      trainability: dog.trainability,
      protectiveness: dog.protectiveness,
      shedding: dog.shedding,
      grooming: dog.grooming,
      drooling: dog.drooling,
      barking: dog.barking,
      good_with_children: dog.good_with_children,
      good_with_other_dogs: dog.good_with_other_dogs,
      good_with_strangers: dog.good_with_strangers,
    },
  };
};

export default apiNinjasClient;
