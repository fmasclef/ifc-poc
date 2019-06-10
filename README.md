# Inter Frames Communication

A proof-of-concept by fmasclef

This POC deals with a React app running in two instances of the same browser. It shows how this two apps can sync together.

## The concept

![core concept][concept]

[concept]: ./docs/concept.svg "IFW concept"

## Sample app

A Flux based app is provided in the `flux` folder.

    cd flux
    npm i
    npm run app

Now use your favorite browser twice and head to `http://localhost:8080`