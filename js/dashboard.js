 google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }


// 	function openTab(evt, cityName) {
//   var i, tabcontent, tablinks;
//   tabcontent = cument.getElementsByClassName("tabcontent");
//   for (i = 0; i < dotabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// document.getElementById("defaultOpen").click();

// 	google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawBasic);

// function drawBasic() {

//       var data = new google.visualization.DataTable();
//       data.addColumn('timeofday', 'Time of Day');
//       data.addColumn('number', 'Views');

//       data.addRows([
//         [{v: [9, 0, 0], f: '9'}, 3],
//         [{v: [10, 0, 0], f: '10'}, 14],
//         [{v: [11, 0, 0], f:'11'}, 23],
//         [{v: [12, 0, 0], f: '12'}, 46],
//         [{v: [13, 0, 0], f: '1'}, 78],
//         [{v: [14, 0, 0], f: '2'}, 90],
//         [{v: [15, 0, 0], f: '3'}, 180],
//         [{v: [16, 0, 0], f: '4'}, 200],
//         [{v: [17, 0, 0], f: '5'}, 233],
//         [{v: [18, 0, 0], f: '6'}, 433],
//       ]);

//       var options = {
//         title: 'Views',
//         hAxis: {
//           title: 'Date',
//           format: 'mm/dd/y',
//           viewWindow: {
//             min: [7, 30, 2018],
//             max: [18, 30, 2018]
//           }
//         },
//         vAxis: {
//           title: 'Views'
//         }
//       };

//       var chart = new google.visualization.ColumnChart(
//         document.getElementById('chart_div'));

//       chart.draw(data, options);
//     }

	var currentMonth = document.querySelector(".current-month");
var calendarDays = document.querySelector(".calendar-days");
var today = new Date();
var date = new Date();
currentMonth.textContent = date.toLocaleDateString("en-US", {
	month: "long",
	year: "numeric"
});
today.setHours(0, 0, 0, 0);
renderCalendar();
function renderCalendar() {
	const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
	const totalMonthDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();
	const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	calendarDays.innerHTML = "";
	let totalCalendarDay = 6 * 7;
	for (let i = 0; i < totalCalendarDay; i++) {
		let day = i - startWeekDay;
		if (i <= startWeekDay) {
			// adding previous month days
			calendarDays.innerHTML += `<div class='padding-day'>${
				prevLastDay - i
			}</div>`;
		} else if (i <= startWeekDay + totalMonthDay) {
			// adding this month days
			date.setDate(day);
			date.setHours(0, 0, 0, 0);
			let dayClass =
				date.getTime() === today.getTime() ? "current-day" : "month-day";
			calendarDays.innerHTML += `<div class='${dayClass}'>${day}</div>`;
		} else {
			// adding next month days
			calendarDays.innerHTML += `<div class='padding-day'>${
				day - totalMonthDay
			}</div>`;
		}
	}
}
document.querySelectorAll(".soft-btn").forEach(function (element) {
	element.addEventListener("click", function () {
		date = new Date(currentMonth.textContent);
		date.setMonth(
			date.getMonth() + (element.classList.contains("prev") ? -1 : 1)
		);
		currentMonth.textContent = date.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric"
		});
		renderCalendar();
	});
});
document.querySelectorAll(".btn").forEach(function (element) {
	element.addEventListener("click", function () {
		let btnClass = element.classList;
		date = new Date(currentMonth.textContent);
		if (btnClass.contains("today")) date = new Date();
		else if (btnClass.contains("prev-year"))
			date = new Date(date.getFullYear() - 1, 0, 1);
		else date = new Date(date.getFullYear() + 1, 0, 1);
		currentMonth.textContent = date.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric"
		});
		renderCalendar();
	});
});

