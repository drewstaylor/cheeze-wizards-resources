'use strict';

// Navigation states
const HOME_STATE = -1;
const VIEW_ALL_WIZARDS = 0;
const VIEW_SELECTED_WIZARD = 1;
const PREDICT_MATCHES = 2;

// Wizards sorting states
const SORTED_BY_POWER_LEVEL_STRONGEST = 0;
const SORTED_BY_POWER_LEVEL_WEAKEST = 1;
const SORTED_BY_POWER_LEVEL_GROWTH_STRONGEST = 2;
const SORTED_BY_POWER_LEVEL_GROWTH_WEAKEST = 3;
const SORTED_BY_AFFINITY_GROUPINGS = 4;

let vm = new Vue({
    el: '#cheese-of-insight',
    data: () => ({
        VIEW_ALL_WIZARDS: VIEW_ALL_WIZARDS,
        VIEW_SELECTED_WIZARD: VIEW_SELECTED_WIZARD,
        PREDICT_MATCHES: PREDICT_MATCHES,
        HOME_STATE: HOME_STATE,
        api: require('./api'),
        wizardUtils: require('./wizards'),
        navigation: {
            state: HOME_STATE
        },
        isLoading: false,
        currentWizardsPage: 1,
        wizardsPageSize: 10,
        totalWizardsPages: null,
        wizards: null,
        wizardsSortedBy: null,
        currentWizard: null,
        currentOpposingWizard: null
    }),
    mounted: async function () {
        //console.log('api', this.api);
    },
    methods: {
        setNavigation: function (state = null) {
            switch(state) {
                // Show all Wizards
                case VIEW_ALL_WIZARDS:
                    console.log('Wizards browsing mode enabled');
                    this.navigation.state = VIEW_ALL_WIZARDS;
                    this.getAllWizards();                    
                    break;
                case VIEW_SELECTED_WIZARD:
                    this.navigation.state = VIEW_SELECTED_WIZARD;
                    break;
                // Show match prediction
                case PREDICT_MATCHES:
                    console.log('Match prediction mode enabled');
                    this.navigation.state = PREDICT_MATCHES;
                    break;
                default:
                    return;
            }
        },
        // Helpers / Utils.
        setWizardsSorting: function () {
            // TODO : Set user selected sorting type
        },
        // Getters
        getAllWizards: async function () {
            // Loading state
            this.isLoading = true;

            // Get Wizards
            let wizardsQuery = await this.api.getAllWizards();
            this.wizards = wizardsQuery.wizards.sort(this.wizardUtils.sortByPowerLevel);

            // Sort Wizards
            this.wizardsSortedBy = SORTED_BY_POWER_LEVEL_STRONGEST;

            // Get pagination args.
            this.totalWizardsPages = Math.floor(this.wizards.length / this.wizardsPageSize);
            
            /*if (this.wizards.length % this.wizardsPageSize !== 0) {
                ++this.totalWizardsPages;
            }*/

            // Disable loading
            this.isLoading = false;
            console.log('Wizards =>', this.wizards);
        },
        showWizard: async function (wizardId = null) {
            if (wizardId == null) {
                return;
            } else {
                wizardId = parseInt(wizardId);
                this.setNavigation(VIEW_SELECTED_WIZARD);
                this.isLoading = true;
            }
            // Load Wizard
            this.currentWizard = await this.api.getWizardById(wizardId);

            // Add the wizard's image url
            this.currentWizard.image = this.api.getWizardImageUrlById(wizardId);
            this.currentWizard = this.wizardUtils.getWizardMetadata(this.currentWizard);
            
            // Disable loading
            this.isLoading = false;
            console.log('Current Wizard =>', this.currentWizard);
        },
        // Paging
        nextWizardsPage: function () {
            // Handle next page as required
            if (this.currentWizardsPage < this.totalWizardsPages) {
                ++this.currentWizardsPage;
            }
        },
        previousWizardsPage: function () {
            // Handle previous page as required
            if (this.currentWizardsPage > 1) {
                --this.currentWizardsPage;
            }
        }
    },
    computed: {
        wizardsPage: function () {
            if (this.wizards && this.currentWizardsPage) {
                let pageStart = this.wizardsPageSize * this.currentWizardsPage;
                return this.wizards.slice(pageStart, pageStart + this.wizardsPageSize);
            } else {
                return [];
            }
        }
    }
});