function sumByDate(obj) {
	var result = [];
	obj.forEach(function (o) {
		var rv = result.filter(item => {
		  return item.date === o.date
		});
		if (rv.length > 0) {
			var foundIndex = result.findIndex(x => x.date == o.date);
			result[foundIndex].cases += parseInt(o.cases);
			result[foundIndex].deaths += parseInt(o.deaths);
		} else {
			var temp = {date: o.date, cases: parseInt(o.cases), deaths: parseInt(o.deaths)};
			result.push(temp);
		}
	});
	return result;
}
$(function() {
	$.ajax({
		  dataType: 'text',
			async: false,
		  url: "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv",
		  success: function( csvd ) {
				var data = $.csv.toObjects(csvd);
				var text = JSON.stringify(data);
				$('#data').val(text);
				getCharts('all', data);
				$('#states').change(function() {
					  data = JSON.parse($('#data').val());
						getCharts($('#states').val(), data)
				});
			}
	  });
});
function getCharts(mystate, result) {
	const formatter = new Intl.DateTimeFormat('en-us', { month: 'short', day: 'numeric' });
	var dates=[];
	var cases=[];
	var deaths=[];
	$('#states').empty();
	const stateList = [...new Set(result.map(item => item.state))].sort();
	var option = '<option value="all">US</option>';
	for (var i=0;i<stateList.length;i++){
	  option += '<option value="'+ stateList[i] + '">' + stateList[i] + '</option>';
	}
	$('#states').append(option);
	var label = mystate;
	if (mystate == "all") {
		var output=sumByDate(result);
		label = 'US';
	} else {
		var interim=result.
			filter(function (x) {
				return x.state == mystate;
			});
		var output=sumByDate(interim);
	}
	$('#covid').html(output);
	output.forEach(function (item) {
		var d1 = new Date(item.date);
		var f1 = formatter.format(d1);
		dates.push(f1);
		cases.push(parseInt(item.cases));
		deaths.push(parseInt(item.deaths));
	});
	graph(label,dates,cases,deaths);
}
