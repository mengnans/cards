APP = cards
REGISTRY = github.com/mengnans
VERSION_TAG := $(shell git describe --always)
export CONTAINER_IMAGE = $(REGISTRY)/$(APP):${VERSION_TAG}

build:
	@test -z "`git status --porcelain`" || echo "WARNING: you have changes to your git repo not committed to this tag"
	docker build -t $(CONTAINER_IMAGE) .;
    @echo "Successfully built $(CONTAINER_IMAGE)..."

serve:
	docker run -t -p 80:80 -- $(CONTAINER_IMAGE)

.PHONY: build lint serve
