class GUI {
    constructor() {
       this.createSelectMenus();
    }

    createSelectMenus() {
        function addLineBreak() {
            let lineBreakElement = document.createElement("br");
            let menuContainer = document.getElementById("menu-container");
            menuContainer.appendChild(lineBreakElement);
        }

        // TODO: Refactor these helper functions
        function createEnvironmentMapSelectList(options) {
            // create environment select element and label
            let environmentMapSelectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let environmentMapSelectElement = document.createElement("select");

            environmentMapSelectElement.name = "map";
            environmentMapSelectElement.id = "map-select";
            environmentMapSelectElementLabel.innerHTML = "Environment Map:";
            environmentMapSelectElementLabel.htmlFor = "map-select";
            menuContainer.appendChild(environmentMapSelectElementLabel);
            menuContainer.appendChild(environmentMapSelectElement);

            // add options to the select element
            for (let option of options) {
                let environmentMapSelectOption = document.createElement("option");
                environmentMapSelectOption.value = option;
                environmentMapSelectOption.text = option;
                environmentMapSelectElement.appendChild(environmentMapSelectOption);
            }

            // add line break to end of select menu
            addLineBreak();
        }

        function createSearchAlgorithmSelectList(options) {
            // create environment select element and label
            let searchAlgorithmSelectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let searchAlgorithmSelectElement = document.createElement("select");

            searchAlgorithmSelectElement.name = "searchAlgorirhm";
            searchAlgorithmSelectElement.id = "search-algorithm-select";
            searchAlgorithmSelectElementLabel.innerHTML = "Search Algorithm:";
            searchAlgorithmSelectElementLabel.htmlFor = "search-algorithm-select";
            menuContainer.appendChild(searchAlgorithmSelectElementLabel);
            menuContainer.appendChild(searchAlgorithmSelectElement);

            // add options to the select element
            for (let option of options) {
                let searchAlgorithmSelectOption = document.createElement("option");
                searchAlgorithmSelectOption.value = option;
                searchAlgorithmSelectOption.text = option;
                searchAlgorithmSelectElement.appendChild(searchAlgorithmSelectOption);
            }

            // add line break to end of select menu
            addLineBreak();
        }

        function createGridCellSizeSelectList(options) {
            // create environment select element and label
            let gridCellSizeSelectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let gridCellSizeSelectElement = document.createElement("select");

            gridCellSizeSelectElement.name = "gridCellSize";
            gridCellSizeSelectElement.id = "grid-cell-size-select";
            gridCellSizeSelectElementLabel.innerHTML = "Grid Cell Size:";
            gridCellSizeSelectElementLabel.htmlFor = "grid-cell-size-select";
            menuContainer.appendChild(gridCellSizeSelectElementLabel);
            menuContainer.appendChild(gridCellSizeSelectElement);

            // add options to the select element
            for (let option of options) {
                let gridCellSizeSelectOption = document.createElement("option");
                gridCellSizeSelectOption.value = option;
                gridCellSizeSelectOption.text = option;
                gridCellSizeSelectElement.appendChild(gridCellSizeSelectOption);
            }

            // add line break to end of select menu
            addLineBreak();
 
        }

        function createLegalActionsSelectList(options) {
            // create environment select element and label
            let legalActionsSelectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let legalActionsSelectElement = document.createElement("select");

            legalActionsSelectElement.name = "legalActions";
            legalActionsSelectElement.id = "legal-actions-select";
            legalActionsSelectElementLabel.innerHTML = "Legal Actions:";
            legalActionsSelectElementLabel.htmlFor = "legal-actions-select";
            menuContainer.appendChild(legalActionsSelectElementLabel);
            menuContainer.appendChild(legalActionsSelectElement);

            // add options to the select element
            for (let option of options) {
                let legalActionsSelectOption = document.createElement("option");
                legalActionsSelectOption.value = option;
                legalActionsSelectOption.text = option;
                legalActionsSelectElement.appendChild(legalActionsSelectOption);
            }

            // add line break to end of select menu
            addLineBreak();
 
        }

        function createVisualisationSelectList(options) {
            // create environment select element and label
            let visualisationSelectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let visualisationSelectElement = document.createElement("select");

            visualisationSelectElement.name = "visualisation";
            visualisationSelectElement.id = "visualisation-select";
            visualisationSelectElementLabel.innerHTML = "Visualisation:";
            visualisationSelectElementLabel.htmlFor = "visualisation-select";
            menuContainer.appendChild(visualisationSelectElementLabel);
            menuContainer.appendChild(visualisationSelectElement);

            // add options to the select element
            for (let option of options) {
                let visualisationSelectOption = document.createElement("option");
                visualisationSelectOption.value = option;
                visualisationSelectOption.text = option;
                visualisationSelectElement.appendChild(visualisationSelectOption);
            }

            // add line break to end of select menu
            addLineBreak();
 
        }

        createEnvironmentMapSelectList(["Default (20 x 24)", "Big (100 X 100)"]);
        createSearchAlgorithmSelectList(["BFS", "DFS"]);
        createGridCellSizeSelectList(["Default (20 x 20)"]);
        createLegalActionsSelectList(["4 Cardinal (Up, Down, Left, Right)"])
        createVisualisationSelectList(["Instant Path + Open/Closed"])
    }
}