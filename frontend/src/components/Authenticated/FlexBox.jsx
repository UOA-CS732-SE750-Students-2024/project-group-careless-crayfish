import React from 'react';
import './FlexBoxStyles.css'; // Ensure you have this CSS

const FlexBox = ({ children, justifyContent = 'center', alignItems = 'center' }) => (
    <div className={`flex-box`} style={{ justifyContent, alignItems }}>
        {children}
    </div>
);

export default FlexBox;
