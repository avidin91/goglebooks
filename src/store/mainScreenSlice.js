import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchAllBooks = createAsyncThunk(
    'mainScreenSlice/fetchAllBooks',
    async (volume, thunkAPI) => {
        volume.maxResults = 10;
        volume.startIndex = 0;
        if (!volume.sortBy) {
            volume.sortBy = 'relevance'
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${volume.searchVolume}+subject:${volume.category}&orderBy=${volume.sortBy}&maxResults=${volume.maxResults}&startIndex=${volume.startIndex}`);
        const data = await response.json();
        data.searchVolume = volume.searchVolume
        data.category = volume.category
        data.startInputValue = '';
        data.selector = volume.sortBy
        // Если пользователь вбил несуществующий запрос, то мы выводим начальные данные, и уведомляем пользователя, что такого запроса нет
        if (data.items === undefined) {
            volume.searchVolume = ''
            volume.category = ''
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${volume.searchVolume}+subject:${volume.category}&orderBy=${volume.sortBy}&maxResults=${volume.maxResults}&startIndex=${volume.startIndex}`);
            const data = await response.json();
            data.error = true
            data.searchVolume = volume.searchVolume
            data.category = volume.category
            data.selector = volume.sortBy
            return data;
        }
        return data;
    }
)

export const fetchMoreBooks = createAsyncThunk(
    'mainScreenSlice/fetchMoreBooks',
    async (volume, thunkAPI) => {
        if (!volume.sortBy) {
            volume.sortBy = 'relevance'
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${volume.searchVolume}+subject:${volume.category}&orderBy=${volume.sortBy}&maxResults=${volume.maxResults}&startIndex=${volume.startIndex}`);
        const data = await response.json();
        data.booksPagesCount = volume.booksPagesCount
        data.startIndex = volume.startIndex
        return data;
    }
)

const mainScreenSlice = createSlice({
    name: 'mainScreenSlice',
    initialState: {
        googleBooks: {
            kind: null,
            totalItems: null,
            items: [{
                kind: null,
                id: null,
                etag: null,
                selfLink: null,
                volumeInfo: {
                    title: null,
                    publisher: null,
                    publishedDate: null,
                    readingModes: {
                        text: null,
                        image: null
                    },
                    pageCount: null,
                    printedPageCount: null,
                    printType: null,
                    maturityRating: null,
                    allowAnonLogging: null,
                    contentVersion: null,
                    panelizationSummary: {
                        containsEpubBubbles: null,
                        containsImageBubbles: null
                    },
                    imageLinks: {
                        smallThumbnail: null,
                        thumbnail: null,
                        small: null,
                        medium: null,
                        large: null,
                        extraLarge: null
                    },
                    language: null,
                    previewLink: null,
                    infoLink: null,
                    canonicalVolumeLink: null
                },
                saleInfo: {
                    country: null,
                    saleability: null,
                    isEbook: null
                },
                accessInfo: {
                    country: null,
                    viewability: null,
                    embeddable: null,
                    publicDomain: null,
                    textToSpeechPermission: null,
                    epub: {
                        isAvailable: null
                    },
                    pdf: {
                        isAvailable: null
                    },
                    webReaderLink: null,
                    accessViewStatus: null,
                }
            }],
        },
        status: null,
        error: null,
        errorComment: null,
        startInputValue: '',
        categories: ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'],
        category: '',
        searchVolume: '',
        selectors: ['relevance', 'newest'],
        selector: 'relevance',
        pagesCount: null,
        startIndex: null
    },
    reducers: {
        changeSearchingText(state, action) {
            state.startInputValue = action.payload;
        },
        errorAbort(state, action) {
            state.error = null;
            state.errorComment = null
        }
    },
    extraReducers: {
        [fetchAllBooks.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchAllBooks.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.googleBooks = action.payload;
            state.category = action.payload.category;
            state.searchVolume = action.payload.searchVolume;
            state.startInputValue = action.payload.startInputValue;
            state.selector = action.payload.sortBy;
            state.totalItems = action.payload.totalItems;
            state.kind = action.payload.kind;
            if (action.payload.error === true) {
                state.error = true
                state.errorComment = 'Неверный запрос'
            }
        },
        [fetchAllBooks.rejected]: (state, action) => {
        },
        [fetchMoreBooks.fulfilled]: (state, action) => {
            state.startIndex = action.payload.startIndex
            state.pagesCount = action.payload.booksPagesCount
            state.googleBooks.items.push(...action.payload.items)
        }
    }

})


export const {changeSearchingText, errorAbort} = mainScreenSlice.actions;
export default mainScreenSlice.reducer;