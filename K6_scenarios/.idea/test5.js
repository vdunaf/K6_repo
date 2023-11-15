import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {HomePage} from "../pages/home_page.js";
//import {Login} from "../pages/login_form.js";
import {OpenCategory} from "../pages/open_category.js";
import {OpenProduct} from "../pages/select_product.js";
import {AddToWishList} from "../pages/add_to_wishlist.js";
import {OpenWishlist} from "../pages/open_wishlist.js";
import {RemoveProduct} from "../pages/remove_product.js";
import {Logout} from "../pages/logout_form.js";
import {LoginUser3} from "../pages/login_user3.js";


//Scenario: Add product to wish list and remove


export const options = {

  thresholds: {http_req_failed: ['rate<0.2'],
               http_req_duration: ['p(95)<3000'], // 95% requests should be below 3s
},
              executor: 'per-vu-iterations',
               vus: 1,
               duration: '60s',
   };

// Load CSV file and parse it using Papa Parse
    const accounts = new SharedArray('accounts', function () {
  return papaparse.parse(open('./accounts.csv'), { header: true }).data;
 });

export default function (){
// Define the vars object here
    const vars = {};

// Select a random user from the CSV, skipping the header
    const randomUserIndex = Math.floor(Math.random() * (accounts.length - 1)) + 1;
    const randomUser = accounts[randomUserIndex];
console.log('Random user: ', JSON.stringify(randomUser));

const homePageResponse = HomePage();
const category1 = [17, 18, 20, 24, 33, 34];

// Shuffle the array
for (let i = category1.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [category1[i], category1[j]] = [category1[j], category1[i]];
}

// Select the first category ID from the shuffled list
const selectedCategory1 = category1[0];

console.log(`Selected category ID: ${selectedCategory1}`);


// Login to OpenCart
  LoginUser3(randomUser);
  sleep(4.1)
  OpenCategory(selectedCategory1, vars);
   // Log product1 to check its value
  console.log('product1:', vars['product1']);
  const product1 = vars['product1'];
    vars['product1'] = product1;

  OpenProduct(selectedCategory1, vars);

  AddToWishList(product1, vars);

  OpenWishlist();

  RemoveProduct(selectedCategory1, vars);

  Logout();

}

  export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
