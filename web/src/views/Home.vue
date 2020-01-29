<template lang="pug">
  .home.has-text-centered
    h4.title.is-size-4 Create A Subscription
    br
    .card
      .column
        b-field(label='Amount in dollars')
          b-input(v-model='amount')
        b-field(label='Type')
          b-select(placeholder='Select a name' v-model="type" expanded)
            option(v-for="(option, i) in ['WEEKLY', 'DAILY', 'MONTHLY']", :value='option', :key='i')
              | {{ option }}
        b-field(label='Subscription Start Date')
          b-datepicker(
            placeholder='Click to select Start Date...',
            icon='calendar-today',
            v-model='startDay'
            :date-formatter="formatter")
        b-field(label='Subscription End Date')
          b-datepicker(
            placeholder='Click to select End Date...',
            icon='calendar-today',
            v-model='endDay',
            :date-formatter="formatter")
        p Subscription will be charged on every
          b {{ " " + billingDay }}
          | .
        p
          small Some assumptions are made, specifically the billing day will be the first day of
            | subscription, disallowing the user from manually picking, but it could be easily
            | implemented in another way, I assume.
        br
        b-button.is-primary(@click='onSubmit') Submit


</template>

<script>
import axios from 'axios';
import moment from 'moment';

const formatter = date => moment(date).format('DD/MM/YYYY');

export default {
  methods: {
    onSubmit() {
      if (!this.amount || !this.type || !this.startDay || !this.endDay) {
        this.$buefy.notification.open({
          message: 'Please fill in info',
          type: 'is-danger',
          hasIcon: true,
        });
        return;
      }
      axios.post('http://localhost:3000/', {
        amount: Number(this.amount) * 100,
        type: this.type,
        start_day: moment(this.startDay).format('DD/MM/YYYY'),
        end_day: moment(this.endDay).format('DD/MM/YYYY'),
      }).then(
        (res) => {
          this.$buefy.notification.open({
            message: `Successfully created invoice flow! This is what is returned from the API, ${JSON.stringify(res.data)}`,
            type: 'is-success',
            hasIcon: true,
          });
        },
      ).catch(
        (err) => {
          this.$buefy.notification.open({
            message: `Here is some message returned from the API, (I know some frontend validation will be good, but couldn't bother): ${err.response.data.message}`,
            type: 'is-warning',
            hasIcon: true,
          });
        },
      );
    },
  },
  computed: {
    // eslint-disable-next-line consistent-return
    billingDay() {
      // eslint-disable-next-line default-case
      switch (this.type) {
        case 'WEEKLY':
          return moment(this.startDay).format('dddd');
        case 'DAILY':
          return 'day';
        case 'MONTHLY':
          return moment(this.startDay).format('Do');
      }
    },
  },
  data() {
    return {
      amount: '',
      type: 'WEEKLY',
      startDay: new Date(),
      endDay: new Date(),
      formatter,
    };
  },
};
</script>

<style lang="sass" scoped>
  .card
    max-width: 500px
    margin-left: auto
    margin-right: auto
</style>
