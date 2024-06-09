const autoComplete = {

    name: "search adresse",
    results: [],
    options: [],
    searchElement: "",

    init: () => console.log(`${autoComplete.name} initialisé`),

    initSearchElement: (id) => {
        const searchElement = document.getElementById(id);
        autoComplete.searchElement = searchElement.getAttribute("id");
        return searchElement;
    },

    setQuery: (inputElement) => new URLSearchParams(inputElement.value),
    
    setAdressSearchOptions: (results) => autoComplete.options = results.map(result => result.properties.label),

    getOptions: () => autoComplete.options,

    getSelectedOption: (selectedChoice) => autoComplete.results.find(result => result.label === selectedChoice),

    resetOptions: () => autoComplete.options = [],

    resetResults: () => autoComplete.results = [],

    displayNoResults: (element) => element.innerText = "Pas de résultats",

    displayResultsCount: (element, text) => element.innerText = text,

    setAdresseSearchResults: (results) => {

        autoComplete.results = results.map(result => {
            const contextParts = result.properties.context.split(", ");
            return {
                value: result.properties, // toutes les valeurs
                label: result.properties.label, // le label pour la liste de choix
                adresse: result.properties.name,
                ville: result.properties.city,
                codePostal: result.properties.postcode,
                codeVille: result.properties.citycode,
                numDepartement: contextParts[0].trim(),
                nomDepartement: contextParts[1].trim(),
                region: contextParts[2].trim(),
                pays: "FR",
                lat: result.geometry.coordinates[1],
                lon: result.geometry.coordinates[0],
            };
        });

        autoComplete.displayResultsCount(document.getElementById('info'), autoComplete.results.length + " résultats");
    },

    initializeAutocomplete: async () => {

        $(`#${autoComplete.searchElement}`).autocomplete({
            source: autoComplete.getOptions(),
            minLength: 5,
            select: function(event, ui) {
                const result = autoComplete.getSelectedOption(ui.item.value);
                if (result) {
                    console.log(result.value);
                    autoComplete.resetOptions();
                    autoComplete.resetResults();
                }
            },
        });
    },
}

document.addEventListener('DOMContentLoaded', () => autoComplete.init(), false);

export default autoComplete;
