prod-build:
	docker compose build
prod:
	make prod-build && docker compose up
