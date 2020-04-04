function graph (label, dates, cases, deaths) {
	var ctx = document.getElementById('coronavirus-linear').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
				label: 'Cases',
				lineTension: 0,
				data: cases,
				backgroundColor: ['rgba(0, 0, 255, 0.2)']
			},
			{
				label: 'Deaths',
				lineTension: 0,
				data: deaths,
				backgroundColor: ['rgba(255, 0, 0, 0.2)']
			}]
		},
		options: {
			title: {
				display: true,
				text: label + ' (linear scale)'
			},
            scales: {
				yAxes: [{
					type: 'linear',
					ticks: {
						callback: function(label, index, labels) {
							return Intl.NumberFormat('en-us').format(label);
						},
						fontSize: 14
					}}]
			}
		}
	});
	var cty = document.getElementById('coronavirus-log').getContext('2d');
	var myChart2 = new Chart(cty, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
				label: 'Cases',
				lineTension: 0,
				data: cases,
				backgroundColor: ['rgba(0, 0, 255, 0.2)']
			},
			{
				label: 'Deaths',
				lineTension: 0,
				data: deaths,
				backgroundColor: ['rgba(255, 0, 0, 0.2)']
			}]
		},
		options: {
			title: {
				display: true,
				text: label + ' (log scale)'
			},
			scales: {
				yAxes: [{
					type: 'logarithmic',
					ticks: {
						autoSkip: true,
						autoSkipPadding: 8,
						callback: function(label, index, labels) {
							return Intl.NumberFormat('en-us').format(label);
						},
						fontSize: 14
					}}]
			}
		}
	});
}
