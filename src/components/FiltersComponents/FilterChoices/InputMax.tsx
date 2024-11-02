import React from "react";

interface InputMaxProps {
    setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const InputMax = ({ setMaxPrice }: InputMaxProps) => {

    const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>) => {
        if (maxRange.key === "Enter") {
          setMaxPrice(Number(maxRange.currentTarget.value));
        }
      };

    return (
        <input
        className="rangePriceInput"
        type="number"
        placeholder="Max Price"
        name="Max Price"
        onKeyDown={saveInputMax}
      />
    )
}

export default InputMax;