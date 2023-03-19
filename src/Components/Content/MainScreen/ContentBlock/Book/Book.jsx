import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import imag from './../../../../../img/png-transparent-book-author-book-cover-photography-objects-laptop-part.png';
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";
import {fetchBook} from "../../../../../store/bookSlice";


const Book = () => {
    const dispatch = useDispatch()
    let location = useLocation()
    const id = location.pathname.replace('/book/', '')

    useEffect(() => {
        dispatch(fetchBook({
            id
        }))
    }, [dispatch])
    const state = useSelector(state => state.bookState)

    console.log('Стате', state)

    const checkImg = () => {
        let checkedImg = state.book.volumeInfo.imageLinks
        if (!checkedImg) {
            checkedImg = imag
            return checkedImg
        }
        if (checkedImg.thumbnail) {
            return checkedImg.thumbnail
        }
        if (!checkedImg.thumbnail) {
            checkedImg = imag
            return checkedImg
        }
    }

    // Функция проверяет статус запроса на сервер, и начинает отрисовку блока в зависимости от того, пришли ли данные
    const checkStatus = () => {
        if (state.status === 'resolved') {
            return true
        } else {
            return false
        }
    }

    return (
        <Box className={'flex m-auto'} style={{width: 'fit-content', maxWidth: '500px'}}>
            {checkStatus() && <Box className={'text-center '}>
                {state.book.volumeInfo.title && <p className={'font-bold'}>Название: {state.book.volumeInfo.title}</p>}
                <img src={checkImg()} alt="" className={'h-128 border m-auto'}/>
                {state.book.volumeInfo.categories && <p>Категория: {state.book.volumeInfo.categories}</p>}
                {state.book.volumeInfo.authors && <p>Авторы: {state.book.volumeInfo.authors}</p>}
                {state.book.volumeInfo.description && <p>Описание: {state.book.volumeInfo.description}</p>}
            </Box>}


        </Box>
    );
};

export default Book;