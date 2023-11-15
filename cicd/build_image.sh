#!/bin/bash
WORKSPACE=$1
IMAGE_NAME=$2
IMAGE_VERSION=$3
REPO_URL=$4

sudo docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} --build-arg WORKSPACE=${WORKSPACE} .
sudo docker tag ${IMAGE_NAME}:${IMAGE_VERSION} ${REPO_URL}/${IMAGE_NAME}:${IMAGE_VERSION}
sudo docker push ${REPO_URL}/${IMAGE_NAME}:${IMAGE_VERSION}