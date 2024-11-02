import React from "react"

interface PriceHighProps{
  setSortState: React.Dispatch<React.SetStateAction<string | undefined>>;
  SortType: string;
}

const PriceHigh = ({ setSortState,  SortType }: PriceHighProps) => {

    const priceSortingHigh = () => {
        setSortState(SortType);
      };
      
    return (
        <p className="buttonPadding">
          <input
            type="radio"
            name="radio"
            className="button"
            onClick={priceSortingHigh}
          />
          <span className="filterNames">High To Low</span>
        </p>
    )
}

export default PriceHigh;