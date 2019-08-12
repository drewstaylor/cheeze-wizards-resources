'use strict';

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
const getOptimalOponent = function (affinity) {
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
    a.optimalOpponent = getOptimalOponent(a.affinity);
    // Return
    return comparison;
};

/**
 * Takes 2 Wizards as inputs, returns the stronger Wizard or false if equal power
 * @param {Object} a : Array containing the power level and ID of the first wizard
 * @param {Number} b : Array containing the power level and ID of the second wizard
 * @return {Mixed} `Wizard | Boolean` : Returns the Wizard `{Object}` of the stronger wizard, or `false` if both Wizards are equally powerful
 */
const compareWizardPowerLevels = function (a, b) {
    let failed = false;
    if (!a || !b) {
        return failed;
    }
    
    if (a.power && b.power) {
        let powerA = parseInt(a.power);
        let powerB = parseInt(b.power);
        let prediction;

        // Predict
        if (powerA == powerB) {
            return failed;
        } else if (powerA > powerB && powerB < powerA) {
            return a;
        } else if (powerB > powerA && powerA < powerB) {
            return b;
        } else {
            return failed;
        }

    } else {
        return failed;
    }
}

/**
 * Takes 2 Wizards as inputs, returns the better suited Wizard or false if equivalent affinities
 * @param {Object} a : Array containing the power level and ID of the first wizard
 * @param {Number} b : Array containing the power level and ID of the second wizard
 * @return {Mixed} `Wizard | Boolean` : Returns the Wizard `{Object}` of the better suited wizard, or `false` if both Wizards are equally suited or neutral
 */
const compareWizardAffinities = function (a, b) {
    let failed = false;
    if (!a || !b) {
        return failed;
    }

    if (a.affinity && b.affinity) {

        // If either Wizard is neutral, no data is available for which Wizard is better suited
        if (affinities[a.affinity] == NEUTRAL || affinities[b.affinity == NEUTRAL]) {
            return failed;
        }

        let firstWizardOptimalOponent = getOptimalOponent(a.affinity);
        let secondWizardOptimalOponent = getOptimalOponent(b.affinity);
        // Compare 
        // 1) Clear Winner Wizard A
        if (firstWizardOptimalOponent == affinities[b.affinity]) {
            return a;
        // 2) Clear Winner Wizard B
        } else if (secondWizardOptimalOponent == affinities[a.affinity]) {
            return b;
        // 3) No clear winner
        } else {
            return failed;
        }
    } else {
        return failed;
    }
}

/**
 * Compares 2 wizard objects based on Affinity and Power Level
 * 
 * Example return:
 * 
 *  { 
 *      id: '1614',
 *      owner: '0x023c74b67dfcf4c20875a079e59873d8bbe42449',
 *      affinity: 2,
 *      initialPower: '100973404296275',
 *      power: '100973404296275',
 *      eliminatedBlockNumber: null,
 *      createdBlockNumber: 7780479,
 *      image: 'https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/1614.svg' 
 *  }
 * 
 * 
 * 
 * @param {Object} a 
 * @param {Object} b 
 * @return {Mixed} `Prediction | Boolean` : Returns the Wizard `{Object}` of the predicted winner, or Boolean `false`
 * if no winner can be predicted, or an Array`{Object}` containing both Wizards when affinity and power level comparisons differ
 */
const predictWinner = function (a, b) {
    let failed = false;
    if (!a || !b) {
        return failed;
    } else if (!a.affinity || !b.affinity) {
        return failed;
    } else if (!a.power || !b.power) {
        return failed;
    }

    // Debug Prediction:
    //console.log([a,b]);

    // Generate Models
    let higherPoweredWizard = compareWizardPowerLevels(a, b);
    let betterSuitedWizard = compareWizardAffinities(a, b);

    // Compare Models
    // 1) No useable results
    if (!higherPoweredWizard && !betterSuitedWizard) {
        return failed;
    } 
    // 2) Clear winner
    else if (higherPoweredWizard == betterSuitedWizard) {
        return higherPoweredWizard;
    }
    // 3) Mixed results
    else {
        return [{higherPoweredWizard: higherPoweredWizard}, {betterSuitedWizard: betterSuitedWizard}];
    }
}

/**
 * ROUTINES - Uncomment to debug
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

// Compare 2 Wizards and predict their match outcome
//let wizardA = Wizards[343];
//let wizardB = Wizards[344];
//let matchPrediction = predictWinner(wizardA, wizardB);
//console.log('Match prediction =>', matchPrediction);