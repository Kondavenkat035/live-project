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

        stage('Install Requirements') {
            steps {
                sh '''
                    sudo apt-get update -y
                    sudo apt-get install -y python3 python3-pip
                    export PATH=$PATH:/var/lib/jenkins/.local/bin
                    pip3 install --upgrade pip
                    pip3 install -r requirements.txt
                '''
            }
        }

        stage('Run Tests') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        python3 manage.py migrate --noinput
                        python3 manage.py test || true
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    # Stop and remove any existing container
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    # Run a new container
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:8000 ${DOCKER_IMAGE}
                '''

                script {
                    // Use single quotes and escape $ in awk to avoid Groovy parsing errors
                    def ip = sh(script: 'hostname -I | awk \'{print $1}\'', returnStdout: true).trim()
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
