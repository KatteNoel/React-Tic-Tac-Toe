import React from 'react';

import { Button } from 'react-bootstrap';

export const Square = (props) => {
    let color = null;
    switch (props.letter) {
        case "X":
            color = "primary";
            break;
        case "O":
            color = "danger";
            break;
        default:
            color = "light";
            break;
    }

    return (
        <Button variant={color}className="square" onClick={() => props.onClick(props.index)}>{props.letter}</Button>
    );
};