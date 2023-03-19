import React, {useEffect} from 'react';
import {Box, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchingText, errorAbort, fetchAllBooks} from './../../../store/mainScreenSlice';
import ContentBlock from "./ContentBlock/ContentBlock";
import {
    Routes,
    Route,
} from "react-router-dom";
import Book from "./ContentBlock/Book/Book";


const MainScreen = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    // Функция отправляет изначальный запрос на сервер Google Books для получения начальных данных
    useEffect(() => {
        dispatch(fetchAllBooks({
            searchVolume: state.mainScreenState.searchVolume,
            category: state.mainScreenState.category,
            sortBy: state.mainScreenState.selector,
            startIndex: 0
        }));
    }, [dispatch])


    //Функция осуществляет поиск книг в завимимости от введённого value в поисковом input
    const startSearch = () => {
        dispatch(fetchAllBooks({
            searchVolume: state.mainScreenState.startInputValue,
            category: state.mainScreenState.category,
            sortBy: state.mainScreenState.selector,
            startIndex: 0
        }))
    }

    // Функция выводит сообщение об ошибке, если пользователь ввел некорректный запрос. А так убирает состояние ошибки, и очищает форму.
    const error = () => {
        state.mainScreenState.errorComment && alert('Книги с таким названием не нейдены, попробуйте ввести другой запрос')
        dispatch(errorAbort())
        dispatch(changeSearchingText(''))
    }

    //Функция меняет состояние текстового поля, а так же отправляет запрос на сервер при нажатии на Enter
    const handleKeyDownEnter = (event) => {
        if (event.key === 'Enter') {
            dispatch(fetchAllBooks({
                searchVolume: state.mainScreenState.startInputValue,
                category: state.mainScreenState.category,
                sortBy: state.mainScreenState.selector,
                startIndex: 0
            }))
        }
    }

    // Функция меняет категорию
    const changeCategory = (event) => {
        dispatch(fetchAllBooks({
            searchVolume: state.mainScreenState.searchVolume,
            category: event.target.value,
            sortBy: state.mainScreenState.selector,
            startIndex: 0
        }))
    }

    // Функция делает сортировку
    const changeSort = (event) => {
        dispatch(fetchAllBooks({
            searchVolume: state.mainScreenState.searchVolume,
            category: state.mainScreenState.category,
            sortBy: event.target.value,
            startIndex: 0
        }))
        console.log('Отсортировано', event.target.value)
    }



    return (
        <Box className={'border rounded p-5 shadow-2xl m-5 bg-white'}>
            <p className={'text-2xl font-medium text-center'}>Добро пожаловать в нашу библиотеку книг</p>
            <p className={'text-center pt-5'}>Чтобы найти интересующую вас книгу, воспользуйтесь поиском</p>
            <Box className={'w-1/2 m-auto'}>
                {state.mainScreenState.errorComment === 'Неверный запрос' ? error() : ''}
                <input type="search"
                       className={'rounded-md border-gray-300 shadow-sm mt-1 focus:border-indigo-300' +
                           ' focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'}
                       value={state.mainScreenState.startInputValue}
                       onChange={(event) => dispatch(changeSearchingText(event.target.value))}
                       onKeyDown={(event) => handleKeyDownEnter(event)}
                />
                {/*Блок сортировкой*/}
                <Box className={'flex mt-2'}>
                    <p className={'text-right mr-2 w-2/5'}>Отсортировать</p>
                    <select name="q" id=""
                            className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full pt-0 pb-0'}
                            onChange={(event) => changeSort(event)}
                    >
                        {state.mainScreenState.selectors.map((selector, index) => {
                            let selectorName;
                            if (selector === 'relevance') {
                                selectorName = 'По релевантности'
                            }
                            if (selector === 'newest') {
                                selectorName = 'По новизне'
                            }
                            return <option value={selector} key={index}>{selectorName}</option>
                        })}
                    </select>
                </Box>
                {/*Блок с фильрацией по категориям*/}
                <Box className={'flex mt-2'}>
                    <p className={'text-right mr-2 w-2/5'}>Фильтр по категориям</p>
                    <select name="q" id=""
                            className={'rounded-md border-gray-300 shadow-sm  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full pt-0 pb-0'}
                            onChange={(event) => changeCategory(event)}
                    >
                        {state.mainScreenState.categories.map(category => {
                            return <option value={category} key={category}>{category}</option>
                        })}

                    </select>
                </Box>
                <Box className={'text-center m-2'}>
                    <Button variant={'outlined'} onClick={() => startSearch()}>Искать</Button>
                </Box>
            </Box>
            <p className={'text-center'}>{state.mainScreenState.searchVolume && `Результат поиска по запросу: ${state.mainScreenState.searchVolume}. Всего найдено ${state.mainScreenState.totalItems} книг.`}</p>
            <Routes>
                <Route path='/' element={<ContentBlock state={state}/>}/>
                <Route path='/book/:bookId?' element={<Book />}/>
            </Routes>
        </Box>
    );
};



export default MainScreen;