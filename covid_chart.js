var stateList = [];
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
	const urlParams = new URLSearchParams(window.location.search);
  var myState = urlParams.get('state');
	if (myState == null) {
		myState = '';
	}
	$.ajax({
		  dataType: 'text',
			async: false,
		  url: "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv",
		  success: function( csvd ) {
				var data = $.csv.toObjects(csvd);
				getChart(myState, data);
				$('#states').change(function() {
					var newState = $(this).val();
					const url = '?state=' + newState;
					location.href = url;
				});
			}
	  });
});
function getChart(myState, result) {
	const formatter = new Intl.DateTimeFormat('en-us', { month: 'short', day: 'numeric' });
	var dates=[];
	var cases=[];
	var deaths=[];
	$('#states').empty();
	stateList = [...new Set(result.map(item => item.state))].sort();
	var option = '<option value="">US</option>';
	for (var i=0;i<stateList.length;i++){
	  option += '<option value="'+ stateList[i] + '">' + stateList[i] + '</option>';
	}
	$('#states').append(option);
	if (!stateList.includes(myState)) {
		var output=sumByDate(result);
		var label = 'US';
	} else {
		var interim=result.
			filter(function (x) {
				return x.state == myState;
			});
		var output=sumByDate(interim);
		var label = myState;
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
