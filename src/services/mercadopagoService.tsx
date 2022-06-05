const config = require('../config/mercadopago.json')

export async function createPayment(user, value) {

  const data = {
    access_token: config.secretKey,
    preference:
      {
        "items": [
            {
                "title": "Código Spread",
                "currency_id": "BRL",
                "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                "description": "Adquira agora seu código e comece a ganhar com aplicativo do spread",
                "quantity": 1,
                "unit_price": value,
            }
        ],
        "back_urls": {
          "success": "https://spread-api.vercel.app/",
          "failure": "https://spread-api.vercel.app/",
          "pending": "https://spread-api.vercel.app/"
        },
        "auto_return": "approved",
        "binary_mode": true,
        "payer": {
            "name": user.full_name,
            "email": user.email,
            "phone": {
                "area_code": user.phone_number.substring(1, 3),
                "number": parseInt(user.phone_number.substring(5, 15)),
            },
            "identification": {
                "type": "CPF",
                "number": user.cpf.replace(/\D/g, ''),
            },
            "address": {
                "street_name": user.street,
                "zip_code": user.cep.replace(/\D/g, ''),
            }
        },
        "payment_methods": {
          "excluded_payment_types": [
              {"id": "ticket"}
          ],
          "installments": 3
      },
        "statement_descriptor": "Spread Indicações",
      },
  }

  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers()
  }

  const response = await fetch(config.url, fetchData)
  const json = await response.json()
  
  return json
}