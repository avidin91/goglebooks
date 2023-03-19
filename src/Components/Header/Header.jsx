import React from 'react';
import {AppBar, Box, Slide, Toolbar, useScrollTrigger} from "@mui/material";
import logo from './../../img/RYY3LbXldapckUgJleSilM-temp-upload.ntdnrbfp.png'
import Logo from "../Logo/Logo";

function HideOnScroll(props) {
    const {children, window} = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const Header = () => {
    return (
        <HideOnScroll>
            <AppBar sx={{background: 'rgb(51, 66, 91)'}}>
                <Toolbar>
                    <img className={'w-16 h-16 m-2'} src={logo} alt="logo"/>
                    <Logo text={'Google Books'}/>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
};

export default Header;