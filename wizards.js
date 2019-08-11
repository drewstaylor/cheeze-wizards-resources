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
    a.specialPower = affinities[a.affinity];
    return comparison;
};

// Sort Wizards by Power Level
//let wizardsByPowerLevel = Wizards.sort(sortByPowerLevel);
//console.log(wizardsByPowerLevel);

// Sort Wizards by ID
//let wizardsById = Wizards.sort(sortByWizardId);
//console.log(wizardsById);

// Group Wizards by Affinty Type
let wizardsByAffinity = Wizards.sort(groupWizardsByAffinity);
console.log(wizardsByAffinity);