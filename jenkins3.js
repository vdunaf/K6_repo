pipeline {
    agent any
    parameters {
        choice choices: ['LoadTest', 'StressTest', 'EnduranceTest', 'BaselineTest', 'LoadTest_MainFlows', 'ScriptVerification_SmokeTest'], description: 'Type of Test To Be Executed', name: 'Type_of_API_test'
        string defaultValue: '1', description: 'Number of virtual users', name: 'VU1'
        string defaultValue: '30', description: 'Duration(seconds)', name: 'DURATION'
        //string defaultValue: '1', description: 'Iterations', name: 'ITERATIONS'
        choice(choices: ['test5.js', 'test4.js'], description: 'Select a test', name: 'scenario')
    }

    stages {
        stage('Verify k6') {
            steps {
                bat 'k6 version'
            }
        }

        stage('Run k6 tests') {
            parallel {
                stage('Run test5.js') {
                    steps {
                        script {
                            bat "k6 run --vus %VU1% --duration %DURATION%s K6_scenarios\\.idea\\test5.js"
                        }
                    }
                }

                stage('Run test4.js') {
                    steps {
                        script {
                            bat "k6 run --vus %VU1% --duration %DURATION%s K6_scenarios\\.idea\\test4.js"
                        }
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // reportName variable
                    def reportName = params.Type_of_API_test
                    // Thread variable
                    def VU1 = params.VU1
                    // Get the current timestamp in milliseconds
                    def timestamp = currentBuild.getTimeInMillis()
                    // Format the timestamp into a human-readable date
                    def formattedTimestamp = new Date(timestamp).format('yyyy-MM-dd HH:mm:ss')
                    // Publish the HTML report
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'summary.html', // Specify the main HTML file to display
                        reportName: "${formattedTimestamp} ${reportName} HTML Report with ${VU1} users"
                    ])
                }
            }
        }

        stage('Grafana Dashboard Link') {
            steps {
                script {
                    // grafana url for aggregate dashboard
                    def perfResult = "http://172.23.176.156:3000/d/hb7fSE0Zz/testlab-opencart-monitoring?orgId=1&var-job=perf_opencart_1&var-hostname=All&from=%d&to=%d"

                    // get build start and end time
                    def start = currentBuild.startTimeInMillis
                    def end = start + currentBuild.duration

                    // replace time
                    perfResult = String.format(perfResult, start, end)

                    // build the string to be added as description.
                    def link = "<a href='%s'>Grafana Dashboard</a><br/>"
                    def sb = new StringBuilder()
                    sb.append(String.format(link, perfResult))

                    // set build description
                    currentBuild.setDescription(sb.toString())
                }
            }
        }
    }
}
