function setConfigs (label, dates, cases, deaths) {
	var output = {};
	var configx = {
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
	};
	var configy = {
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
	};
	output.linear = configx;
	output.log = configy;
	return output;
}
function graph (label, dates, cases, deaths) {
	configs = setConfigs(label, dates, cases, deaths);
	const clin = $('#coronavirus-linear')[0];
  var ctx = clin.getContext('2d');
	var myChart = new Chart(ctx, configs.linear);

	const clog = $('#coronavirus-log')[0];
  var cty = clog.getContext('2d');
	var myChart2 = new Chart(cty, configs.log);
}
