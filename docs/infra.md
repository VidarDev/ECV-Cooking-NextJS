# Docker Configuration

The project leverages Docker containerization for consistent development and deployment environments.

## Environment Setup

Configure your environment variables (`.env.[local|dev|prod]`):

```bash
cp .env .env.local
```

Set required environment variables in your configuration file:

```
NODE_VERSION=XXX # 20.14.0
```

## Container Management

Launch the Node container using the provided Makefile:

```bash
make node
```
