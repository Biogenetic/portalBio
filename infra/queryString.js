export const toQueryString = (params) => 
    Object.keys(params)
        .map(key => params[key] ? `${key}=${params[key]}` : '')
        .filter(currentQueryItem => currentQueryItem)
        .join('&');