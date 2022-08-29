import React from "react"

function Dice(props){
    const styling={
        backgroundColor: props.isHeld ? "#6ff77f" : "white"
    }

    return(
        <div className="dice" onClick={()=>props.toggleIsHeld(props.id)} style={styling}>
            <h1 className="dice-value">
                {props.value}
            </h1>
        </div>
    )
}

export default Dice;