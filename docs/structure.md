# Directory Architecture

The file and directory organization follows a modular architecture designed to optimize maintainability and extensibility of the NextJS project. This hierarchical structure facilitates separation of concerns and source code navigation.

## Directory Layout

The project tree is organized according to the following nomenclature:

_The rest would contain the details of each directory..._

```bash
.
├── infra
├── src
│   ├── app (NextJS specific)
│   ├── assets
│   ├── components
│   ├── config
│   ├── contexts (or providers)
│   ├── data
│   ├── features
│   ├── hooks (or composables)
│   ├── lib
│   ├── services
│   ├── stores
│   ├── styles
│   ├── test
│   ├── types
│   └── utils
```

### app/

This is a NextJS specific routing folder.

### assets/

Contains all images, icons, css files, font files, etc.

### components/

All reusable components (buttons, cards, etc.).

### hooks/

The composables folder contains all custom hooks.

### config/

Application configuration files.

### contexts/

Contains React Contexts and Providers.

### data/

All data sources.

### features/

Contains all the application features. We want to keep most of the application code inside here. More on this later.

### lib/

Configurations for different third-party libraries that are used in our application.

### services/

Encapsulates main business & application logic.

### stores/

All state management (Zustand).

### styles/

Contains (global) CSS or CSS-in-JS styles.

### test/

The test folder contains all tests that are used in our application.

### types/

For general TypeScript types, enums and interfaces.

### utils/

Utilities for universal logic that is not related to business logic or any technologies, e.g. string manipulations, mathematic calculations, etc.

### layouts/ (Not used in NextJS)

Different layouts for the pages.

### views/ (Not used in NextJS)

Defining entry-point components for pages.
