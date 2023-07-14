include .env
export $(shell sed 's/=.*//' .env)

# Instructions: you need to configure aws env credentials
#
# export AWS_ACCESS_KEY_ID=
# export AWS_SECRET_ACCESS_KEY=
# export AWS_DEFAULT_REGION=us-east-1
DOCKER_USER=darchlabs
BUCKET_NAME=darchlabs.com
DISTRIBUTION_ID=E186GL6SB694BQ
CHECK_AWS_COMMAND := $$(which aws > /dev/null 2>&1 && echo true || echo false)

install:
	@echo "[install] Installing dependencies..."
	@curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
	@sudo installer -pkg ./AWSCLIV2.pkg -target /

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

clear:
	@echo "[clear] Removing build folder..."
	@rm -rf build

build: 
	@echo "[build] Building web..."
	@npm run build

check-aws:
	@if [ "$(CHECK_AWS_COMMAND)" = "false" ]; then \
		echo "Error: need to run 'make install' for installing dependencies"; \
		exit 1; \
	fi
	@if [ -z "$(AWS_ACCESS_KEY_ID)" ]; then \
		echo "Error: AWS_ACCESS_KEY_ID env value is not defined"; \
		exit 1; \
	fi
	@if [ -z "$(AWS_SECRET_ACCESS_KEY)" ]; then \
		echo "Error: AWS_SECRET_ACCESS_KEY env value is not defined"; \
		exit 1; \
	fi
	@if [ -z "$(AWS_DEFAULT_REGION)" ]; then \
		echo "Error: AWS_DEFAULT_REGION env value is not defined"; \
		exit 1; \
	fi

deploy: clear build check-aws
	@echo "[deploy] Deploying..."
	@aws s3 cp build s3://$(BUCKET_NAME)/ --recursive
	@aws cloudfront create-invalidation --distribution-id $(DISTRIBUTION_ID) --paths / /*
