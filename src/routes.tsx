import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Home from "./pages/Home/Home";
import Publications from "./pages/Publications/Publications";
import Synthesis from "./pages/Synthesis/Synthesis";
import Curriculum from "./pages/Curriculum/Curriculum";
import Dissertation from "./pages/Dissertation/Dissertation";
import Documentation from "./pages/Documentation/Documentation";
import QuestionnaireWizard from "./pages/Questionnaire/components/QuestionnaireWizard";
import { QuestionnaireProvider } from "./pages/Questionnaire/store";

const AppRoutes = () => (
    <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/synthesis" element={<Synthesis />} />
            <Route
                path="/synthesis/general-users"
                element={
                    <QuestionnaireProvider>
                        <QuestionnaireWizard />
                    </QuestionnaireProvider>
                }
            />
            <Route path="/cv" element={<Curriculum />} />
            <Route path="/dissertation" element={<Dissertation />} />
            <Route path="/documentation" element={<Documentation />} />
        </Routes>
        </Suspense>
    </HashRouter>
);

export default AppRoutes;