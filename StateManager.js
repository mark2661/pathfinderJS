class StateManager {
    constructor() {
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

    switchState(stateKey, currentContext){
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
            //Add associated menu elements to the menu container
            document.getElementById("menu-container").replaceChildren(
                ...this.currentState.menu.menuElements
            )
        }
        else{
            throw new Error("StateManager::switchState, Invalid state Key");
        }
    }
}