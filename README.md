# SetLife

SetOceans's app boiler plate repo for GraphQL APIs

Libaries used: Express, Bookshelf.js, GraphQL

## Setup

1. Clone the repo `git clone https://github.com/brgarciarivas/setlife`

2. Move into the directory `cd setlife`

3. Install dependencies `npm install` 

##Directory Layout

Get familiar with the **setlife** folder structure

```
|-- /api/                           # Application source code
    |-- /config/                    # Configuration files (database options, keys, constants, etc) 
    |-- /handlers/                  # Handle 3rd party APIs here with request.js
    |-- /models/                    # Database model definitions
    |-- /modules/                   # Holds files with modular functionality
    |-- /types/                     # GraphQL type definitions
    |-- schema.js                   # Root file serving as an index of API endpoints
```

#Usage

1. Run `node server`

2. Go to localhost:3000/api/v/1/graph to explore the GraphiQL API and documentation

##Using the CLI tools

- Run `npm install -g` to enable `setlife` CLI tools
- `setlife create-model <name>` creates a standard model in /api/models
- Add the option `--type` or `-t` to create the associated Bookshelf-GraphQL Type