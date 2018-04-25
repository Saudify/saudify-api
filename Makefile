run-api:
	@docker-compose up saudify-api
.PHONY: run-api

import-static-contrib:
	@docker-compose run saudify-api npm run import:dev
.PHONY: import-static-contrib

test:
	@docker-compose run test
.PHONY: test

teardown:
	@docker-compose down -v --rmi local
.PHONY: teardown
