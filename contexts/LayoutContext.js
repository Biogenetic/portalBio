import { createContext, useState } from "react";
import { useMedia } from "react-use-media"

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
    const [collapsedSidebar, setCollapsedSidebar] = useState(false);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [breadcrumbs, setBreadcrumbsState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMedia({ maxWidth: 1023 })


    function setTitleAndSubTitle (title, subTitle)
    {
        setTitle(title);
        setSubTitle(subTitle);
    }

    function setTitlePage (title)
    {
        setTitle(title);
        setSubTitle('');
    }

    function setBreadcrumbs (breadcrumbs)
    {
        setBreadcrumbsState([ ...breadcrumbs ]);
    }

    return (
        <LayoutContext.Provider value={{ 
                title, 
                subTitle,
                breadcrumbs,
                collapsedSidebar,
                isMobile,
                isLoading,
                setTitleAndSubTitle,
                setTitlePage,
                setBreadcrumbs,
                setCollapsedSidebar,
                setIsLoading
            }}>
            { children }
        </LayoutContext.Provider>
    )
}
