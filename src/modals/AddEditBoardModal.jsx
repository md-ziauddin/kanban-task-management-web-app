import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/iconCrossIcon.svg";
import { useDispatch, useSelector } from "react-redux";

import boardSlice from "../redux/boardSlice";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
  const distpacth = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((col) => col.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      distpacth(boardSlice.actions.addBoard({ name, newColumns }));
    } else {
      distpacth(boardSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 scrollbar-hide overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll mx-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g: Web design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7] outline-1 ring-0"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                alt="cross icon"
                className="cursor-pointer m-4"
                onClick={(e) => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="w-full items-center hover:opacity-25 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full"
            onClick={(e) => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Column
          </button>
          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] relative mt-8 text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) {
                onSubmit(type);
              }
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
