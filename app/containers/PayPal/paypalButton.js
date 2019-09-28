import React, { Component } from 'react';
// import { PayPalButton } from "react-paypal-button-v2";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { paypalClientId } from '../../config';

class PaypalButton extends Component {
  state = {};

  render() {
    const paymentSuccess = (details, data) => {
      // return fetch("/paypal-transaction-complete", {
      //     method: "post",
      //     body: JSON.stringify({
      //         orderID: data.orderID
      //     })
      // });

      console.log('details', details, 'data', data);
      const detailsInfo = {
        create_time: '2019-09-23T10:24:50Z',
        id: '9J397835BN357942C',
        payer: {
          address: { country_code: 'US' },
          email_address: 'mohiburnew@gmail.com',
          name: { given_name: 'Mohibur', surname: 'Rahman' },
          payer_id: 'T9R7ZL82AHJ7Y',
        },
        purchase_units: [
          {
            amount: { value: '1.00', currency_code: 'USD' },
            payee: {
              email_address: 'sb-8ljm1222036@business.example.com',
              merchant_id: 'HGGVB3HQUFP9G',
            },
            shipping: {
              address: {
                address_line_1: '1 Main St',
                admin_area_1: 'CA',
                admin_area_2: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
              },
              name: { full_name: 'Mohibur Rahman' },
            },
          },
        ],
        status: 'COMPLETED',
        update_time: '2019-09-23T10:24:50Z',
      };
      const dataInfo = {
        orderID: '9J397835BN357942C',
        payerID: 'T9R7ZL82AHJ7Y',
      };
    };

    const paymentFailure = err => {
      console.log(err);
    };
    const onCancel = () => {
      console.log('cancel');
    };

    return (
      <div>
        {/* <PayPalButton
                    amount="1"
                    onSuccess={paymentSuccess}
                    catchError={paymentFailure}
                    options={{
                        clientId: paypalClientId,
                        currency: "USD"
                    }}
                /> */}
        <PaypalExpressBtn
          env="sandbox"
          client={{
            sandbox: paypalClientId,
            production: paypalClientId,
          }}
          currency="USD"
          total="1"
          onError={paymentFailure}
          onSuccess={paymentSuccess}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaypalButton;
