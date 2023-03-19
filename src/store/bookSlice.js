import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchBook = createAsyncThunk(
    'bookSlice/fetchBook',
    async (volume, thunkAPI) => {

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volume.id}`);
        const data = await response.json();
        return data;
    }
)


const bookSlice = createSlice({
    name: 'bookSlice',
    initialState: {},
    googleBooks: {
        book: {
            kind: "123",
            id: "",
            etag: "",
            selfLink: "",
            volumeInfo: {
                title: "",
                authors: ['',],
                publisher: "",
                publishedDate: "",
                description: "",
                industryIdentifiers: [
                    {
                        type: "",
                        identifier: ""
                    },
                    {
                        type: "",
                        identifier: ""
                    }
                ],
                pageCount: null,
                dimensions: {
                    height: "",
                    width: "",
                    thickness: ""
                },
                printType: "",
                mainCategory: "",
                categories: [
                    "",
                ],
                averageRating: null,
                ratingsCount: null,
                contentVersion: "",
                imageLinks: {
                    smallThumbnail: "",
                    thumbnail: "",
                    small: "",
                    medium: "",
                    large: "",
                    extraLarge: ""
                },
                language: "",
                infoLink: "",
                canonicalVolumeLink: ""
            },
            saleInfo: {
                country: "",
                saleability: "",
                isEbook: null,
                listPrice: {
                    amount: null,
                    currencyCode: ""
                },
                retailPrice: {
                    amount: null,
                    currencyCode: ""
                },
                buyLink: ""
            },
            accessInfo: {
                country: "",
                viewability: "",
                embeddable: null,
                publicDomain: null,
                textToSpeechPermission: "",
                epub: {
                    isAvailable: null,
                    acsTokenLink: ""
                },
                pdf: {
                    isAvailable: null
                },
                accessViewStatus: "null"
            }
        }
    },
    reducers: {},
    extraReducers: {
        [fetchBook.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.book = action.payload
            console.log('Пэйлоад',action.payload )
        },
        [fetchBook.rejected]: (state, action) => {
        },
    }

})


export const {} = bookSlice.actions;
export default bookSlice.reducer;