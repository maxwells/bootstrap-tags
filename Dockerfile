# ┌────────────────────────────────────────────────────────────────────┐
# │ Docker container with node, npm, grunt, and bower.                 │
# └────────────────────────────────────────────────────────────────────┘

FROM node:0.10

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get install -y curl git ruby ruby-dev make && \
    gem install compass

# Update npm
RUN npm update -g npm

# http://gruntjs.com/getting-started
RUN npm install -g grunt-cli

# http://bower.io/
RUN npm install -g bower
