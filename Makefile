include .env
export $(shell sed 's/=.*//'.env)

DOCKER_USER=darchlabs

docker-build:
	@echo "[building onboarding-app]"
	@docker build -t darchlabs/onboarding-app -f ./Dockerfile --progress tty .
	@echo "Build onboarding-app docker image done ✔︎"

dev:
	@echo "[dev] Running app..."
	@npm start

docker-login:
	@echo "[docker] Login to docker..."
	@docker login -u $(DOCKER_USER) -p $(DOCKER_PASS)

docker: docker-login
	@echo "[docker] pushing darchlabs/onboarding-app:$(VERSION)"
	@docker buildx create --use
	@docker buildx build --platform linux/amd64,linux/arm64  --push -t $(DOCKER_USER)/onboarding-app:$(VERSION)	.
