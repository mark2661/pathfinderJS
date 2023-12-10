class Search_Solution {
    constructor(grid, config) {

        this.config = config        // serch configuration object
                                    // config.actions = array of legal [x, y] actions
                                    // config.actionCosts[i] = cost of config.actions[i]
                                    // config.strategy = 'bfs' or 'dfs'
        
        this.grid = grid            // the search grid
        this.sRow = -1;               // x location of start state
        this.sCol = -1;               // y location of start state
        this.gRow = -1;               // x location of goal state
        this.gCol = -1;               // y location of goal state
        this.cost = 0;               

        this.inProgress = false;
        this.path = [];
        this.open = [];
        this.closed = [];
    }


    // This function should set up all the necessary data structures to begin a new search
    // this includes, but is not limited to: setting the start and goal locations, resetting the open and closed list, and resetting the path.
    
    // Args:
    //  sx, sy (int, int) : (x, y) position of start state
    //  gx, gy (int, int) : (x, y) position of goal state

    // Returns:
    //  none    : this function does not return anything

    startSearch(sRow, sCol, gRow, gCol) {
        this.sRow = sRow;
        this.sCol = sCol;
        this.gRow = gRow;
        this.gCol = gCol;
        this.path = [];
        this.cost = 0;

        // reset open and closed lists
        this.open = [];
        this.closed = [];
        // create root node and add it to the open list
        let root = new Node(sRow, sCol, null, null);
        this.open.push(root);
        // set search in progress flag
        this.inProgress = true;
    }

    // This function should compute and return whether or not the given action is able to be performed form the given (x, y) location

    // Args:
    //  x, y (int, int) : (x, y) location of the given positon
    //  action [int, int] : the action to be performed, representing the [x, y] movement from this position. for example: [1, 0] is move 1 in the x direction
    //  and 0 in the y direction (move right). For this assignment, the only action possibilities should be: [1,0], [0,1], [-1,0], [0,-1]

    // Returns:
    //  bool: whether or not the given action is legal at the given location

    isLegalAction(row, col, action) {
        let nRow = row + action[0];
        let nCol = col + action[1];

        // 1. create nx, ny (new location after the action is performed)
        // 2. if this.grid.isOOb(nx, ny) then return false
        // 3. if this.grid.get(x, y) not same as this.grid.get(nx, ny) return false
        if (this.grid.get(row, col) === null || this.grid.get(nRow, nCol) === null || 
            this.grid.isOOB(nRow, nCol) || (this.grid.get(row, col)).baseValue !== this.grid.get(nRow, nCol).baseValue) {
            return false;
        }

        return true;
    }


    // This function performs one iteration of the search, which is equivalent to everything inside the while (true) part of the algorithm pseudocode in the class
    // node. The only difference being that when a path is found, we set the internal path variable rather than return it from the funciton. When expanding the current
    // node, you must use the this.isLegalAciton function above.

    // If the search has been completed (path found, or open list empty) then this function should do nothing unitl the startSearch function has been called again.
    // This function should correctly set the this.inProgress variable to false once the search has been completed, which is required for the GUI to function correctly.

    // This function should perform one iteration of BFS if the this.config.startegy variable == 'bfs', or one iteration of DFS if the this.config.strategy variable == 'dfs'
    // There should be a few line(s) of code difference between the two algorithms.

    // Args:
    //  none

    // Return:
    //  none

    searchIteration() {
        // hack to access "this" in nested functions
        let self = this;
        function stateInClosedList(node) {
            for (let state of self.closed) {
                if (node.row === state.row && node.col === state.col) {
                    return true;
                }
            }
            return false;
        }

        // if we've already finished the search, do nothing
        if (!this.inProgress) { return; }

        if (this.open.length === 0) {
            // if the open list is empty stop the search (No valid solution found)
            // console.log("No solution");
            this.cost = -1;
            this.inProgress = false;
            return;
        }

        // define currentNode outside scope of conditionals so it is accessible by this function
        let currentNode = null;

        if (this.config.strategy === "bfs") {
            currentNode = this.open.shift();
        }
        else if (this.config.strategy === "dfs") {
            currentNode = this.open.pop();
        }

        if (currentNode.row === this.gRow && currentNode.col === this.gCol)
        {
            // goal found costruct and return solution solution path
            let curr = currentNode;
            // add goal cell to path
            this.path.push(Grid.getGridCellKey(curr.row, curr.col));
            // don't want to terminate at start node, since start node has no action which produced it.
            while (curr.parent !== null) {
                this.path.push(Grid.getGridCellKey(curr.parent.row, curr.parent.col));
                curr = curr.parent;
            }

            // the cost of the path is the path length * 100, since all the action costs are equal to 100 (4-directional movement)
            this.cost = this.path.length * 100;

            // path found stop search
            this.inProgress = false;

            // need to reverse solution path since current path goes from goal node -> start node.
            this.path.reverse();
            return;
        }

        if (stateInClosedList(currentNode)) {
            return;
        }        

        this.closed.push(currentNode);
        // this.grid.setColor(Grid.getGridCellKey(currentNode.row, currentNode.col), ORANGE_COLOUR)

        // get legal neighbours of current node and add to open list
        for (let action of this.config.actions) {
            if (!this.isLegalAction(currentNode.row, currentNode.col, action)) { continue; }
            // create new neighbour node
            let neighbourRow = currentNode.row + action[0];
            let neighbourCol = currentNode.col + action[1];
            let neighbourNode = new Node(neighbourRow, neighbourCol, action, currentNode);

            // add new neighbour node to open list
            if (!stateInClosedList(neighbourNode))
            {
                // this.grid.setColor(Grid.getGridCellKey(neighbourNode.row, neighbourNode.col), YELLOW_COLOUR);
                this.open.push(neighbourNode);
            }
        }

        
    }

    search() {
        while (this.inProgress){
            this.searchIteration();
        }

        // If search was unsuccessful clear the closed, open and path list so they cannot be used.
        // cost is set to -1 in the event of an unsuccessful search
        if (this.cost === -1){
            this.path = [];
            this.closed = [];
            this.open = [];
        }
    }



    // This function returns the current open list states in a given format. This exists as a separate funciton because the open list used in search will
    // store nodes instead of states, and may gave a custom data structure that is not an array.

    // Args:
    //      none

    // Return:
    //      openList : an array of unique [x, y] states that are currently on the open list

    getOpen() {
        return this.open;
    }


    // This function returns the current closed list in a given foramt. This exists as a separate function, since your closed list used in the search may
    // have a custom data structure that is not an array

    // Args:
    //  none

    // Return:
    //  closedList: an array of unique [x, y] states that are currently on the closed list

    getClosed() {
        return this.closed;
    }
}


class Node {
    constructor(row, col, action, parent) {
        this.row = row;
        this.col = col;
        this.action = action;
        this.parent = parent;
    }
}