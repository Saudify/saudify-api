run-api:
	@docker-compose up
.PHONY: run-api

test:
	@docker-compose run saudify-api npm test
.PHONY: test

teardown:
	@docker-compose down -v --rmi local
.PHONY: teardown
