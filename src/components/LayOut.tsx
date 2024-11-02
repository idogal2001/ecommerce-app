import React from "react";

interface layoutProps {
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayOut = ({ setLayout }: layoutProps) => {
  const layoutChange3 = () => {
    setLayout(false);
  };

  const layoutChange5 = () => {
    setLayout(true);
  };
  return (
    <div className="layOutChange">
      Change Layout:{" "}
      <button className="layOutButton" onClick={layoutChange3}>
        3
      </button>
      <button className="layOutButton" onClick={layoutChange5}>
        5
      </button>
    </div>
  );
};

export default LayOut;
