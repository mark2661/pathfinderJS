class StateManager {
    constructor() {
        this.isMouseDown = false;
        this.gridObject = new Grid(document.getElementById("defaultmap").value);

        this.canvas_states = {
                            "edit": new CanvasEditModeState(this, document.getElementById("grid-container"), this.gridObject),
                            "search": new CanvasSearchModeState(this, document.getElementById("grid-container"), this.gridObject)
                        };
                        
        this.menu_states = {
                            "edit": new MenuEditModeState(this, this.gridObject),
                            // TODO: Implement and add MenuSearchModeState
                            "search" : new MenuSearchModeState(this, this.gridObject)
                      };
        
        this.currentState = {
            "canvas": this.canvas_states["edit"],
            "menu": this.menu_states["edit"]
        }

        // initialise current states
        this.currentState.canvas.init();
        this.currentState.menu.init();
    }

    getCurrentStateContext(){
        let searchAlgorithmSelectElement = document.getElementById("search-algorithm-select");
        let config = {
            "actions": [[-1, 0], [0, 1], [1, 0], [0, -1]],
            "actionCost": [1, 1, 1, 1],
            "strategy": searchAlgorithmSelectElement.value
        }

        // store current select menu values in an object for reference
        let menuState = {};
        let selectMenuNodes = Array.prototype.slice.call(document.getElementById("select-menu-container").children).filter((node) => {
            return node.tagName === "SELECT";
        });

        for (let node of selectMenuNodes) {
            let nodeID = node.id;
            menuState[nodeID] = node.value;
        }

        // store  grid information in an object for reference
        let gridState = {
            "startCell": this.currentState.canvas.startCell,
            "goalCell": this.currentState.canvas.goalCell
        }

        let context = {
            "config": config,
            "menuState": menuState,
            "gridState": gridState,
        }

        return context;
    }

    switchState(stateKey, currentContext){
        stateKey = stateKey.toLowerCase();
        if (stateKey in this.canvas_states && stateKey in this.menu_states){
            this.currentState.canvas = this.canvas_states[stateKey];
            this.currentState.canvas.init(currentContext);
            
            // clear current menu sub contaienrs of their child element nodes
            let subMenuContainers = Array.prototype.slice.call(document.getElementById("menu-container").children);
            for(let subContainer of subMenuContainers){
                subContainer.replaceChildren();
            }

            this.currentState.menu = this.menu_states[stateKey];
            this.currentState.menu.init();
            //Add associated menu elements to the menu sub containers container
            for (let menuElement of this.currentState.menu.menuElements){
                document.getElementById(menuElement.containerID).appendChild(menuElement.element);
            }
            
        }
        else{
            throw new Error("StateManager::switchState, Invalid state Key");
        }
    }
}