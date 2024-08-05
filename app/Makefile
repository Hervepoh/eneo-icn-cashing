SHELL := /bin/bash

install: export APP_ENV=dev
install:
        docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
	cd frontend && npm install && cd ../
	cd backend && composer install && cd ../
.PHONY: install

start: export APP_ENV=dev
start:
	docker-compose up -d
.PHONY: start

stop: export APP_ENV=dev
stop:
	docker-compose stop
.PHONY: stop


docker-build-and-push:
	docker build . -f ./docker/Dockerfile -t hervepoh/cronify
	docker push hervepoh/cronify
.PHONY: docker-build-and-push
