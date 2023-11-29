class MenuSearchModeState extends MenuState{
    constructor(stateManager, gridObject) {
        super(stateManager, gridObject);
    }

    createButtons(){
        function createResetGridButton(){
            const resetGridButtonData = {
                "id": "reset-grid-button",
                "text": "Reset Grid"
            }

            MenuState.createButton(resetGridButtonData);
        }
    }
}