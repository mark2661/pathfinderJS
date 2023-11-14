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
        this.name = "Student";

        this.path = [];
        this.open = [];
        this.closed = [];
    }

    // TODO: Implement this function

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

        // TODO: everything else necessary to start a new search
        // reset open and closed lists
        this.open = new Set([]);
        this.closed = new Set([]);
        // create root node and add it to the open list
        let root = new Node(sRow, sCol, null, null);

        // set search in progress flag
        this.inProgress = true;
    }


    // TODO: Implement this function

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

        return true;
    }

    // TODO: Implement this function

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
        // Example: for simple demonstration, compute an L-shaped path to the goal
        // This is just so the GUI shows somthing when Student code is initially selected
        // Completly delete all of the code in this function to write your solution

        // if we've already finished the search, do nothing
        if (!this.inProgress) { return; }

        // compute an L-shaped apth in a single step (you must replace this)

        let dx = (this.gx - this.sx) > 0 ? 1 : -1;
        let dy = (this.gy - this.sy) > 0 ? 1 : -1;
        for (let x=0; x < Math.abs(this.gx-this.sx); x++) { this.path.push([dx, 0]); }
        for (let y=0; y < Math.abs(this.gy-this.sy); y++) { this.path.push([0, dy]); }

        // check to see which algorithm you should be implementing
        if (this.config.strategy == "bfs") {
            // do bfs search
        }
        else if (this.config.strategy == "dfs") {
            // do dfs search
        }

        // note: do not duplicate all of the BFS / DFS code in the conditonals above, only include the code that is different between the two algorithms

        // the cost of the path for this assignment is the path length * 100, since all the action costs are equal to 100 (4-directional movement)
        this.cost = this.path.length * 100;

        // path found
        this.inProgress = false;
    }

    // TODO: Implement this function


    // This function returns the current open list states in a given format. This exists as a separate funciton because the open list used in search will
    // store nodes instead of states, and may gave a custom data structure that is not an array.

    // Args:
    //      none

    // Return:
    //      openList : an array of unique [x, y] states that are currently on the open list

    getOpen() {
        return [];
    }

    // TODO: Implement this function

    // This function returns the current closed list in a given foramt. This exists as a separate function, since your closed list used in the search may
    // have a custom data structure that is not an array

    // Args:
    //  none

    // Return:
    //  closedList: an array of unique [x, y] states that are currently on the closed list

    getClosed() {
        return [];
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