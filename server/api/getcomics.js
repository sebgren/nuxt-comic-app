export default defineEventHandler(async (event) => {

  try {
    const query = useQuery(event);
    const baseURL = 'https://xkcd.com/';
    const endURL = '/info.0.json';
    const todaysComic = parseInt(query.todaysComic || 2555);
    const numberOfComics = parseInt(query.numberOfComics || 10);
    const startComic = parseInt(query.startComic || todaysComic - 10);

    const comics = [];

    for (let i = startComic; i < startComic + numberOfComics && i <= todaysComic; i++) {
      const response = await fetch(baseURL + i + endURL);
      const data = await response.json();
      comics.unshift(data);
    }
    return comics;
  } catch (error) {
    console.error('Unable to fetch multiple comics', error);
    return [];
  }
});