SHELL := /bin/bash

install: export APP_ENV=dev
install:
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