import {Box, Container} from "@mui/material";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MainScreen from "./Components/Content/MainScreen/MainScreen";

function App() {
    return (
        <Box className={'border-x-gray-50'}>
            <Header />
            <Container maxWidth="xl" sx={{minHeight: '100vh'}} className={'border-l border-r'}>
                <Box sx={{paddingTop: 18}}>
                    <MainScreen />
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}

export default App;
