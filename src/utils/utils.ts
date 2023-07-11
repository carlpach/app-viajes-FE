

function date_TO_String(date_Object: Date) {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    var date_String = `${date_Object.getFullYear()}-${date_Object.getMonth() + 1}-${date_Object.getDate()}`
    return date_String;
 }

function generateStarsArray(level: number): number[] {
    return Array(level).fill(0).map((_, i) => i + 1);
  }

function generateNoStarsArray(level: number): number[] {
    const levelReturn = Math.abs(level - 5)
    return Array(levelReturn).fill(0).map((_, i) => i + 1);
  }



export {date_TO_String, generateStarsArray, generateNoStarsArray};