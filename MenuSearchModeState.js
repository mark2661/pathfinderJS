class MenuSearchModeState extends MenuState{
    constructor(stateManager, gridObject) {
        super(stateManager, gridObject);
    }

    createButtons(){
        let self = this;
        function createResetGridButton(){
            const resetGridButtonData = {
                "id": "reset-grid-button",
                "text": "Reset Grid"
            }

            MenuState.createButton(self, resetGridButtonData);
        }

        createResetGridButton();
    }


}
