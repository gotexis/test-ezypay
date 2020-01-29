<template lang="pug">
   .card
     .card-image
       figure.image.is-4by3
         a(:href="'https://hellocars.com.au/used-cars/' + car.url" target="_blank")
           img.profile-image(:src='car.photos[0].medium_thumb', :alt='car.description')
     .card-content
       .media
         .media-content
           a.name.title.is-5(:href="'https://hellocars.com.au/used-cars/' + car.url" target="_blank") {{ car.variant.description }}
           hr.invisible
           .tags
             span.tag.is-primary(v-for='tag in [car.variant.year, `${numberWithCommas(car.km)} kms`]')
              | {{ tag }}
       // .content {{ car.description }}
       // hr
       .is-flex
         .flex-1
           b BUY
           p.small Excl. govt charges
         .flex-0
           p.is-size-3 ${{ numberWithCommas(car.price) }}

</template>

<script>

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default {
  name: 'Card',
  props: ['car'],
  methods: {
    numberWithCommas,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="sass" scoped>
  .name
    border-bottom: 2px solid black

    &:hover
      border-color: $primary

  .profile-image
    object-fit: cover

  .media-content
    overflow-x: unset
</style>
