const json = require('./allWizards.json');

let wizards = json.wizards;

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

// Sort Wizards By Power Level
let wizardsByPowerLevel = wizards.sort(sortByPowerLevel);
//console.log(wizardsByPowerLevel);