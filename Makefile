build-api:
	@docker-compose build saudify-api
.PHONY: build-api

run-api:
	@docker-compose up saudify-api
.PHONY: run-api

import-static-contrib:
	@docker-compose run saudify-api npm run import:dev
.PHONY: import-static-contrib

build-test:
	@docker-compose build test
.PHONY: build-test

test:
	@docker-compose run test
.PHONY: test

teardown:
	@docker-compose down -v --rmi local
.PHONY: teardown
