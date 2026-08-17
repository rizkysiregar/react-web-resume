pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'npm run db:generate'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Typecheck') {
            steps {
                sh 'npm run typecheck'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    def imageTag = env.GIT_COMMIT.take(8)
                    def imageName = "rizkysiregar/react-web-resume:${imageTag}"

                    sh "docker build -t ${imageName} ."
                }
            }
        }
    }
}