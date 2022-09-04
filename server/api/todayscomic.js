export default defineEventHandler(async () => {

  try {
    const response = await fetch('https://xkcd.com/info.0.json');
    const data = await response.json();
    return data;
  } catch (error) {
    error.log('Could not fetch today\'s comic', error);
  }
});
