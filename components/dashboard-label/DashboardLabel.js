

import React from "react";
 
export default function DashboardLabel({title, children}) {
    return (
        <>
            <p className="label-title">{title}</p>
            <p className="label-value">{children}</p>
        </>
    )
}