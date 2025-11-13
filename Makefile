# Define the Docker image name
IMAGE_NAME := cloudtalkative
# Define the directory where test reports will be saved on the host machine
REPORT_HOST_DIR := $(shell pwd)/reports

# --- Core Targets ---

# Default target runs all functional tests
all: test

# Build the Docker image
build:
	@echo "--- Building Docker Image: $(IMAGE_NAME) ---"
	docker build -t $(IMAGE_NAME) .
	@echo "--- Docker build complete ---"

# --- Testing Targets ---

# Run all Playwright tests (API and E2E) inside the container
test: build
	@echo "--- Running all Playwright tests in Docker ---"
	@mkdir -p $(REPORT_HOST_DIR)/functional
	docker run --rm \
		-v $(REPORT_HOST_DIR):/app/reports \
		$(IMAGE_NAME) test

# Run API tests only inside the container
test-api: build
	@echo "--- Running API tests in Docker ---"
	@mkdir -p $(REPORT_HOST_DIR)/functional
	docker run --rm \
		-v $(REPORT_HOST_DIR):/app/reports \
		$(IMAGE_NAME) test:api

# Run E2E tests only inside the container
test-e2e: build
	@echo "--- Running E2E tests in Docker ---"
	@mkdir -p $(REPORT_HOST_DIR)/functional
	docker run --rm \
		-v $(REPORT_HOST_DIR):/app/reports \
		$(IMAGE_NAME) test:e2e

# Run Load Tests using the official grafana/k6 Docker image
test-load:
	@echo "--- Running Load Tests with grafana/k6 Docker ---"
	@mkdir -p $(REPORT_HOST_DIR)/load
	docker run --rm \
		-i \
		-v $(shell pwd):/app \
		-v $(REPORT_HOST_DIR):/app/reports \
		-e REPORT_DIR=/app/reports \
		-e BASE_URL=$(BASE_URL) \
		grafana/k6 run /app/tests/load/timestamp-load.test.js

# --- Reporting Targets ---

# Show the Playwright HTML report (requires Playwright to be installed on host or use npx)
report-pw:
	@echo "--- Opening Playwright Report ---"
	npx playwright show-report $(REPORT_HOST_DIR)/functional/html

# Open the k6 load test HTML report (assumes default report path)
report-load:
	@echo "--- Opening k6 Load Test Report ---"
	open $(REPORT_HOST_DIR)/load/load-test-report.html

# --- Utility Targets ---

# Clean up local report directories
clean:
	@echo "--- Cleaning up reports directory ---"
	rm -rf $(REPORT_HOST_DIR)

.PHONY: all build test test-api test-e2e test-load report-pw report-load clean