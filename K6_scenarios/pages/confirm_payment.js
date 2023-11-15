import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function ConfirmPayment() {
let response;

const { main_header, main_Page } = Parameters();

group(
    'Confirm payment order',
    function () {
      // Confirm payment order
      response = http.get(
        `${main_Page}=checkout/success`,
        {
          headers: main_header,
        }
      )
      check(response, {
        'status equals 200': response => response.status.toString() === '200',
        'body contains Your shopping cart is empty!': response =>
          response.body.includes('Your shopping cart is empty!'),
      })
      sleep(5)

    });
    }