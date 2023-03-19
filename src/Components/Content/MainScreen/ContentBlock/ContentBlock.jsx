import React from 'react';
import {Box, Button} from "@mui/material";
import Books from "./Books/Books";
import {fetchMoreBooks} from "../../../../store/mainScreenSlice";
import {useDispatch} from "react-redux";

const ContentBlock = ({state}) => {
    const dispatch = useDispatch()
    // Функция подгружает новые книги
    const startPagination = () => {
        // Считаем, сколько осталось страниц после первого нажатия
        let booksPagesCount;
        if (state.mainScreenState.pagesCount === null) {
            booksPagesCount = ((state.mainScreenState.totalItems - 10) / 30) - 1
        } else {
            booksPagesCount = state.mainScreenState.pagesCount - 1
        }
        let startIndexCount = 10;
        if (state.mainScreenState.startIndex != null) {
            startIndexCount = state.mainScreenState.startIndex
        }
        if (state.mainScreenState.pagesCount != null && state.mainScreenState.pagesCount > 0) {
            if (state.mainScreenState.pagesCount < 1 && state.mainScreenState.pagesCount > 0) {
                startIndexCount = Math.floor(state.mainScreenState.pagesCount * 30)
            }
            startIndexCount += 30
        }

        dispatch(fetchMoreBooks({
            searchVolume: state.mainScreenState.searchVolume,
            category: state.mainScreenState.category,
            sortBy: state.mainScreenState.selector,
            startIndex: startIndexCount,
            maxResults: 30,
            booksPagesCount
        }))
    }
    return (
        <>
            <Box className={'flex flex-wrap justify-between w-4/5 m-auto'}>
                {/*Блок с отрисовкой всех книг. ID у книг не во всех случаях уникальный, поэтому index в виде ключа на скорую руку.*/}
                {state.mainScreenState.googleBooks.items.map((item, index) => {
                    return <Books
                        key={index}
                        id={item.id}
                        item={item}
                    />
                })}
            </Box>
            <Box className={'text-center m-5'}>
                <Button variant={'outlined'} onClick={() => startPagination()}>Загрузить ещё</Button>
            </Box>
        </>
    );
};

export default ContentBlock;