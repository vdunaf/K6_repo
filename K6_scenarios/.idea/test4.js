import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { randomIntBetween,
  randomString,
  randomItem,
  uuidv4,
  findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import {HomePage} from "../pages/home_page.js";
//import {Login} from "../pages/login_form.js";
//import {LoginUser} from "../pages/login_user1.js";
import {OpenCategory} from "../pages/open_category.js";
import {OpenProduct} from "../pages/select_product.js";
import {AddToCart} from "../pages/add_to_cart.js";
import {OpenShoppingCart} from "../pages/open_shoppingcart.js";
import {PaymentCheckout} from "../pages/payment_checkout.js";
import {ConfirmPayment} from "../pages/confirm_payment.js";
import {Logout} from "../pages/logout_form.js";
//import {LoginUser2} from "../pages/login_user2.js";
import {LoginUser3} from "../pages/login_user3.js";


export const options = {
//  ext: {
//    loadimpact: {
//      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
//      apm: [],
//    },
//  },
//    duration: '2m',
//    vus: 3,
thresholds: {http_req_failed: ['rate<0.02'], // http errors should be less than 2%
               http_req_duration: ['p(95)<3000'], // 95% requests should be below 3s
},
               executor: 'per-vu-iterations',
               vus: 5,
               iterations: 5,
               //maxDuration: '60s',
   };

//  scenarios: {
//    Scenario_2: {
//      executor: 'ramping-vus',
//      gracefulStop: '30s',
//      stages: [
//        { target: 2, duration: '15s' },
//        { target: 5, duration: '2m30s' },
//        { target: 0, duration: '30s' },
//      ],
//      gracefulRampDown: '30s',
//      exec: 'Scenario_2',
//    },
//  },
//}
// Load CSV file and parse it using Papa Parse
const accounts = new SharedArray('accounts', function () {
  return papaparse.parse(open('./accounts.csv'), { header: true }).data;

 });

//export function Scenario_2 (){
export default function (){
// Define the vars object here
    const vars = {};

// Select a random user from the CSV
//      const randomUser = accounts[Math.floor(Math.random() * accounts.length)];
//      console.log('Random user: ', JSON.stringify(randomUser));

// Select a random user from the CSV, skipping the header
    const randomUserIndex = Math.floor(Math.random() * (accounts.length - 1)) + 1;
    const randomUser = accounts[randomUserIndex];
console.log('Random user: ', JSON.stringify(randomUser));

const homePageResponse = HomePage();
const category1 = [17, 24, 34];

// Shuffle the array
for (let i = category1.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [category1[i], category1[j]] = [category1[j], category1[i]];
}

// Select the first category ID from the shuffled list
const selectedCategory1 = category1[0];

console.log(`Selected category ID: ${selectedCategory1}`);
// Login to OpenCart
// Login();
//  console.log(username);
//   LoginUser(randomUser);

  LoginUser3(randomUser);
// Open a Category
  OpenCategory(selectedCategory1, vars);
   // Log product1 to check its value
  console.log('product1:', vars['product1']);
  const product1 = vars['product1'];
    vars['product1'] = product1;

  OpenProduct(selectedCategory1, vars);

  AddToCart(product1, vars);

  OpenShoppingCart();

  PaymentCheckout();

  ConfirmPayment();

  Logout();
  console.debug();
  }

  export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
