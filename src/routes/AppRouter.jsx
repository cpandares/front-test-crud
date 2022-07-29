import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import App from '../App';
import UserDetail from '../pages/UserDetail';
const AppRouter = () => {
    
        return (
       
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/student/:id" element={<UserDetail />} />
                </Routes>
            </BrowserRouter>
        );
    
};

export default AppRouter;