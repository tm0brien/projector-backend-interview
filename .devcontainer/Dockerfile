FROM node:15.8.0-buster

# Some basic utilities
RUN apt-get dist-upgrade && apt-get update && \
  apt-get -y install xz-utils unzip jq curl git build-essential python3 vim

# Install the AWS cli
RUN apt-get -y install awscli

# Install the mysql cient
RUN apt-get -y install default-mysql-client

# Add a few alias' to the .bashrc
RUN echo 'alias mysql="mysql -h db --user=root --password=root project"' >> ~/.bashrc
RUN echo 'alias aws="aws --region us-west-2 --endpoint-url http://localhost:8000"' >> ~/.bashrc

ENV AWS_ACCESS_KEY_ID accessKey1
ENV AWS_SECRET_ACCESS_KEY verySecretKey1