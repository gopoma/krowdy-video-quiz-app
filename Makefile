install:
	pnpm install
dev:
	pnpm dev
lint:
	pnpm lint
prod-build:
	docker compose build
prod:
	make prod-build && docker compose up
down:
	docker compose down
