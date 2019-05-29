/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');

module.exports = {
    askForModuleName,
    askForClient,
    askForStyleLibrary,
    askFori18n,
    askForClientTheme,
    askForClientThemeVariant,
};

function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

function askForClient(meta) {
    if (!meta && this.existingProject) return;

    const applicationType = this.applicationType;

    const choices = [
        {
            value: 'angularX',
            name: 'Angular'
        },
        {
            value: 'react',
            name: 'React'
        }
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientFramework',
        when: response => applicationType !== 'microservice' && applicationType !== 'uaa',
        message: `Which ${chalk.yellow('*Framework*')} would you like to use for the client?`,
        choices,
        default: 'angularX'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientFramework = prompt.clientFramework;
        done();
    });
}

function askForStyleLibrary(meta) {
    if (!meta && this.existingProject) return;

    const choices = [
        {
            value: 'uswds',
            name: 'US Web Design System'
        },
        {
            value: 'bootstrap',
            name: 'Bootstrap'
        },
        {
            value: 'octo',
            name: 'Octo Consulting'
        }
    ];

    const PROMPT = {
        type: 'list',
        name: 'styleLibrary',
        when: response => this.clientFramework === 'angularX',
        message: 'How would you like to style your html?',
        choices,
        default: 'uswds'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.styleLibrary = prompt.styleLibrary;
        if (this.styleLibrary === 'uswds') {
            this.clientTheme = 'none';
        }
        done();
    });
}

function askFori18n() {
    if (this.existingProject || this.configOptions.skipI18nQuestion) return;

    this.aski18n(this);
}

function askForClientTheme(meta) {
    if (!meta && this.existingProject) {
        return;
    }

    const applicationType = this.applicationType;
    const styleLibrary = this.styleLibrary;
    const done = this.async();
    const defaultChoices = [
        {
            value: 'none',
            name: 'Default JHipster'
        },
        { value: 'cerulean', name: 'Cerulean' },
        { value: 'cosmo', name: 'Cosmo' },
        { value: 'cerulean', name: 'Cyborg' },
        { value: 'darkly', name: 'Darkly' },
        { value: 'flatly', name: 'Flatly' },
        { value: 'journal', name: 'Journal' },
        { value: 'litera', name: 'Litera' },
        { value: 'lumen', name: 'Lumen' },
        { value: 'lux', name: 'Lux' },
        { value: 'materia', name: 'Materia' },
        { value: 'minty', name: 'Minty' },
        { value: 'pulse', name: 'Pulse' },
        { value: 'sandstone', name: 'Sandstone' },
        { value: 'simplex', name: 'Simplex' },
        { value: 'sketchy', name: 'Sketchy' },
        { value: 'slate', name: 'Slate' },
        { value: 'solar', name: 'Solar' },
        { value: 'spacelab', name: 'Spacelab' },
        { value: 'superhero', name: 'Superhero' },
        { value: 'united', name: 'United' },
        { value: 'yeti', name: 'Yeti' }
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientTheme',
        when: () => applicationType !== 'microservice' && applicationType !== 'uaa' && styleLibrary === 'bootstrap',
        message: 'Would you like to use a Bootswatch theme (https://bootswatch.com/)?',
        choices: defaultChoices,
        default: 'none'
    };

    this.httpsGet(
        'https://bootswatch.com/api/4.json',
        // eslint-disable-next-line consistent-return
        body => {
            try {
                const { themes } = JSON.parse(body);

                PROMPT.choices = [
                    {
                        value: 'none',
                        name: 'Default JHipster'
                    },
                    ...themes.map(theme => ({
                        value: theme.name.toLowerCase(),
                        name: theme.name
                    }))
                ];

                if (meta) return PROMPT; // eslint-disable-line consistent-return
                promptQuestion(PROMPT, done, this);
            } catch (err) {
                this.warning('Could not fetch bootswatch themes from API. Using default ones.');
                promptQuestion(PROMPT, done, this);
            }
        },
        () => {
            this.warning('Could not fetch bootswatch themes from API. Using default ones.');
            promptQuestion(PROMPT, done, this);
        }
    );
}

function promptQuestion(PROMPT, done, generator) {
    generator.prompt(PROMPT).then(prompt => {
        generator.clientTheme = prompt.clientTheme;
        done();
    });
}

function askForClientThemeVariant(meta) {
    if (!meta && this.existingProject) {
        return;
    }
    if (this.clientTheme === 'none') {
        this.clientThemeVariant = '';
        return;
    }

    const applicationType = this.applicationType;
    const styleLibrary = this.styleLibrary;

    const choices = [{ value: 'primary', name: 'Primary' }, { value: 'dark', name: 'Dark' }, { value: 'light', name: 'Light' }];

    const PROMPT = {
        type: 'list',
        name: 'clientThemeVariant',
        when: () => applicationType !== 'microservice' && applicationType !== 'uaa' && styleLibrary === 'bootstrap',
        message: 'Choose a Bootswatch variant navbar theme (https://bootswatch.com/)?',
        choices,
        default: 'primary'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientThemeVariant = prompt.clientThemeVariant;
        done();
    });
}
