APP = mengnans-cards
REGISTRY = github.com/mengnans/cards
VERSION_TAG := $(shell git describe)
export CONTAINER_IMAGE = $(REGISTRY)/$(APP):${VERSION_TAG}

build:
	@test -z "`git status --porcelain`" || echo "WARNING: you have changes to your git repo not committed to this tag"
	docker build -t $(CONTAINER_IMAGE) .;
    @echo "Successfully built $(CONTAINER_IMAGE)..."

lint:
	docker run -t -- $(CONTAINER_IMAGE) lint

serve:
	docker run -t -p 8000:8000 -- $(CONTAINER_IMAGE) serve

.PHONY: build lint serve
