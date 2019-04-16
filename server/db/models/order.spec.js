/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')


describe('Order model', () => {
    describe('Validations', () => {
      it('requires `total`', async () => {
        const order = Order.build();
        try {
          await order.validate()
          throw Error('validation was successful but should have failed without `total`');
        }
        catch (err) {
          expect(err.message).to.contain('total cannot be null');
        }
      });
    })
})