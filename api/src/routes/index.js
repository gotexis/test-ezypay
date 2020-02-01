/* eslint-disable camelcase */
import express from 'express'
import moment from 'moment'

const router = express.Router()

router.post('/', (req, res) => {
  const {
    amount, type, day_week, day_month, start_day, end_day,
  } = req.body
  const startDay = moment(start_day, 'DD/MM/YYYY')
  const endDay = moment(end_day, 'DD/MM/YYYY')

  const monthDiff = endDay.diff(startDay, 'months', true)

  if (typeof amount !== 'number' || amount < 0) {
    res.status(400).json({
      message: 'Invalid Amount',
    })
    return
  }

  if (['WEEKLY', 'MONTHLY', 'DAILY'].indexOf(type) === -1) {
    res.status(400).json({
      message: 'Invalid Type',
    })
    return
  }

  if (type === 'WEEKLY' && (day_week <= 0 && day_week > 7)) {
    res.status(400).json({
      message: 'Invalid Value',
    })
    return
  }
  if (type === 'MONTHLY' && (day_month <= 0 && day_month > 12)) {
    res.status(400).json({
      message: 'Invalid Value',
    })
    return
  }

  if (monthDiff > 3 || monthDiff < 0) {
    res.status(400).json({
      message: 'Duration is Greater than 3 Months or end date is earlier than start date',
    })
  }

  const invoice_dates = []

  const localStartDay = startDay.clone()
  invoice_dates.push(localStartDay.clone().format('DD/MM/YYYY'))

  // eslint-disable-next-line default-case
  switch (type) {
    case 'WEEKLY':
      while (localStartDay.add(1, 'weeks').diff(endDay) <= 0) {
        invoice_dates.push(localStartDay.clone().format('DD/MM/YYYY'))
      }
      break
    case 'MONTHLY':
      while (localStartDay.add(1, 'months').diff(endDay) <= 0) {
        invoice_dates.push(localStartDay.clone().format('DD/MM/YYYY'))
      }
      break
    case 'DAILY':
      while (localStartDay.add(1, 'days').diff(endDay) <= 0) {
        invoice_dates.push(localStartDay.clone().format('DD/MM/YYYY'))
      }
      break
  }

  res.status(201).json({
    amount,
    type,
    invoice_dates,
  })
})

module.exports = router
