
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoader } from './components/PageLoader'; 
import MainLayout from './pages/MainLayout';
import AssemblyDojo from './pages/lab/AssemblyDojo'; // Import your AssemblyDojo component

const App: React.FC = () => {

    return (
        <ProgressProvider>
            <Router>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                {/* Define a default route or a dashboard component */}
                                <Route index element={<AssemblyDojo />} /> 
                                <Route path="lab/assembly" element={<AssemblyDojo />} />
                                {/* Add other routes as needed */}
                            </Route>
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </Router>
        </ProgressProvider>
    );
};

export default App;
