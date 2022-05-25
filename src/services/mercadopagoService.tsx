const mercadopago = require('mercadopago');
const config = require('../config/mercadopago.json')

mercadopago.configure({
    access_token: config.secretKey
});

export function createPayment(title, price) {
    let preference = {
        items: [
          {
            title: title,
            unit_price: price,
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
      // Este valor substituirá a string "<%= global.id %>" no seu HTML
        console.log(response)
      }).catch(function(error){
        console.log(error);
      });
}