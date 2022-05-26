const config = require('../config/mercadopago.json')

export async function createPayment(user) {

  const data = {
    access_token: config.secretKey,
    preference:
      {
        "items": [
            {
                "title": "Spread Code",
                "currency_id": "BRL",
                "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                "description": "Adquira agora seu código e comece a ganhar com aplicativo do spread",
                "quantity": 1,
                "unit_price": 65.90,
            }
        ],
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
        "statement_descriptor": "Spread Indicações",
        "external_reference": "Reference_1234",
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