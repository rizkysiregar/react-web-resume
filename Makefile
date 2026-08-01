DOCKERHUB_USERNAME ?= rizkysiregar
IMAGE_NAME = $(DOCKERHUB_USERNAME)/react-web-resume
TAG ?= latest

.PHONY: build push release tag-latest tag-version help setup-buildx

help:
	@echo "Usage:"
	@echo "  make setup-buildx              Setup Docker Buildx (run once)"
	@echo "  make build                     Build image with tag 'latest'"
	@echo "  make build TAG=v1.0.0          Build image with custom tag"
	@echo "  make push                      Push image with tag 'latest'"
	@echo "  make push TAG=v1.0.0           Push image with custom tag"
	@echo "  make release TAG=v1.0.0        Build + push multi-platform (amd64+arm64)"
	@echo ""
	@echo "Examples:"
	@echo "  make setup-buildx"
	@echo "  make release TAG=v1.0.0"

setup-buildx:
	@echo "Setting up Docker Buildx..."
	docker buildx create --name multiarch --use --bootstrap || docker buildx use multiarch

build:
	@echo "Building $(IMAGE_NAME):$(TAG)..."
	docker build -t $(IMAGE_NAME):$(TAG) .

push:
	@echo "Pushing $(IMAGE_NAME):$(TAG)..."
	docker push $(IMAGE_NAME):$(TAG)

tag-latest:
	@echo "Tagging $(IMAGE_NAME):$(TAG) as latest..."
	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):latest

release:
	@echo "Building & pushing multi-platform $(IMAGE_NAME):$(TAG)..."
	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		-t $(IMAGE_NAME):$(TAG) \
		-t $(IMAGE_NAME):latest \
		--push .
	@echo "Done! Pushed $(IMAGE_NAME):$(TAG) and latest"
