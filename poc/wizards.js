// Wizards
const json = require('./json/allWizards.json');
const Wizards = json.wizards;

// Drew's wizard:
// https://opensea.io/assets/0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e/1614

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
    if (powerLevelA < powerLevelB) {
        comparison = 1;
    } else if (powerLevelA > powerLevelB) {
        comparison = -1;
    }
    return comparison;
};

/**
 * Sort the Wizards array by Wizard power level growth
 * e.g. Wizards that have accummulated the highest power gains througout the tournament duration
 * @param {Number} a 
 * @param {Number} b 
 */
const sortByPowerLevelGrowth = function (a, b) {
    // Initialization params
    let initialPowerLevelA = Number(a.initialPower);
    let powerLevelA = Number(a.power);
    let initialPowerLevelB = Number(b.initialPower);
    let powerLevelB = Number(b.power);
    // Get growth rates
    let growthMarginA = powerLevelA - initialPowerLevelA;
    let growthMarginB = powerLevelB - initialPowerLevelB;
    // Set growth rate on sorted el.
    a.powerGrowth = growthMarginA;
    // Compare
    let comparison = 0;
    if (growthMarginA > growthMarginB) {
        comparison = 1;
    } else if (growthMarginA < growthMarginB) {
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

/**
 * ROUTINES - Uncomment any routing and debug log to run
 */

// Sort Wizards by Power Level (strongest first)
//let strongestWizards = Wizards.sort(sortByPowerLevel);
//console.log(strongestWizards);

// Sort Wizards by Power Level (weakest first)
//let weakestWizards = strongestWizards.reverse();
//console.log(weakestWizards);

// Sort Wizards by ID
//let wizardsById = Wizards.sort(sortByWizardId);
//console.log(wizardsById);

// Group Wizards by Affinty Type
//let wizardsByAffinity = Wizards.sort(groupWizardsByAffinity);
//console.log(wizardsByAffinity);
//console.log(wizardsByAffinity.reverse());

// Sort Wizards by biggest power gains (ascending power levels)
//let wizardsByGrowth = Wizards.sort(sortByPowerLevelGrowth);
//console.log(wizardsByGrowth)

// Sort Wizards by weakest power gains (diminishing power levels)
//let wizardsByDiminishingGrowth = wizardsByGrowth.reverse();
//console.log(wizardsByDiminishingGrowth);