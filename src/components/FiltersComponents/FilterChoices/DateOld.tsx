import React from "react";

interface DateOldProps{
    setSortState: React.Dispatch<React.SetStateAction<string | undefined>>;
    SortType: string;
}

const DateOld = ({ setSortState, SortType }: DateOldProps) => {

    const dateSortingOld = () => {
        setSortState(SortType);
      };

    return (
        <p className="buttonPadding">
        <input
          type="radio"
          name="radio"
          className="button"
          onClick={dateSortingOld}
        />
        <span className="filterNames">Oldest To Newest</span>
      </p>
    )
}

export default DateOld;