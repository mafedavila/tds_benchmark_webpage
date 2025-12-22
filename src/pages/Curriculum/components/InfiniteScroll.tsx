import React from "react";

interface InfiniteScroll {
    children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScroll> = ({ children }) => {
    return (
        <div className="scroll-wrapper py-6">
            <div className="scroll-content">
                {/* Duplicamos contenido para el loop infinito */}
                <div className="flex gap-10 mr-10">{children}</div>
                <div className="flex gap-10">{children}</div>
            </div>
        </div>
    );
};

export default InfiniteScroll;
