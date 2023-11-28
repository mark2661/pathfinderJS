class StateManager {
    constructor() {
        this.gridObject = new Grid(document.getElementById("defaultmap").value);

        this.canvas_states = {
                            "edit": new CanvasEditModeState(this, document.getElementById("grid-container"), this.gridObject),
                            "search": -1
                        };
                        
        this.menu_states = {
                            "edit": new MenuEditModeState(this, this.gridObject),
                            "search" : -1
                      };
        
        this.currentState = {
            "canvas": this.canvas_states["edit"],
            "menu": this.menu_states["edit"]
        }

    }

    switchState(stateKey){
        if (stateKey in this.canvas_states && stateKey in this.menu_states){
            this.currentState.canvas = this.canvas_states[stateKey];
            this.currentState.menu = this.menu_states[stateKey];
        }
        else{
            throw new Error("StateManager::switchState, Invalid state Key");
        }
    }
}