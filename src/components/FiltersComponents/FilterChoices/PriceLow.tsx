import React from "react"

interface PriceLowProps{
  setSortState: React.Dispatch<React.SetStateAction<string | undefined>>
  SortType: string;
}

const PriceLow = ({ setSortState,  SortType }: PriceLowProps) => {

    const priceSortingLow = () => {
        setSortState(SortType);
      };
      
    return (
        <p className="buttonPadding">
        <input
          type="radio"
          name="radio"
          className="button"
          onClick={priceSortingLow}
        />
        <span className="filterNames">Low To High</span>
      </p>
    )
}

export default PriceLow;