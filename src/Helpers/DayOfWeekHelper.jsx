

const WeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DayOfWeekAsInteger(day) {
    return WeekArray.indexOf(day);
  }
function IntegerAsDayOfWeek(index) {
    return WeekArray[index];
  }



const DayofWeekHelper = {
    WeekArray,
    DayOfWeekAsInteger,
    IntegerAsDayOfWeek,
}


export default DayofWeekHelper