import React from "react";

interface InputMinProps {
    setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const InputMin = ({ setMinPrice }: InputMinProps) => {
    
    const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>) => {
        if (minRange.key === "Enter") {
            setMinPrice(Number(minRange.currentTarget.value));
        }
      };

    return (
        <input
        className="rangePriceInput"
        type="number"
        placeholder="Min Price"
        name="Min Price"
        onKeyDown={saveInputMin}
      />
    )
}

export default InputMin;