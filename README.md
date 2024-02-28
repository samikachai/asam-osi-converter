# ASAM OSI visualizer extension for Foxglove Studio

## What is this extension about?

The goal is to have a foxglove extension which can visualise data which is following the standards of the [Open Simulation Interface (OSI) by ASAM](https://www.asam.net/standards/detail/osi/) using the native 3D panel of foxglove studio.


## Coding guidelines

The code should follow the coding guidelines of foxglove studio. This includes the usage of typescript, prettier, eslint and the foxglove studio sdk.

## TODO Code

 - [x] Debazelise / extend package.json
 - [x] Enable yarn build & yarn package 
 - [x] Remove BMW specific transforms
 - [x] Remove unused converters (current code contains multiple converters)
 - [x] Move util functions from the common  directory to extension src 
 - [ ] Implement newest commits e.g. traffic sign visualisation
 - [ ] Add missing license files
 - [ ] Apply foxglove's basic prettier/typing/linting rules to existing code base
 - [ ] Adjust tests
 - [ ] Replace example data with data which is allowed to go public

## TODO CI/CD

 - [ ] Run tests/linting
 - [ ] Run build for win/mac/debian


## Roadmap

- Implement traffic lights visualisation

## Sync with BMW's internal ADP repository

For now every change from/to the internal ADP repository is done manually.
This means that the code of `/src` is manually copied.
This is not the final state and will potentially be automated in the future.


## Related confluence page

https://asc.bmwgroup.net/wiki/display/ORIONPRODUCTS/Open+Sourcing+OSI+extension

## Develop

Extension development uses the `yarn` package manager to install development dependencies and run build scripts.

To install extension dependencies, run `yarn` from the root of the extension package.

```sh
yarn install
```

To build and install the extension into your local Foxglove Studio desktop app, run:

```sh
yarn run local-install
```

Open the `Foxglove Studio` desktop (or `ctrl-R` to refresh if it is already open). Your extension is installed and available within the app.

## Package

Extensions are packaged into `.foxe` files. These files contain the metadata (package.json) and the build code for the extension.

Before packaging, make sure to set `name`, `publisher`, `version`, and `description` fields in _package.json_. When ready to distribute the extension, run:

```sh
yarn run package
```

This command will package the extension into a `.foxe` file in the local directory.
