import React, { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";

const App = () => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div>
      {/* Header Section */}
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Center Section */}
      <Center />
    </div>
  );
};

export default App;
