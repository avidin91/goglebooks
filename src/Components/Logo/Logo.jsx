import React from 'react';
import classes from "./Logo.module.css";
import {NavLink} from "react-router-dom";

const Logo = ({text}) => {
    return (
        <div className={classes.cssModifier}>
            <NavLink to="/">
                <p>{text}</p>
            </NavLink>
        </div>
    );
};

export default Logo;