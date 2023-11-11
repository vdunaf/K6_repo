import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export function PaymentCheckout() {
let response;
group(
    ' Payment checkout - http://172.23.176.132/opencart/upload/index.php?route=checkout/cart',
    function () {
      // checkout
      response = http.get('http://172.23.176.132/opencart/upload/index.php?route=checkout/cart', {
        headers: {
          host: '172.23.176.132',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate',
          connection: 'keep-alive',
          'upgrade-insecure-requests': '1',
        },
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.7)

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=extension/total/shipping/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(7)
    }
  )

  group(
    'page_8 - http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout',
    function () {
      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout',
        {
          headers: {
            host: '172.23.176.132',
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            connection: 'keep-alive',
            'upgrade-insecure-requests': '1',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.7)

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_address',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(6)

      // billing address
      response = http.post(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_address/save',
        {
          address_id: '43309',
          payment_address: 'new',
          firstname: 'FN1',
          lastname: 'FN2',
          company: '',
          address_1: 'address1',
          address_2: '',
          city: 'London',
          postcode: '224455',
          country_id: '222',
          zone_id: '3513',
        },
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://172.23.176.132',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/shipping_address',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_address',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(6)

      // delivery address
      response = http.post(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/shipping_address/save',
        {
          address_id: '43309',
          shipping_address: 'new',
          firstname: 'user1',
          lastname: 'user1',
          company: '',
          address_1: 'Old street 2',
          address_2: '',
          city: 'London',
          postcode: '123456',
          country_id: '222',
          zone_id: '3516',
        },
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://172.23.176.132',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/shipping_method',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/shipping_address',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_address',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/checkout/country&country_id=222',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(4)

      // Delivery Method
      response = http.post(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/shipping_method/save',
        {
          shipping_method: 'flat.flat',
          comment: '',
        },
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://172.23.176.132',
            connection: 'keep-alive',
          },
        }
      )

      // Delivery method checkout
      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_method',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      sleep(6.2)

      //  Agree Terms & Conditions
      response = http.post(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/payment_method/save',
        {
          payment_method: 'cod',
          comment: '',
          agree: '1',
        },
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://172.23.176.132',
            connection: 'keep-alive',
          },
        }
      )

      // Continue from payment method
      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/confirm',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      sleep(6)

      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=extension/payment/cod/confirm',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      sleep(0.5)
    }
  )

//  group(
//    'Confirm payment order - http://172.23.176.132/opencart/upload/index.php?route=checkout/success',
//    function () {
//      // Confirm payment order
//      response = http.get(
//        'http://172.23.176.132/opencart/upload/index.php?route=checkout/success',
//        {
//          headers: {
//            host: '172.23.176.132',
//            accept:
//              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//            'accept-language': 'en-US,en;q=0.5',
//            'accept-encoding': 'gzip, deflate',
//            connection: 'keep-alive',
//            'upgrade-insecure-requests': '1',
//          },
//        }
//      )
//      check(response, {
//        'status equals 200': response => response.status.toString() === '200',
//        'body contains Your shopping cart is empty!': response =>
//          response.body.includes('Your shopping cart is empty!'),
//      })
//      sleep(22.8)
//
//    });

  }