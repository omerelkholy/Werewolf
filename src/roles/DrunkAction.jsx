import { useState } from "react";
import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

function DrunkAction({ onSubmit, name }) {
    const {groundCards} = useGame();
    const [selectedGroundCard, setSelectedGroundCard] = useState(null);

    return(
         <div className="m-4">
            <p><strong>Drunk:</strong>Choose a ground Card.</p>

            
                <select 
                value={selectedGroundCard || ""}
                onChange={(e) => setSelectedGroundCard(e.target.value)}
                >
                    <option disabled value="">Pick a ground card</option>
                    {groundCards.map((_, index) => (
                        <option key={index} value={index}>Ground card {index + 1}</option>
                    ))}
                </select>
            
            <div className="mt-4">
                <PrimaryButton
                    onClick={() => {
                            onSubmit({ target: selectedGroundCard });

                    }}
                    name={name}
                    color="green"
                    disabled={
                        (!selectedGroundCard)
                    }
                />
            </div>
        </div>
    )
}

export default DrunkAction;