# Graficos Slim Carousel

> ☣ Warning ☣
>
> The project is still in `prerelease`. The usage of this module isn't recommended until the first official release.

The goal of this library is to create a small reusable package for a carousel (sometimes called "slider" or "slideshow") using the best practices and making it as accessible and responsive as possible.

The project is structured as a monorepo. The actual component is under [packages/g-slim-carousel](packages/g-slim-carousel/README.md).

## Demo

Please, refer to the live docs showing all the possible options: https://g-slim-carousel-storybook.netlify.app/


## Known Issues

- [ ] Direction issue when manually changing slides with the arrows. ([#1](https://github.com/graficos/g-slim-carousel/issues/1))


## ToDo

- [x] Tests
- [ ] More tests
  - Even tho, we've been followed TDD, there are some components that are not fully tested.
- [ ] Purge CSS
- [ ] Fix installation issues
- [ ] Finish docs

## Design decisions

Using:

- **Typescript**, to get static types and automated autocomplete for the library clients.
- **Sass** (SCSS) we have some global styles that can be overwritten for style authoring.
- **Framer Motion** to handle animations consistently across browsers.
- **Yarn**, as the default package manager.
- **lerna** for the multi-package setup. We could have used just `yarn` workspaces, but `lerna` adds more useful commands on top of `yarn`.

## Resources

- Publishing and Installing Private GitHub Packages using Yarn and Lerna: https://viewsource.io/publishing-and-installing-private-github-packages-using-yarn-and-lerna/
