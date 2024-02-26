import axios from "axios";

// ============================get all food
export async function getFoods({ filter }) {
  const { data } = await axios.get("/api/foods/");
  const foods = data.foods;
  if (filter) {
    const filteredData = await foods.filter((food) =>
      food.tags.includes(filter.value)
    );
    return filteredData;
  }

  return data.foods;
}

// ============================get food by id
export async function getFoodByID(foodId) {
  try {
    const { data } = await axios.get(`/api/foods/${foodId}`);
    return data.food;
  } catch (error) {
    throw Error(error.response.data.error);
  }
}

// ============================get food tags
export async function getTags() {
  try {
    const { data } = await axios.get("/api/foods/tags");
    return data;
  } catch (error) {
    throw new Error("failed to fetch tags data");
  }
}
