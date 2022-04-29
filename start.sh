#!/bin/bash

yarn

docker-compose up > /dev/null 2> /dev/null < /dev/null &

yarn start