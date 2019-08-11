'use strict';

// Dependencies
require('dotenv').config({path: __dirname + '/.env'});
const request = require('request-promise');
const Wizards = require('./wizards');

// Environment
const apiToken = process.env.API_TOKEN;
const apiUser = process.env.API_EMAIL;
const apiBaseUrl = process.env.API_URL;

// Utility Functions
const apiQuery = async (endpoint = null, method = 'GET', scheme = 'https://') => {

    // Nothing to do here...    
    if (!endpoint) {
        return false;
    }

    // Request options
    let options = {
        method: method,
        uri: scheme + apiBaseUrl + '/' + endpoint,
        // Headers
        headers: {
            'Content-Type': 'application/json',
            'x-api-token': apiToken,
            'x-email': apiUser
        }
    };

    // Debug request options
    console.log('req. options', options);

    // Make request
    let response;
    await request(options)
        .then((data) => {
            response = data;
        })
        .catch((err) => {
            console.log('Encountered error', err);
            response = err;
        });
    
    // Handle response
    return response;
};


// Parsers & Getters
/**
 * Loads all Wizards from CW API (Mainnet)
 */
const getAllWizards = async () => {
    let wizardsEndpoint = 'wizards';
    let wizards = await apiQuery(wizardsEndpoint);
    return wizards;
};

/**
 * Gets a link to a particular Wizard's image (Mainnet)
 * @param {Number} id: The ID of the target Wizard you are requesting an image link for
 * @return {Mixed} image: Returns the string image URL of the wizard or boolean `FALSE` if no Wizard, or no Image link exists
 */
const getWizardImageById = async (id = null) => {
    if (!id) {
        return false;
    }
};


// Implementations
let construct = async () => {
    let allWizards = await getAllWizards();
    console.log('Wizards =>', allWizards);
};

construct();