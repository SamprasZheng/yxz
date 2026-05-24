# Unified Firefly — convenience targets

.PHONY: install demo demo-tw demo-iss demo-rocketlab test lint clean

install:
	uv sync

demo: demo-tw

demo-tw:
	uv run firefly plan --from "Taiwan" --to "SSO-600km" --window 30d

demo-iss:
	uv run firefly plan --from "KSC" --to "ISS" --window 30d

demo-rocketlab:
	uv run firefly plan --from "RocketLab-NZ" --to "SSO-500km" --window 30d

test:
	uv run pytest

lint:
	uv run ruff check src/ tests/

clean:
	rm -rf outputs/*.json outputs/*.md
	find . -type d -name __pycache__ -exec rm -rf {} +
