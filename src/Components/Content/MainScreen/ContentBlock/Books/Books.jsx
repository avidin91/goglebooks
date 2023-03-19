import React from 'react';
import {Box, Button} from "@mui/material";
import book from '../../../../../img/png-transparent-book-author-book-cover-photography-objects-laptop-part.png';
import classes from "./Books.module.css";
import {useNavigate} from "react-router-dom";
import {fetchBook} from "../../../../../store/bookSlice";
import {useDispatch} from "react-redux";

// Функция проверяет, сколько авторов у книги, и возвращает множественное или единственное число авторов
const checkAuthor = (authors) => {
    if (authors) {
        if (authors.length === 1) {
            return 'Автор'
        } else {
            return 'Авторы'
        }
    }
}

const itemMainStyle = {
    borderRadius: '15px',
    backgroundColor: '#fbfbfb',
    boxShadow: '0px 0px 10px #ab9f9f',
    '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 0px 10px #277795'
    }
}

const Books = ({item, id}) => {
    const dispatch = useDispatch()
    // Функция проверяет, есть ли у книги обложка, и подставляет новую, если нет.
    const checkImgProp = () => {
        if (item.volumeInfo.imageLinks === undefined) {
            return book
        }
        return item.volumeInfo.imageLinks.thumbnail
    }
    const navigate = useNavigate()

    const setBook = () => {
        return navigate(`/book/${id}`)
    }

    return (
        <Box className={`p-3 m-5 w-1/3-books`} sx={itemMainStyle} onClick={() => setBook()}>
            <Box className={'h-128'}>
                <Box className={'h-36'}>
                    <p className={`font-medium ${classes.pHover}`}>{item.volumeInfo.title}</p>
                </Box>
                <Box className={'m-7 h-52 border'}>
                    <img src={checkImgProp()} alt="original img"
                         className={'m-auto  h-full'}/>
                </Box>
                {item.volumeInfo.categories && <p>Категория: {item.volumeInfo.categories[0]}</p>}
                {/*Код ниже проверяет, сколько авторов у книги, и если их больше одного, добавляет "и другие"*/}

                    {item.volumeInfo.authors &&
                        <p className={'font-medium'}>{checkAuthor(item.volumeInfo.authors)}: {checkAuthor(item.volumeInfo.authors) === 'Авторы' ? `${item.volumeInfo.authors}` : `${item.volumeInfo.authors[0]}`}</p>}

            </Box>
            <Box className={'text-center mt-5'}>
                <Button variant={'contained'}>Купить</Button>
            </Box>

        </Box>
    );
};

export default Books;