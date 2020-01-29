/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/app')

describe('Test weekly subscription every Tuesday from the 6th of Feb 2018 (from the question)', () => {
  it('should create a new subscription', async () => {
    const res = await request(app)
      .post('/')
      .send({
        amount: 1000,
        type: 'WEEKLY',
        day_week: 2,
        start_day: '06/02/2018',
        end_day: '28/02/2018',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      amount: 1000,
      type: 'WEEKLY',
      invoice_dates: ['06/02/2018', '13/02/2018', '20/02/2018', '27/02/2018'],
    })
  })
})

describe('Test monthly subscription of $1000.00 on 20th', () => {
  it('should create a new subscription', async () => {
    const res = await request(app)
      .post('/')
      .send({
        amount: 100000,
        type: 'MONTHLY',
        day_month: 20,
        start_day: '20/02/2020',
        end_day: '22/04/2020',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject({
      amount: 100000,
      type: 'MONTHLY',
      invoice_dates: ['20/02/2020', '20/03/2020', '20/04/2020'],
    })
  })
})


describe('Test over 3 month subscription', () => {
  it('should fail due to over 3 month', async () => {
    const res = await request(app)
      .post('/')
      .send({
        amount: 100000,
        type: 'MONTHLY',
        day_month: 20,
        start_day: '20/02/2020',
        end_day: '20/06/2020',
      })
    expect(res.statusCode).toEqual(400)
  })
})
