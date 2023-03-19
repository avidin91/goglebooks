import React from 'react';
import {Box} from "@mui/material";
import logo from './../../img/RYY3LbXldapckUgJleSilM-temp-upload.ntdnrbfp.png'
import classes from "./footer.module.css";

const Footer = () => {
    return (
        <Box sx={{background: 'rgb(51, 66, 91)'}} className={'p-5 flex'}>
            <img src={logo} alt="Logo" className={'w-16 h-16'}/>
            <Box className={'m-auto'}>
                <p className={'text-amber-50'}>Видин Александр</p>
                <a href="tel:+79585611717" className={'text-amber-50'}>+7(958)561-17-17</a>
                <p className={'text-amber-50'}>Telegramm: @Sanviz</p>
            </Box>
        </Box>
    );
};

export default Footer;