export default defineEventHandler(async (event) => {

  const query = useQuery(event)
  const baseURL = "https://xkcd.com/"
  const endURL = "/info.0.json"
  const todaysComic = query.todaysComic || 2555
  const numberOfComics = query.numberOfComics || 10;
  const startComic = query.startComic || todaysComic - 10;

  let comics = []
  for (let i = parseInt(startComic) + parseInt(numberOfComics); i > startComic; i--) {
    const response = await fetch(baseURL + i + endURL);
    const data = await response.json()
    comics.push(data)
  }

  return comics;
})