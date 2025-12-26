# Simple Makefile for Docker
.PHONY: help run stop restart logs clean

help:
	@echo "Available commands:"
	@echo "  make run     - Build and start container"
	@echo "  make stop    - Stop container"
	@echo "  make restart - Restart container"
	@echo "  make logs    - Show logs"
	@echo "  make clean   - Remove container"

run:
	docker-compose up --build -d

stop:
	docker-compose down
	

restart: stop run

logs:
	docker-compose logs -f

re: restart 

clean:
	docker-compose down -v
	docker volume prune -f	
	docker system prune -a --volumes
