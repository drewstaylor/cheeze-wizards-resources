const json = require('./allWizards.json');
const Wizards = json.wizards;

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
// Sort Wizards By Power Level
//let wizardsByPowerLevel = Wizards.sort(sortByPowerLevel);
//console.log(wizardsByPowerLevel);

// Sort Wizards by ID
let wizardsById = Wizards.sort(sortByWizardId);
console.log(wizardsById);