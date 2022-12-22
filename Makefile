VERSION=0.0.1

wasm:
	@echo "[compile] Compiling wasm..."
	@GOOS=js GOARCH=wasm go build -o backend/bin/backend-v$(VERSION).wasm backend/cmd/wasm/main.go

dev:
	@echo "[dev] Running app..."
	@cd frontend && npm start