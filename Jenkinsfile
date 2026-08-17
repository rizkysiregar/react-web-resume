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

        stage('Docker Push') {
            steps {
                script {
                    def imageTag = env.GIT_COMMIT.take(8)
                    def imageName = "rizkysiregar/react-web-resume:${imageTag}"

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {
                        sh """
                            echo "\$DOCKER_PASSWORD" | docker login \
                                -u "\$DOCKER_USERNAME" \
                                --password-stdin

                            docker push ${imageName}
                        """
                    }
                }
            }
        }

        stage('Update GitOps') {
            steps {
                script {
                    def imageTag = env.GIT_COMMIT.take(8)
                    def imageName = "rizkysiregar/react-web-resume:${imageTag}"

                    dir('gitops') {
                        git branch: 'main',
                            credentialsId: 'github-all-repo-pat',
                            url: 'https://github.com/rizkysiregar/homelabs-gitops.git'

                        sh """
                            sed -i 's|image: rizkysiregar/react-web-resume:.*|image: ${imageName}|' apps/portfolio/deployment.yaml
                        """

                        sh 'git diff -- apps/portfolio/deployment.yaml'

                        sh """
                            git config user.name "Jenkins"
                            git config user.email "jenkins@localhost"

                            git add apps/portfolio/deployment.yaml

                            git commit -m "deploy: portfolio ${imageTag}" || echo "No changes to commit"

                            git push origin main
                        """
                    }
                }
            }
        }       

        
    }
}