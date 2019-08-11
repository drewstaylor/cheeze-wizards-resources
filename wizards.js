const json = require('./allWizards.json');
const Wizards = json.wizards;

/***
 * Affinities Mapping:
 * 0 = NOTSET, 
 * 1 = NEUTRAL, 
 * 2 = FIRE, 
 * 3 = WIND, 
 * 4 = WATER
 */
const affinities = [
    'Unknown',
    'Neutral',
    'Fire',
    'Wind',
    'Water'
];

const UKNOWN = affinities[0];
const NEUTRAL = affinities[1];
const FIRE = affinities[2];
const WIND = affinities[3];
const WATER = affinities[4];

/**
 * Get the vulnerability of a given affinity
 * @param {Number} affinity: the affinity input used to generate the vulnerability response
 * @return {Enum} affinities[i]
 */
const getVulnerability = function (affinity) {
    switch(affinities[affinity]) {
        // Fire < Water
        case FIRE:
            return affinities[4];
        // Wind < Fire
        case WIND:
            return affinities[2];
        // Water < Wind
        case WATER:
            return affinities[3];
        // Unknown input => Unknown output
        // Will apply to enum types
        // 'Neutral' and 'Unknown'
        default:
            return affinities[0];
    }
};

/**
 * Get the optimal opponent of a given affinity
 * @param {Number} affinity: the affinity input used to generate the vulnerability response
 * @return {Enum} affinities[i]
 */
const getOptimalOponnent = function (affinity) {
    switch(affinities[affinity]) {
        // Fire > Wind
        case FIRE:
            return affinities[3];
        // Wind > Water
        case WIND:
            return affinities[4];
        // Water > Fire
        case WATER:
            return affinities[2];
        // Unknown input => Unknown output
        // Will apply to enum types
        // 'Neutral' and 'Unknown'
        default:
            return affinities[0];
    }
};

/**
 * Sort the Wizards array by Wizard power level
 * @param {Number} a 
 * @param {Number} b 
 */
const sortByPowerLevel = function (a, b) {
    let powerLevelA = Number(a.power);
    let powerLevelB = Number(b.power);
    let comparison = 0;
    // Compare
    if (powerLevelA > powerLevelB) {
        comparison = 1;
    } else if (powerLevelA < powerLevelB) {
        comparison = -1;
    }
    return comparison;
};

/**
 * Sort the Wizards array by Wizard unique ID
 * @param {Number} a 
 * @param {Number} b 
 */
const sortByWizardId = function (a, b) {
    let wizardIdA = Number(a.id);
    let wizardIdB = Number(b.id);
    let comparison = 0;
    // Compare
    if (wizardIdA > wizardIdB) {
        comparison = 1;
    } else if (wizardIdA < wizardIdB) {
        comparison = -1;
    }
    return comparison;
};

/**
 * Group the Wizards by their Affinity type and add helper props: 
 * `a.specialPower`, `a.vulnerablity`, `a.optimalOpponent`
 * 
 * e.g.:
 * 
 * { 
 *   id: '4251',
 *   owner: '0xC4347246c9469ca4d740Cd2927d38b5EaB354df8',
 *   affinity: 4,
 *   initialPower: '842504048959613',
 *   power: '842504048959613',
 *   eliminatedBlockNumber: null,
 *   createdBlockNumber: 7801214,
 *   specialPower: 'Water',
 *   vulnerability: 'Wind',
 *   optimalOpponent: 'Fire' 
 * }
 * 
 * @param {Number} a 
 * @param {Number} b 
 */
const groupWizardsByAffinity = function (a, b) {
    let wizardAffinityA = Number(a.affinity);
    let wizardAffinityB = Number(b.affinity);
    let comparison = 0;
    // Compare
    if (wizardAffinityA > wizardAffinityB) {
        comparison = 1;
    } else if (wizardAffinityA < wizardAffinityB) {
        comparison = -1;
    }
    // Affinity (Text)
    a.specialPower = affinities[a.affinity];
    // Vulnerability (Text)
    a.vulnerability = getVulnerability(a.affinity);
    // Powerful Against (Text)
    a.optimalOpponent = getOptimalOponnent(a.affinity);
    // Return
    return comparison;
};

// Sort Wizards by Power Level
let wizardsByPowerLevel = Wizards.sort(sortByPowerLevel);
//console.log(wizardsByPowerLevel);

// Sort Wizards by ID
let wizardsById = Wizards.sort(sortByWizardId);
//console.log(wizardsById);

// Group Wizards by Affinty Type
let wizardsByAffinity = Wizards.sort(groupWizardsByAffinity);
//console.log(wizardsByAffinity);
//console.log(wizardsByAffinity.reverse());