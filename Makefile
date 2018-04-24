run-api:
	@docker-compose up saudify-api
.PHONY: run-api

test:
	@docker-compose run test
.PHONY: test

teardown:
	@docker-compose down -v --rmi local
.PHONY: teardown
