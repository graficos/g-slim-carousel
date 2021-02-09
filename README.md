# Graficos Slim Carousel

The goal of this library is to create a small reusable package for a carousel (sometimes called "slider") using best practices and making it as accessible and responsive as possible.

## Design decisions

We're using:

- **Typescript**, to get static types and automated autocomplete for the library clients.
- **Yarn**, as the default package manager
- **lerna** for the multi-package setup. We could have used just `yarn` workspaces, but `lerna` adds more useful commands on top of `yarn`.
