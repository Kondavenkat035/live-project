pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Avnish-web/live-project.git'
        APP_DIR = 'etawah'
        DOCKER_IMAGE = 'avnishweb/live-project:latest'
        CONTAINER_NAME = 'liveproject_app'
        APP_PORT = '8000'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Stop and remove old container if exists
                    sh '''
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    '''
                    
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Run container
                    sh """
                        docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:8000 ${DOCKER_IMAGE}
                    """

                    // Get host IP and print app URL
                    def ip = sh(script: "hostname -I | awk '{print \$1}'", returnStdout: true).trim()
                    echo "Application is running at: http://${ip}:${APP_PORT}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
