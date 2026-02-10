
import { useState, useCallback, useEffect } from 'react';

interface ResizablePanelOptions {
    initialWidth: number;
    minWidth: number;
    maxWidth: number;
    isPanelOpen: boolean;
}

export const useResizablePanel = ({ initialWidth, minWidth, maxWidth, isPanelOpen }: ResizablePanelOptions) => {
    const [width, setWidth] = useState(initialWidth);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        if (!isPanelOpen) return;
        setIsResizing(true);
    }, [isPanelOpen]);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((mouseEvent: MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - mouseEvent.clientX;
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setWidth(newWidth);
            }
        }
    }, [isResizing, minWidth, maxWidth]);

    useEffect(() => {
        if (isResizing) {
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        } else {
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        }

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    return { width, isResizing, startResizing };
};
