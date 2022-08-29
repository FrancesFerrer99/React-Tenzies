import React from "react"

function Dice(props){
    return(
        <div className="dice">
            <h1 className="dice-value">
                {props.value}
            </h1>
        </div>
    )
}

export default Dice;