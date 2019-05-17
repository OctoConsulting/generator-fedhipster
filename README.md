#Jhipster NOW! with UWSDS

Steps to build
- Install JHipster as a global module using the steps [https://www.jhipster.tech/][jhipster-url]
    - If Installed successful you should be able to run `jhipster --version` from the command
- Clone this repository: `https://github.com/OctoConsulting/generator-jhipster`, change directory to the project root `cd generator-jhipster`
- Checkout the UWSDS branch `git checkout with-uswds-option`
- Run `npm link`. The jhipster executable will no use the source code from this project. Any changes made in this repo will immediately be reflected when you run `jhipster`.
- Create a new folder `mkdir uwsds-app`, `cd uswds-app` and run `jhipster`
- Choose `Angular` as the framework and `US Wed Design Standard` as the style library.
- At this point, `npm start` will fail to run because we need to manually override one of the npm dependencies: ng-jhipster
- To update ng-jhipster, clone the branch from the octo repo: `git clone https://github.com/OctoConsulting/ng-jhipster`
- Build and package ng-jhipster (See the instructions in the ng-jhipster README for more help). `npm install`, `npm run build`, `cd dist`, `npm pack`
- Install ng-jhipster into the project you generated (e.g. uwsds-app). `cd ..`, `cd uswds`, `npm install ../ng-jhipster/dist/ng-jhipster-0.9.3.tgz`


If everything was install correctly `npm start` should launch the application.
