import axios from "axios";

export default async function getGenresIds() {
  const genreIds = await axios
    .get(
      `${process.env.REACT_APP_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
    )
    .then((response) => {
      const data = response.data.genres;
      data.push({ id: 10762, name: "Enfants" });
      data.push({ id: 10765, name: "Sci-Fi & Fantasie" });
      data.push({ id: 10759, name: "Action & Aventure" });
      data.push({ id: 10768, name: "Guerre & Politique" });
      return data;
    });
  return genreIds;
}
