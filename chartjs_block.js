function setConfigs (label, dates, cases, deaths) {
	let percent_death = deaths.map(function(n, i) { return n / cases[i]; });
	let output = {};
	let configX = {
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
						callback: function(label) {
							return new Intl.NumberFormat('en-us').format(label);
						},
						fontSize: 14
					}}]
			}
		}
	};
	let configY = {
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
						callback: function(label) {
							return new Intl.NumberFormat('en-us').format(label);
						},
						fontSize: 14
					}}]
			}
		}
	};

	let configP = {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
				label: '% death',
				lineTension: 0,
				data: percent_death.map(function(n) { return n * 100; }),
				backgroundColor: ['rgba(0, 0, 255, 0.2)']
			}
			]
		},
		options: {
			title: {
				display: true,
				text: label
			},
			scales: {
				yAxes: [{
					type: 'linear',
					ticks: {
						autoSkip: true,
						autoSkipPadding: 8,
						callback: function(label) {
							return new Intl.NumberFormat('en-us').format(label);
						},
						fontSize: 14
					}}]
			}
		}
	};

	output.linear = configX;
	output.log = configY;
	output.percent = configP;
	return output;
}
function graph (label, dates, cases, deaths) {
	const configs = setConfigs(label, dates, cases, deaths);
	const cline = $('#coronavirus-linear')[0];
    const ctx = cline.getContext('2d');
	let myChart = new Chart(ctx, configs.linear);

	const clog = $('#coronavirus-log')[0];
    const cty = clog.getContext('2d');
	let myChart2 = new Chart(cty, configs.log);

	const cpc = $('#coronavirus-percent')[0];
	const ctp = cpc.getContext('2d');
	let myChart3 = new Chart(ctp, configs.percent);

	myChart.update();
	myChart2.update();
	myChart3.update();
}
