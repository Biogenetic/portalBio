import React from 'react'
import { useRouter } from 'next/router'

const AppRoute = ({title, href, icon, beforeRouting }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        beforeRouting && beforeRouting(href);
        router.push(href)
    }

    return (
      <a  href={href} onClick={handleClick}>                  
        { icon ?? icon }
        <span>{title}</span>
      </a>
    )
}

export default AppRoute;