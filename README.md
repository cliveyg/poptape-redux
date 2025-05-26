# Poptape Redux

This repo is a re-write of the [poptape-main](https://github.com/cliveyg/poptape-main) react repo as it descended into dependency hell after neglect. This repo is rewriting all the class components to functional components wherever possible.

## History

The original app/repo was written using create-react-app many years ago and between that app no longer being actively maintained and the some of the npm modules being deprecated meant that after trying to update various npm packages the app ceased to function.

As a result I have decided to rewrite the app using Vite as the dev/build environment and rewriting as many components as possible as functional components. 

The plan has also included having this app be mobile first in it's presentation whereas the original app was primarily designed to be computer based. I have also included multi language support. I hope to reproduce the original functionality before adding new features etc.

## Progress

Very early pre-alpha state

## Run

`npm run dev`