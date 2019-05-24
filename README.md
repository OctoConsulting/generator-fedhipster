#Jhipster NOW! with UWSDS

Steps to build
--- 
- Install JHipster as a global module using the steps [https://www.jhipster.tech/][jhipster-url]
    - If installed successfully, you should be able to run `jhipster --version` from the command lin
- Clone this repository: `git clone https://github.com/OctoConsulting/generator-jhipster`, change directory to the project root `cd generator-jhipster`
- Checkout the UWSDS branch `git checkout with-uswds-option`
- Run `npm link`. The jhipster executable will now use the source code from this project. Any changes made in this repo will immediately be reflected when you run `jhipster`.
- Create a new folder `mkdir uwsds-app`, `cd uswds-app` and run `jhipster --skip-server --db --auth=oauth2`
- Choose `Angular` as the framework and `US Wed Design Standard` as the style library.
- At this point, `npm start` will fail to run because we need to manually override one of the npm dependencies: ng-jhipster
- To update ng-jhipster, clone the branch from the octo repo: `git clone https://github.com/OctoConsulting/ng-jhipster`
- Build and package ng-jhipster (See the instructions in the ng-jhipster README for more help). `npm install`, `npm run build`, `cd dist`, `npm pack`
- Install ng-jhipster into the project you generated (e.g. uwsds-app). `cd ..`, `cd uswdsapp`, `npm install ../ng-jhipster/dist/ng-jhipster-0.9.3.tgz`

If everything was install correctly `npm start` should launch the application.

Steps to use the subgenerator (jhipster entity foo) with using a local version on JHipster.
--- 

JHipster will try to use the version of generator-jhipster this is in node_module's even if you follow the steps above.
NPM will download JHipster to and not use the one we linked to above.

First, update the version of generator-jhipster in your node_modules so that it uses the global module linked earlier.

```
$npm link generator-jhipster
```

In cli/jhipster.js (line 55) from your source code in your local generator-jhipster, remove the code that search in the node_modules for the subgenerator. Comment out the if
```
            // if (__dirname !== path.dirname(localCLI)) {
                // load local version
                /* eslint-disable import/no-dynamic-require */
                logger.info("Using JHipster version installed locally in current project's node_modules");
                require(localCLI);
                return;
            // }
```


