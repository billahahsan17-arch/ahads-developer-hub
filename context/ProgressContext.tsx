
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface ProgressContextType {
    // Example property: track completed lessons, modules, etc.
    completedItems: string[];
    addCompletedItem: (itemId: string) => void;
    isCompleted: (itemId: string) => boolean;
}

// Create the context with a default value
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Create a provider component
export const ProgressProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [completedItems, setCompletedItems] = useState<string[]>([]);

    const addCompletedItem = (itemId: string) => {
        if (!completedItems.includes(itemId)) {
            setCompletedItems(prevItems => [...prevItems, itemId]);
        }
    };

    const isCompleted = (itemId: string) => {
        return completedItems.includes(itemId);
    };

    const value = {
        completedItems,
        addCompletedItem,
        isCompleted
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

// Create a custom hook for easy context consumption
export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
