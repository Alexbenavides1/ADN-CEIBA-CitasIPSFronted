@Library('ceiba-jenkins-library') _
pipeline {

    //Donde se va a ejecutar el Pipeline
    agent {
        label 'Slave_Induccion'
    }

    //Opciones específicas de Pipeline dentro del Pipeline
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
    }

    triggers {
        pollSCM('* * * * *')
    }

    tools {
      nodejs "NodeJS14" //Verisión preinstalada en la Configuración del Master
    }

    //Aquí comienzan los “items” del Pipeline
    stages {
        stage('Checkout') {
            steps {
                echo "------------>Checkout<------------"
                checkout scm
            }
        }
        
        stage('NPM Install') {
            steps {
                echo "------------>Installing<------------"
                withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
                    sh 'npm install'
                }
            }
        }

        stage('Unit Test') {
            steps {
                echo "------------>Testing<------------"
                sh 'npm run test'
                //sh 'ng test --no-watch --code-coverage --browsers ChromeHeadless'
            }
        }

        /*stage('Test end-to-end') {
            steps{
                echo "------------>Testing Protractor<------------"
                sh 'npm run e2e'
            }
        }*/
        
        stage('Static Code Analysis') {
            steps {
                echo "------------>Análisis de código estático<------------"
                sonarqubeMasQualityGatesP(
                        sonarKey:'co.com.ceiba.adn:citasips.front.alex.benavides',
                        sonarName:'''"CeibaADN-CitasIps-Front(alex.benavides)"''',
                        sonarPathProperties:'./sonar-project.properties')
            }
        }

        stage('Build') {
            steps {
                echo "------------>Building<------------"
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'This will run only if successful'
            updateGitlabCommitStatus name: 'IC Jenkins', state: 'success'
        }

        failure {
            echo 'This will run only if failed'
            mail (
                    to: 'alex.benavides@ceiba.com.co',
                    subject: "ERROR CI: ${env.JOB_NAME}",
                    body: "Build failed in Jenkins: Project: ${env.JOB_NAME} Build \n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER} \n\n Please go to ${env.BUILD_URL} and verify the build"
            )
            updateGitlabCommitStatus name: 'IC Jenkins', state: 'failed'
        }
    }
}