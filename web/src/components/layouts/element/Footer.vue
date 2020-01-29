<template lang="pug">
    footer.has-text-white
        .content.has-text-right
            .columns
                .column.is-3
                    p Ezypay
                    p.grey © 2020 Ezypay Inc. All Rights Reserved
                .column.is-2
                .column.has-text-left.lightgrey
                    p.is-size-4 {{ quote.quote }}
                    .has-text-right
                        span.is-size-6.grey.author -- {{ quote.author }}
            .columns
                .column.is-3
                    p Get in contact
                    p.grey gotexis@gmail.com
                .column.is-2
                .column.has-text-left
                    p   Ezypay Inc.
                        |  by
                        |
                        a(href='https://github.com/gotexis' target="_blank") Exis Zhang
                        | .

</template>

<script>
import quotes from '@/utils/constants/quotes.json';
import { randChoice } from '@/utils/_dev/random';

export default {
  computed: {
    quote() {
      return randChoice(quotes);
    },
  },
};
</script>

<style lang="sass" scoped>
footer
    background-color: rgb(36,36,36)
    width: 100%
    padding: 6% 4%     /* Footer height + padding */

    @media(min-width: 1024px)
        padding: 4% 4%

    a
        color: white
        text-decoration: underline
        text-underline: white
        text-underline-style: dash

.lightgrey
    color: lightgrey
.grey
    color: grey
.author
    margin-right: 50px
</style>
