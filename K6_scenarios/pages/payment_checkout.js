import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function PaymentCheckout() {
let response;

const { main_header, main_Page, countryId } = Parameters();

group(
    ' Payment checkout',
    function () {
      // checkout
      response = http.get(`${main_Page}=checkout/cart`, {
        headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.7)

      response = http.get(
        `${main_Page}=extension/total/shipping/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(7)
    }
  )

  group(
    'Checkout ',
    function () {
      response = http.get(
        `${main_Page}=checkout/checkout`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.7)

      response = http.get(
        `${main_Page}=checkout/payment_address`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/checkout/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(6)

      // billing address
      response = http.post(
        `${main_Page}=checkout/payment_address/save`,
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
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/shipping_address`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/checkout/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/payment_address`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/checkout/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(6)

      // delivery address
      response = http.post(
        `${main_Page}=checkout/shipping_address/save`,
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
        { headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      response = http.get(
        `${main_Page}=checkout/shipping_method`,
        {
          headers: main_header,
        }
      )

      response = http.get(
        `${main_Page}=checkout/shipping_address`,
        {
          headers: main_header,
        }
      )

      response = http.get(
        `${main_Page}=checkout/payment_address`,
        {
         headers: main_header,
        }
      )

      response = http.get(
        `${main_Page}=checkout/checkout/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      response = http.get(
        `${main_Page}=checkout/checkout/country&country_id=${countryId}`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(4)

      // Delivery Method
      response = http.post(
        `${main_Page}=checkout/shipping_method/save`,
        {
          shipping_method: 'flat.flat',
          comment: '',
        },
        { headers: main_header,
        }
      )
      // Delivery method checkout
      response = http.get(
        `${main_Page}=checkout/payment_method`,
        {
          headers: main_header,
        }
      )
      sleep(6.2)

      //  Agree Terms & Conditions
      response = http.post(
        `${main_Page}=checkout/payment_method/save`,
        {
          payment_method: 'cod',
          comment: '',
          agree: '1',
        },
        {
          headers: main_header,
        }
      )
      // Continue from payment method
      response = http.get(
        `${main_Page}=checkout/confirm`,
        {
          headers: main_header,
        }
      )
      sleep(6)

      response = http.get(
        `${main_Page}=extension/payment/cod/confirm`,
        {
          headers: main_header,
        }
      )
      sleep(0.5)
    }
  )
  }