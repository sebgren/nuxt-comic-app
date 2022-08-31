export default defineEventHandler(async (event) => {

  const response = await fetch("https://xkcd.com/info.0.json");
  const data = await response.json();
  console.log(data)
  return data;

  return {
    api: 'works'
  }
})
