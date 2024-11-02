import React from "react";

interface DateOldProps{
    setSortState: React.Dispatch<React.SetStateAction<string | undefined>>;
    SortType: string;
}

const DateNew = ({ setSortState, SortType }: DateOldProps) => {

    const dateSortingNew = () => {
        setSortState(SortType);
      };

    return (
        <p className="buttonPadding">
          <input
            type="radio"
            name="radio"
            className="button"
            onClick={dateSortingNew}
          />
          <span className="filterNames">Newest To Oldest</span>
        </p>
    )
}

export default DateNew;