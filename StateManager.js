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
            // "canvas": this.canvas_states["search"],
            // "menu": this.menu_states["search"]
        }

    }

    switchState(stateKey, currentContext){
        // TODO: needs to recive a series of objects containg the current state of the data
        // in the menus before switching
        if (stateKey in this.canvas_states && stateKey in this.menu_states){
            this.currentState.canvas = this.canvas_states[stateKey];
            this.currentState.canvas.init(currentContext);
            
            // clear current menu container child element nodes
            document.getElementById("select-menu-container").replaceChildren();

            this.currentState.menu = this.menu_states[stateKey];

            // Add associated menu elements to the menu container
            document.getElementById("select-menu-container").replaceChildren(
                ...this.currentState.menu.menuElements
            )
        }
        else{
            throw new Error("StateManager::switchState, Invalid state Key");
        }
    }
}