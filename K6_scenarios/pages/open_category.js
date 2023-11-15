import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { SharedArray } from 'k6/data';
import {Parameters} from './parameters.js';

export function OpenCategory(selectedCategory1, vars) {
//const vars = {}

let address, match, response;
const { main_header, main_Page } = Parameters();
    
group(
    `Open a Category - ${selectedCategory1}`,
    function () {
      // category
      address = new URL(
        `${main_Page}=product/category&path=${selectedCategory1}`
      )
      address.searchParams.append('path', selectedCategory1); // Use category1 from the function argument
      response = http.get(address.toString(), {
       headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      match = new RegExp('product_id=(.+?)">').exec(response.body)
      vars['product1'] = match ? match[1] || match[0] : null


      sleep(4.1)
    }
  );
  }
