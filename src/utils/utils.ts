

function date_TO_String(date_Object: Date) {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    var date_String = `${date_Object.getFullYear()}-${date_Object.getMonth() + 1}-${date_Object.getDate()}`
    return date_String;
 }


export {date_TO_String};