import moment from 'moment/moment.js'

export const sorterDate = (date, date2) =>
{
    if (!date || date2)
    {
        return sorterString(date, date2);
    }

    const  [ yearOne, monthOne, dayOne ] = date.split('/');
    const  [ yearTwo, monthTwo, dayTwo ] = date2.split('/');

    const dateOne = new Date(yearOne, monthOne, dayOne);
    const dateTwo = new Date(yearTwo, monthTwo, dayTwo);   
    
    return moment(dateOne).unix() - moment(dateTwo).unix() ;
}

export const sorterNumber = (numberOne, numberTwo) => numberOne - numberTwo;

export const sorterString = (strOne, strTwo) => strOne.localeCompare(strTwo);