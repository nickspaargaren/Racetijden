# Racetijden

A Next.js web application to keep track of race times in EA SPORTS™ F1® 22, the official videogame of the 2022 FIA Formula One World Championship™.

## Getting Started

### Prerequisites

- Node.js
- Docker
- Yarn

### Installation & Setup

```bash
# Build and setup the project (includes database setup)
make build

# Start the application
make start
```

The application will be available at:
- **App**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555

### Development

```bash
# Run in development mode with logs
make dev

# Stop containers
make stop

# Reset everything (containers, volumes, dependencies and database)
make reset
```

### Testing & Linting

```bash
# Run tests
make test

# Run tests with UI
make test-manual

# Check code style
make lint

# Fix code style issues
make lint-fix
```
