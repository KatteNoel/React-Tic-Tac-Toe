import React from 'react';
import { useState } from 'react';

import { Button } from 'react-bootstrap';

import { Square } from './square';

export const Board = () => {
    const [currentPlayer, setcurrentPlayer] = useState("X");
    const [squares, setSquares] = useState(new Array(9));
    const [winner, setWinner] = useState(null);
    const [tie, setTie] = useState(false);

    const takeTurn = (index) => {
        if (squares[index] !== undefined) return;

        let array = squares;
        array[index] = currentPlayer;
        setSquares(array);

        setcurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setWinner(calculateWinner(squares));

        determineTie();
    };

    const determineTie = () => {
        let full = false;
        let count = 0;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== undefined){
                count++;
            }
        }

        if (count === squares.length){
            full = true;
        }

        if (winner === null && full) {
            setTie(true);
        }
    }

    const calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    const restartGame = () => {
        setcurrentPlayer("X");
        setSquares(new Array(9));
        setWinner(null);
        setTie(false);
    }

    return (
        <>
        {tie ? (<h1 className="centerText">Tie</h1>) : null}
        {winner || tie ? null : (<h1 className="centerText">Player {currentPlayer}'s Turn</h1>)}
        {winner ? (<h1 className="centerText">Winner: {winner}</h1>) : null}
        <Button variant="warning" className="center" onClick={restartGame}>Restart Game</Button>
        <div className="board">
            <div className="board-row">
                <Square onClick={takeTurn} index={0} letter={squares[0]}/>
                <Square onClick={takeTurn} index={1} letter={squares[1]}/>
                <Square onClick={takeTurn} index={2} letter={squares[2]}/>
            </div>
            <div className="board-row">
                <Square onClick={takeTurn} index={3} letter={squares[3]}/>
                <Square onClick={takeTurn} index={4} letter={squares[4]}/>
                <Square onClick={takeTurn} index={5} letter={squares[5]}/>
            </div>
            <div className="board-row">
                <Square onClick={takeTurn} index={6} letter={squares[6]}/>
                <Square onClick={takeTurn} index={7} letter={squares[7]}/>
                <Square onClick={takeTurn} index={8} letter={squares[8]}/>
            </div>
        </div>
        </>
    );
};