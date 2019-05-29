# A fork of Jhipster with support for the USWDS Design library

Steps to build and test locally
--- 
- Install FedHipster as a global module using the steps [https://www.jhipster.tech/][jhipster-url]
    - If installed successfully, you should be able to run `fedhipster --version` from the command lin
- Clone this repository: `git clone https://github.com/OctoConsulting/generator-fedhipster`, change directory to the project root `cd generator-fedhipster`
- Checkout the UWSDS branch `git checkout with-uswds-option`
- Run `npm link`. The fedhipster executable will now use the source code from this project. Any changes made in this repo will immediately be reflected when you run `fedhipster`.
- Create a new folder `mkdir uwsds-app`, `cd uswds-app` and run `fedhipster --skip-server --db --auth=oauth2`
- Choose `Angular` as the framework and `US Wed Design Standard` as the style library.

If everything was install correctly `npm start` should launch the application.

Steps to use the subgenerator ('fedhipster entity foo') with using a local version on FedHipster.
--- 

Fedhipster will try to use the version of generator-fedhipster this is in node_module's even if you follow the steps above.
NPM will download FedHipster to and not use the one we linked to above.

First, update the version of generator-fedhipster in your node_modules so that it uses the global module linked earlier.

```
$npm link generator-fedhipster
```

In cli/fedhipster.js (line 55) from your source code in your local generator-fedhipster, remove the code that search in the node_modules for the subgenerator. Comment out the if
```
            // if (__dirname !== path.dirname(localCLI)) {
                // load local version
                /* eslint-disable import/no-dynamic-require */
                logger.info("Using JHipster version installed locally in current project's node_modules");
                require(localCLI);
                return;
            // }
```


