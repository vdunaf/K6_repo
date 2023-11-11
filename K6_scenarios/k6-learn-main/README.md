# Welcome to k6-Learn

This repo contains resources for:
- creating slide presentations
- giving a workshop
- speaking about k6
- learning about k6

## Starter slide deck

[Here's a starter slide deck](https://docs.google.com/presentation/d/1gviRg7RTzT0Y2_5WPBADyn5xpa96PIqWivGAThNW6pM/edit?usp=sharing) that you can copy, modify to your use case, and present. It is only intended to be a jumping off point, so you can remove slides that wouldn't appeal to your audience or add new ones to show off your style more.

## What if I want something more hands on?

Consider running a workshop for k6. Below is an outline of what that workshop could look like, as well as modules you could use for each topic. Feel free to take these and include the parts most relevant to you!

We have also created built-in slides for you, which you are free to edit. To customize the slides, please fork this repo and make edits according to how you want the workshop to be structured.

The slides are created using [reveal.js](https://revealjs.com/) and are all found in the [slides](./slides/) folder.

### Running the slides

In your terminal, run the following command:

```
npm install
npm run slides
```

### I: Performance testing principles

- [Introduction to Performance Testing](Modules/I-Performance-testing-principles/01-Introduction-to-Performance-Testing.md)
- [Frontend vs. backend performance testing](Modules/I-Performance-testing-principles/02-Frontend-vs-backend-performance-testing.md)
- [Load testing](Modules/I-Performance-testing-principles/03-Load-Testing.md)
- [High-level overview of the load testing process](Modules/I-Performance-testing-principles/04-High-level-overview-of-the-load-testing-process.md)

### II: k6 Foundations

- [Getting started with k6 OSS](Modules/II-k6-Foundations/01-Getting-started-with-k6-OSS.md)
- [The k6 CLI](Modules/II-k6-Foundations/02-The-k6-CLI.md)
- [Understanding k6 results](Modules/II-k6-Foundations/03-Understanding-k6-results.md)
- [Adding checks to your script](Modules/II-k6-Foundations/04-Adding-checks-to-your-script.md)
- [Adding think time using sleep](Modules/II-k6-Foundations/05-Adding-think-time-using-sleep.md)
- [k6 Load Test Options](Modules/II-k6-Foundations/06-k6-Load-Test-Options.md)
- [Setting test criteria with thresholds](Modules/II-k6-Foundations/07-Setting-test-criteria-with-thresholds.md)
- [k6 results output options](Modules/II-k6-Foundations/08-k6-results-output-options.md)
- [Recording a k6 script](Modules/II-k6-Foundations/09-Recording-a-k6-script.md)

### III: k6 Intermediate

- [How to debug k6 load testing scripts](Modules/III-k6-Intermediate/01-How-to-debug-k6-load-testing-scripts.md)
- [Dynamic correlation in k6](Modules/III-k6-Intermediate/02-Dynamic-correlation-in-k6.md)
- [Workload modeling](Modules/III-k6-Intermediate/03-Workload-modeling.md)
- [Adding test data](Modules/III-k6-Intermediate/04-Adding-test-data.md)
- [Parallel requests in k6](Modules/III-k6-Intermediate/05-Parallel-requests-in-k6.md)
- [Organizing code in k6 by transaction - groups and tags](Modules/III-k6-Intermediate/06-Organizing-code-in-k6-by-transaction_groups-and-tags.md)
- [Setup and Teardown functions](Modules/III-k6-Intermediate/07-Setup-and-Teardown-functions.md)
- [Setting load profiles with executors](Modules/III-k6-Intermediate/08-Setting-load-profiles-with-executors.md)
- [Workload modeling with scenarios](Modules/III-k6-Intermediate/09-Workload-modeling-with-scenarios.md)
- [Using execution context variables](Modules/III-k6-Intermediate/10-Using-execution-context-variables.md)
- [Creating and using custom metrics](Modules/III-k6-Intermediate/11-Creating-and-using-custom-metrics.md)

## Contributors

k6-learn would not be possible without these amazing contributors! 🌟

- [Imma Valls](https://github.com/immavalls)
- [Krzysztof Widera](https://github.com/kwidera)
- [Leandro Melendez](https://github.com/srperf)
- [Marie Cruz](https://github.com/mdcruz)
- [Matt Dodson](https://github.com/MattDodsonEnglish)
- [Nicole van der Hoeven](https://github.com/nicolevanderhoeven)
- [Paul Balogh](https://github.com/javaducky)

## How to contribute?

1. If there an issue does not exist, start by creating it under https://github.com/grafana/k6-learn/issues.
2. [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks) this [repository](https://github.com/grafana/k6-learn). 
3. Make the changes in your forked repository. Note that new branches, changes and pushes will only affect your repository.
4. Once ready, create a [Pull Request from your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork), mentioning the issue it solves (step 1). Keep in mind you might need to [sync it](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).
5. Once you have created the Pull Request, your changes now will be reviewed and either accepted or you will be asked for modifications.
For more information about forking visit the page: https://docs.github.com/en/get-started/quickstart/fork-a-repo