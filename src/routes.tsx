import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

//pages
import Home from "./pages/Home/Home";
import Publications from "./pages/Publications/Publications";
import Synthesis from "./pages/Synthesis/Synthesis";
import Curriculum from "./pages/Curriculum/Curriculum";
import Dissertation from "./pages/Dissertation/Dissertation";
import GeneralUser from "./pages/Synthesis/pages/GeneralUser";
import Researchers from "./pages/Synthesis/pages/Researchers";

const AppRoutes = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" 
                element={
                    <Home />
                } 
            />
            <Route path="/publications" 
                element={
                    <Publications />
                } 
            />
            <Route path="/synthesis"
                element={
                    <Synthesis />
                }
            />
            <Route path="/synthesis/general-users"
                element={
                    <GeneralUser />
                }
            />
            <Route path="/synthesis/researchers"
                element={
                    <Researchers />
                }
            />
            <Route path="/cv"
                element={
                    <Curriculum />
                }
            />
            <Route path="/dissertation"
                element={
                    <Dissertation />
                }
            />
        </Routes>
        </Suspense>
    </BrowserRouter>
);

export default AppRoutes;