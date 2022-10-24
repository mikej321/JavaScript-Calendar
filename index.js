/* sets the current date */

const date = new Date();

/* Function that holds the entire calendar for Scope purposes.
all of my code has been added to this function and has been called
inside of the event listeners as well as the proper call */

const renderCalendar = () => {

  /* Function that I used to set the date to the first day of the
  month. It is the first part of the function that I used to count
  backwards. */

  date.setDate(1);

  const monthDays = document.querySelector('.days')
  
  /* grabs the last date of the month by declaring the lastDay
  as a variable and setting the fullYear(),getMonth() functions
  on the date. By adding 1 to it, you are able to get the last day
  of the current month. the getDate() that is appended to it allows
  us to get the number of the date instead of useless data */
  
  const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
  
  /* Gets the last day of the month by using the same formula that I used
  above, but it removes the +1 to give the last day of the month */
  
  const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
  
  /* Second part of what I used to get the first day of the month,
  it grabs the index number of the first day of the month, which is
  important to our function that counts backwards */
  
  const firstDayIndex = date.getDay();
  
  /* Uses the same process as the firstDayIndex did. Uses getDay
  instead of getDate because I need to get the index number of the
  last day of the month. Remember to keep the +1 in this one or 
  the calculation will be wrong. */
  
  const lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1,0).getDay();
  
  /* The variable nextDays is 7 because of the days of the week -
  lastDayIndex which is the index number of the last day of the week,
  which in my case would be 1 and finally you have to subtract an extra
  1 due to the index based counting nature of JavaScript. That would
  ultimately make it count 5 spaces ahead. */
  
  const nextDays = 7 - lastDayIndex - 1;
  
  /* An array containing all of the months of the year
  to properly recognize them in my calendar */
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  /* Selects the header date in my calendar and writes the current
  month in an empty header tag using the date method on the getMonth
  function */
  
  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  
  /* Selects the date portion of the calendar underneath the header
  title and dynamically changes it to match the actual date */
  
  document.querySelector('.date p').innerHTML = date.toDateString();
  
  let days = "";
  
  /* A for loop that assigns empty spaces to the calendar for the previous
  months as well as the next month. The loop assigns the starting point
  to the first day of the month and counts backwards until it equals 0,
  which would be 5 times. It assigns the first day by subtracting the firstDayIndex - prevLastDay. Adding plus
  1 to the formula takes it to the correct last day of the previous
  month as it will display a day missing if you dont add 1 to it. */
  
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
  } 
  
  /* for loop that creates the days of the month and displays them on
  my calendar */
  
  for (let i=1; i <= lastDay; i++) {
    /* If statement that will highlight the current day. We have to compare
    counter i to the current date. Once they match, it adds the class "today"
    to style it. Compares the month to the current month as well. */
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`
    }
    // this translates to x += 10   x = x + 10 
    monthDays.innerHTML = days;
  }
  
  /* J = 1 because each month starts with 1, as long as j is less
  than or equal to nextDays, which would be 5, it will draw a div
  cell for the days of the next month. Ensure that the extra divs
  have their classes accurate so they will adopt the proper CSS. */
  
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }

}



/* Event Listeners for the arrow keys to guide to the previous and 
next months. It is done using EAC Functions. It is done using
an equation which subtracts the month that is returned with 
date.getMonth() - 1, which would be the previous month */

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
})

/* Same formula as the last one except that it is equated by 
adding 1 instead of subtracting to get the next month */

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
})

renderCalendar();