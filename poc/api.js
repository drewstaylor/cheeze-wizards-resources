'use strict';

// Dependencies
require('dotenv').config({path: __dirname + '/.env'});
require('./wizards');
const request = require('request-promise');

// Environment
const apiToken = process.env.API_TOKEN;
const apiUser = process.env.API_EMAIL;
const apiBaseUrl = process.env.API_URL;
const mainnetTournamentContract = process.env.CONTRACT_MAINNET_TOURNAMENT;
const mainnetWizardsContract = process.env.CONTRACT_MAINNET_WIZARDS;
const imageStorageUrl = process.env.API_IMAGE_STORAGE_URL + mainnetTournamentContract + '/';

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
    //console.log('req. options', options);

    // Make request
    let response;
    await request(options)
        .then((data) => {
            response = data;
        })
        .catch((err) => {
            //console.log('Encountered error', err);
            response = err.response.body;
        });
    
    // Handle response
    response = JSON.parse(response);
    return response;
};


/**
 * API Parsers & Getters
 * 
 * XXX TODO: Make this an exportable module? (atm it can still be require()'d)
 */

/**
 * Loads all Wizards from CW API (Mainnet)
 */
const getAllWizards = async () => {
    let wizardsEndpoint = 'wizards';
    let wizards = await apiQuery(wizardsEndpoint);
    return wizards;
};

/**
 * Gets a particular Wizard by its Wizard ID (Mainnet)
 * @param {Number} id : The ID of the target Wizard
 * @return {Object} : Returns a Wizard object, or returns an Error object if no Wizard with that ID exists
 */
const getWizardById = async (id = null) => {
    // Nothing to do here...
    if (!id) {
        return false;
    }

    let wizardsEndpoint = 'wizards/' + id;
    let wizards = await apiQuery(wizardsEndpoint);
    return wizards;
};

/**
 * Gets a link to a particular Wizard's image (Mainnet)
 * @param {Number} id : The ID of the target Wizard you are requesting an image link for
 * @return {String} image : Returns the string image URL of the wizard
 */
const getWizardImageUrlById = (id = null) => {
    // Nothing to do here...
    if (!id) {
        return false;
    }
    // Set image path
    let imageUrl = imageStorageUrl + id + '.svg';
    return imageUrl;
};

/**
 * Loads all Duels from CW API (Mainnet)
 */
const getAllDuels = async () => {
    let duelsEndpoint = 'duels';
    let duels = await apiQuery(duelsEndpoint);
    return duels;
};

/**
 * Gets a particular Duel by its Duel ID (Mainnet)
 * @param {Number} id : The ID of the target Duel
 * @return {Object} : Returns a Duel object, or returns an Error object if no duel with that ID exists
 */
const getDuelById = async (id = null) => {
    // Nothing to do here...
    if (!id) {
        return false;
    }

    let duelsEndpoint = 'duels/' + id;
    let duels = await apiQuery(duelsEndpoint);
    duels.id = id;
    return duels;
};

/**
 * Gets all Duels for a particular Wizard by Wizard ID (Mainnet)
 * @param {Number} id : The ID of the target Wizard to query for Duel data
 * @return {Object} : Returns a Duel object, or returns an Error object if no duel with that Wizard ID exists
 */
const getDuelsByWizardId = async (id = null) => {
    // Nothing to do here...
    if (!id) {
        return false;
    }

    let duelsEndpoint = 'duels/?wizardIds=' + id;
    let duels = await apiQuery(duelsEndpoint);
    duels.wizards = [id];
    return duels;
};

/**
 * Gets all Duels 2 Wizards by their Wizard IDs (Mainnet)
 * @param {Number} wizard_A : The ID of the target Wizard to query for Duel data
 * @param {Number} wizard_B : The ID of the second target Wizard to query for Duel data
 * @return {Object} : Returns a Duel object, or returns an Error object if no duel with that Wizard ID exists
 */
const getDuelsBetweenWizards = async (wizard_A = null, wizard_B = null) => {
    // Nothing to do here...
    if (!wizard_A || !wizard_B) {
        return false;
    }

    let duelsEndpoint = 'duels/?wizardIds=' + wizard_A + ',' + wizard_B;
    let duels = await apiQuery(duelsEndpoint);
    duels.wizards = [wizard_A, wizard_B];
    return duels;
};

// Tests
let construct = async () => {
    // Load all of the summoned Wizards
    //let allWizards = await getAllWizards();
    //console.log('Wizards =>', allWizards);

    // Load a particular Wizard
    let wizard = 1614;
    let drewsWizard = await getWizardById(wizard);
    // Add the wizard's image url
    let drewsWizardImage = getWizardImageUrlById(wizard);
    drewsWizard.image = drewsWizardImage;
    console.log('Wizard =>', drewsWizard);

    // Load all duels
    let allDuels = await getAllDuels();
    console.log('Duels =>', allDuels);

    // Load a particular Duel by its ID
    let duel = 1;
    let hypotheticalDuel = await getDuelById(duel);
    console.log('Duel =>', hypotheticalDuel);

    // Load all Duels for a particular Wizard
    let drewsWizardDuels = await getDuelsByWizardId(wizard);
    console.log('Wizard #' + wizard + ' Duels =>', drewsWizardDuels);

    // Load Duel history of matches between 2 particular Wizards
    let wizard2 = 1;
    let duelsBetweenWizards = await getDuelsBetweenWizards(wizard, wizard2);
    console.log('Duels between Wizard #' + wizard + ' and Wizard #1' + ' =>', duelsBetweenWizards);
};

construct();