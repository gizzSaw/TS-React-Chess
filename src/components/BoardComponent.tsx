import React, { FC, useEffect, useState }  from "react"
import CellComponent from "./CellComponent";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";

interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) { //взять фигуру
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell) //переместить фигуру
            setSelectedCell(null) //отпустить фигуру) 
            updateBoard()
        } else {
            setSelectedCell(cell)
        }
    }

    useEffect(() => { //привязка события к изменению выбраной ячейки
        highlightCells()
    }, [selectedCell])

    function highlightCells() { //подсвечивать доступные ячейки
        board.highlightCells(selectedCell)  
        updateBoard()
    }

    function updateBoard() { //явное обновление состояния 
        const newBoard = board.getCopyBoard() //новая ссылка, чтобы реакт перерисовад всю доску
        setBoard(newBoard)
    }

    return (
        <div className="board">
            {board.cells.map((row, index) => 
                
                <React.Fragment key={index}>
                    {row.map(cell => 
                        <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default BoardComponent