import Axios from "axios";

export async function loadExperiences({ commit }) {
  const response = await Axios.get("/api/experiences");

  commit("SET_EXPERIENCES", response.data);
}
export async function loadAllExperiences({ commit }) {
  const response = await Axios.get("/api/experiences/all");

  commit("SET_ALL_EXPERIENCES", response.data);
}
