-include .env .env.prod .env.dev .env.local

MAKEFLAGS += --no-print-directory
TAG    := $(shell git describe --tags --abbrev=0 2> /dev/null || echo 'latest')
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest

DOCKER_COMPOSE ?= docker compose
DC := ${DOCKER_COMPOSE}

ifneq ("$(wildcard Makefile.override)","")
	include Makefile.override
endif

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

.DEFAULT_GOAL := help
.PHONY: help

### Docker

### Development environment

### Frontend
node: ## Run node container
	docker run -it --rm -w="/var/www/html/" --volume "$(PWD)/../:/var/www/html/" -p 3000:3000 node:${NODE_VERSION} bash

### Others
help: ## Display this help
	@awk 'BEGIN {FS = ":.*## "; \
		print "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:"; \
	} \
	/^[a-zA-Z_-]+:.*?##/ { \
		printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 \
	}' $(MAKEFILE_LIST)