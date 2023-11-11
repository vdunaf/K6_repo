# Adding test data
In this section, you'll learn the best ways to add test data to your load testing script, making it more dynamic and realistic.

## Why add test data?

Test data is information designed to be used by a test script during execution. The information makes the test more realistic by using different values for certain parameters. Repeatedly sending the same values for things like usernames and passwords may cause caching to occur.

A cache represents content that is saved with the goal of increased application performance. Caching can occur on the server side or on the client side. A server-side cache saves commonly requested resources (such as those on the homepage) so that when those resources are requested, the server can return the resources immediately instead of having to fetch them from a downstream server.

A client-side cache might save the same resources so that a user's browser knows it doesn't have to make a request for those resources unless they have been changed. This implementation reduces the number of network requests that need to be sent and is especially important for apps that are predominantly accessed through a mobile device.

Caching can significantly affect load-testing results. There are situations where caching should be enabled (such as when attempting to simulate the behavior of return customers), but there are also situations where caching should be disabled (such as when simulating brand-new users). Either way, you should decide on your caching strategy intentionally, and script accordingly.

Adding test data can help prevent server-side caching. Common test data includes:
- Usernames and passwords, for logging into an application and performing authenticated actions
- Names, addresses, emails, and other personal information for signing up for accounts or filling out contact forms
- Product names for retrieving product pages
- Keywords for searching a catalog
- PDFs to test uploading

## Array

The simplest way to add test data is with an array. In [Dynamic correlation in k6](02-Dynamic-correlation-in-k6.md), you defined an array like this:

```js
let usernameArr = ['admin', 'test_user'];
let passwordArr = ['123', '1234'];
```

After defining arrays, you can generate a random number to randomly pick a value from the array:

```js
// Get random username and password from array
let rand = Math.floor(Math.random() * usernameArr.length);
let username = usernameArr[rand];
let password = passwordArr[rand];
console.log('username: ' + username, ' / password: ' + password);
```

An array is best used for very short lists of text, as in this example, or for debugging a test script.

## CSV Files

CSV files are lists of information that are made up of _comma-separated values_ and are saved separately from the script.

Below is an example CSV file named `users.csv` containing usernames and passwords:
```plain
username,password
admin,123
test_user,1234
...
```

In k6, the CSV files can then be added to the script like this:

```js
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = papaparse.parse(open('users.csv'), { header: true }).data;

export default function () {
    let rand = Math.floor(Math.random() * csvData.length);
    console.log('username: ', csvData[rand].username, ' / password: ', csvData[rand].password);
}
```

The code imports a library called `papaparse` that lets you interact with CSV files. CSV files are best used when generating new usernames and accounts or when you'd like to be able to open the test data file in a spreadsheet application.

> k6 does not allow you to place code that reads from a local filesystem within the default function. This restriction enforces the best practice of placing file reads in the init context (outside the default function). You can read more about that in [Test life cycle](https://k6.io/docs/using-k6/test-life-cycle/).

## JSON files

You can also store your test data in JSON files.

Below is a JSON file called `users.json`:

```plain
{
  "users": [
    { "username": "admin", "password": "123" },
    { "username": "test_user", "password": "1234" }
  ]
}
```

You can then use it in your k6 script like this:

```js
const jsonData = JSON.parse(open('./users.json')).users;

export default function () {
    let rand = Math.floor(Math.random() * jsonData.length);
    console.log('username: ', jsonData[rand].username, ' / password: ', jsonData[rand].password);
}
```

JSON files are best used when the information to be used for the test is already exported in JSON format, or when the data is more hierarchical than a CSV file can handle.

## Shared Array

A Shared Array combines some elements of the previous three approaches (the simple array, CSV files, and JSON files) while addressing a common issue with test data during test execution: high resource utilization.

In the previous approaches, when a file is used in a test, multiple copies of the file are created and sent to a load generator. When the file is very large, this can unnecessarily use up resources on the load generator, making test results less accurate.

To prevent this, use a `SharedArray`:

```js
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from "k6/data";

const sharedData = new SharedArray("Shared Logins", function() {
    let data = papaparse.parse(open('users.csv'), { header: true }).data;
    return data;
});

export default function () {
    let rand = Math.floor(Math.random() * sharedData.length);
    console.log('username: ', sharedData[rand].username, ' / password: ', sharedData[rand].password);
}
```

Note that the SharedArray must be combined with other approaches―in this case, a CSV file.

Using a SharedArray is the most efficient way to add a list of data within a k6 test.

## Other test data

Test data can also refer to files that need to be uploaded as part of the scenario under test. For example, an image might need to be uploaded to simulate a user uploading their profile photo. For more information on scripting these types of data uploads, [check the documentation here.](https://k6.io/docs/examples/data-uploads/)

## Test your knowledge

### Question 1

In which of the following situations would it be advisable to add test data to your load testing scripts?

A: Your application locks out a user account after three logins in a short amount of time.

B: You want to see how the application behaves when the same user refreshes a page repeatedly.

C: Both A and B.

### Question 2

You have a CSV file with 100 MB of personal information that you'd like to use as test data. Which of the following approaches is the best one to use?

A: SharedArray

B: Simple array

C: JSON files because the CSV is better converted into JSON

### Question 3

All the examples on this page include a `Math.random()` function to randomly select an element from the data file. In which situations might you want to remove this randomization?

A: When you want to prevent server-side caching.

B: When you want to guarantee that each element of test data has been sequentially utilized by the script.

C: When you want to make your tests as realistic as possible.

### Answers

1. A. You could resolve the situation described in A by adding test data of different logins that the script could use. B is incorrect, because it is in fact a good example of a use case where *not* including test data may be the better option.
2. A. Very large data files can have an impact on load testing results when they are copied and transferred repeatedly to every load generator. The SharedArray is a better way to handle these, although it may also be worthwhile to consider storing test data in a database.
3. B. Randomly selecting test data can prevent caching and make the test more realistic. However, random selection can also make it more difficult to determine which test data the test utilized as the data file is not sequentially parsed.
