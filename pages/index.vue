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
        <img :src="todaysComic.img" :title="todaysComic.alt">
      </div>
    </div>

    <section class="section">
      <div class="is-flex is-justify-content-center has-text-centered columns">
        <div class="column">
          <h4 class="title is-4">Older comics</h4>
        </div>
      </div>
      <div class="columns is-multiline">
        <progress v-if="comics == null" class="pt-8 progress is-large is-primary" max="100"></progress>
        <div class="column is-one-fifth card-list" v-for="comic in comics">
          <div class="card tile is-parent is-clickable" @click="openModal(comic)">
            <article class="tile is-child columns is-multiline">
              <div class="column is-full">
                <p class="title is-5 has-text-centered">{{comic.title}}</p>
              </div>
              <div class="column is-full pb-2">
                <figure class="image">
                  <img :src="comic.img" :title="comic.alt">
                </figure>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <ImageModal v-if="clickedComic && modalOpen" :comic="clickedComic" :is-open="modalOpen" @close="modalOpen = false;"/>
    <section class="section">
      <Pagination :totalComics="todaysComic.num" :comicsPerPage="comicsPerPage" :currentPage="currentPage" />
    </section>
  </div>
</template>

<script setup>
  const currentPage = ref(1);
  const comicsPerPage = ref(10);
  const modalOpen = ref(false);
  const clickedComic = ref();
  const route = useRoute();
  const comics = ref();

  watch( () => route.query.currentPage,
    newPage => {
      currentPage.value = newPage;
      fetchMultipleComics()
    })
  
  onMounted(async () => {
    currentPage.value = (typeof route.query.currentPage === 'undefined') ? 0 : route.query.currentPage
    await fetchMultipleComics();
  })

  const response = await useAsyncData("todayscomic", () => {
    return $fetch('/api/todayscomic');
  });
  const todaysComic = response.data.value;
  const latestComicNum = todaysComic.num

  function openModal(chosenComic) {
    clickedComic.value = chosenComic;
    modalOpen.value = true;
  }

  async function fetchMultipleComics() {
    comics.value = null;
    const startComic = latestComicNum - (parseInt(currentPage.value) * comicsPerPage.value)
    const multiRes = await useAsyncData("getcomics", () => {
      return $fetch('/api/getcomics?todaysComic=' + latestComicNum + '&numberOfComics=' + comicsPerPage.value + "&startComic=" + startComic);
    }, {initialCache: false});
    comics.value = multiRes.data.value;
  }
</script>

<style lang="scss" scoped>
</style>