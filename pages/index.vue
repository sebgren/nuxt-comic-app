<template>
  <div class="card p-6 m-6">
    <div class="has-text-centered">
      <h1 class="title">
        XKCD
      </h1>
      <p class="subtitle">
        A webcomic of romance, sarcasm, math, and language.
      </p>
    </div>

    <hr>

    <div class="is-flex is-justify-content-center has-text-centered mt-4">
      <div>
        <h4 class="title is-4">Today's comic</h4>
        <p class="subtitle is-6">{{todaysComic.title}}</p>
        <img :src="todaysComic.img" alt="">
      </div>
    </div>

    <section class="section is-medium">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="comic in comics">
          <div class="card comic">
            <div class="card-image">
              <figure class="image">
                <img :src="comic.img" :alt="comic.alt">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
  const numberOfComics = 10;

  const response = await useAsyncData("todayscomic", () => {
    return $fetch('/api/todayscomic');
  });
  const todaysComic = response.data.value;
  const latestComicNum = todaysComic.num

  const multiRes = await useAsyncData("getcomics", () => {
    return $fetch('/api/getcomics?todaysComic=' + latestComicNum);
  });
  const comics = multiRes.data.value;
</script>

<style lang="scss" scoped>
// @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>