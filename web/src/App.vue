<template lang="pug">
  #default.d-flex-column
    vue-progress-bar
    Header
    .columns.flex-1
      .main.d-flex-column
        .under-header
          .page-main
            section.section
              .container
                slot(name="notifications")
                router-view
        Footer.footer
</template>

<script>
import Header from '@/components/layouts/element/Header.vue';
import Footer from '@/components/layouts/element/Footer.vue';

export default {
  components: { Header, Footer },
};
</script>

<style lang="sass" scoped>
  #default
    position: relative
    min-height: 100vh
    display: flex

    .main
      flex-grow: 1

    .sidebar
      width: 24rem
      padding: 3rem 3rem 3rem 2rem
      background: white

    .under-header
      display: flex
      flex-direction: row
      flex: 1

    .page-main
      width: 100%
</style>
