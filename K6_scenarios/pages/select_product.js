import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function OpenProduct(category1, vars) {

let address, match, response;
const { main_header, main_Page } = Parameters();

group(
    `Open a product - ${vars['product1']}`,
    function () {
      // open_product
      address = new URL(
        `${main_Page}=product/product&path=${category1}&product_id=${vars['product1']}`
      )
      address.searchParams.append('path', `${category1}`)
      address.searchParams.append('product_id', `${vars['product1']}`)
      response = http.get(address.toString(), {
       headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.9)

      address = new URL(
        `${main_Page}=product/product/review&product_id=${vars['product1']}`
      )
      address.searchParams.append('product_id', `${vars['product1']}`)
      response = http.get(address.toString(), {
      headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      sleep(3.8)
      }
      );
      }
