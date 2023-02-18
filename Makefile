docker-build:
	@echo "[building onboarding-app]"
	@docker build -t darchlabs/onboarding-app -f ./Dockerfile --progress tty .
	@echo "Build onboarding-app docker image done ✔︎"

dev:
	@echo "[dev] Running app..."
	@npm start
