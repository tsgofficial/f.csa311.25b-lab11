import React from "react";
import "./App.css"; // import the css file to enable your styles.
import { GameState, Cell } from "./game";
import BoardCell from "./Cell";

interface Props {}

class App extends React.Component<Props, GameState> {
  private initialized: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = { cells: [] };
  }

  newGame = async () => {
    const response = await fetch("/newgame");
    const json = await response.json();
    this.setState({
      cells: json["cells"],
      winner: json["winner"],
      currentPlayer: json["currentPlayer"],
    });
  };

  undo = async () => {
    const response = await fetch("/undo");
    const json = await response.json();
    this.setState({
      cells: json["cells"],
      winner: json["winner"],
      currentPlayer: json["currentPlayer"],
    });
  };

  play(x: number, y: number): React.MouseEventHandler {
    return async (e) => {
      e.preventDefault();
      const response = await fetch(`/play?x=${x}&y=${y}`);
      const json = await response.json();
      this.setState({
        cells: json["cells"],
        winner: json["winner"],
        currentPlayer: json["currentPlayer"],
      });
    };
  }

  createCell(cell: Cell, index: number): React.ReactNode {
    if (cell.playable)
      return (
        <div key={index}>
          <a href="/" onClick={this.play(cell.x, cell.y)}>
            <BoardCell cell={cell}></BoardCell>
          </a>
        </div>
      );
    else
      return (
        <div key={index}>
          <BoardCell cell={cell}></BoardCell>
        </div>
      );
  }

  componentDidMount(): void {
    if (!this.initialized) {
      this.newGame();
      this.initialized = true;
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <div id="instructions">
          `🎯 Current Turn: Player ${this.state.currentPlayer}`
        </div>
        <div id="board">
          {this.state.cells.map((cell, i) => this.createCell(cell, i))}
        </div>
        <div id="bottombar">
          <button onClick={this.newGame}>New Game</button>
          <button onClick={this.undo}>Undo</button>
        </div>
        {this.state.winner && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>🎉 Player {this.state.winner} wins!</h2>
              <button onClick={this.newGame}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
