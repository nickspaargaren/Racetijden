info: 
	@echo "  make build			Build the project images."
	@echo "  make start			Start the project containers."
	@echo "  make stop			Stop the project containers."
	@echo "  make dev			Start the project containers including dev output."
	@echo "  make lint			Run the project codestyle check."
	@echo "  make lint-fix			Run the project codestyle fix."
	@echo "  make test			Run the project test."
	@echo "  make test-manual		Run the project test with Cypress interface."
	@echo "  make reset			Reset the project containers, volumes, local dependencies and cache files."

build: \
	do-install-dependencies
	@echo ""
	@docker compose build
	@docker compose up -d
	@docker compose exec frontend sh -c "yarn prisma:reset"
	@make database-seed

start:
	@docker compose up -d
	@echo ""
	@echo "  The project is running on http://localhost:3000/."
	@echo "  Prisma Studio is running on http://localhost:5555/."
	@echo ""

stop:
	@docker compose stop

dev:
	@docker compose up

test: ## Run the project tests.
	@make start
	@make do-frontend-tests

test-manual: ## Open the Cypress interface.
	@make start
	@npx cypress open

lint: ## Run the project codestyle & typescript check.
	@make start
	@make do-frontend-codestyle-check
	@make do-frontend-typescript-check

lint-fix: ## Run the project codestyle fix.
	@make start
	@make do-frontend-codestyle-fix

reset: \
	do-remove-nodemodules
	sudo rm -rf postgres-data
	sudo rm -rf build
	@docker compose down -v

# Installing dependencies
do-install-dependencies:
	@echo ""
	@echo "Installing local dependencies.."
	yarn install

# Remove dependencies & cache
do-remove-nodemodules:
	@echo ""
	@echo "Removing all node_modules folders.."
	sudo rm -rf node_modules
	@echo "All node_modules folders removed.."

database-seed:
	@docker compose exec frontend sh -c "yarn prisma db seed"

database-reset:
	@docker compose exec -T frontend sh -c "yarn prisma:reset --force"

database-migration:
	@docker compose exec frontend sh -c "npx prisma migrate dev"

do-frontend-shell:
	@docker compose exec frontend sh

do-frontend-tests:
	@echo "Starting frontend tests.."
	yarn test

do-frontend-codestyle-check:
	@echo "Starting frontend codestyle check.."
	@docker compose exec frontend sh -c "yarn lint"

do-frontend-codestyle-fix:
	@echo "Starting frontend codestyle fix.."
	@docker compose exec frontend sh -c "yarn lint:fix"

do-frontend-typescript-check:
	@echo "Starting frontend typescript check.."
	@docker compose exec frontend sh -c "yarn tsc --noEmit"