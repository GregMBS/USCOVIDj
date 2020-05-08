let stateList = [];

function sumByDate(obj) {
    let result = [];
    obj.forEach(function (o) {
        let rv = result.filter(item => {
            return item.date === o.date
        });
        if (rv.length > 0) {
            let foundIndex = result.findIndex(x => x.date === o.date);
            result[foundIndex].cases += parseInt(o.cases);
            result[foundIndex].deaths += parseInt(o.deaths);
        } else {
            let temp = {date: o.date, cases: parseInt(o.cases), deaths: parseInt(o.deaths)};
            result.push(temp);
        }
    });
    return result;
}

$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    let myState = urlParams.get('state');
    if (myState == null) {
        myState = '';
    }
    $.ajax({
        dataType: 'text',
        async: false,
        url: "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
    })
        .done(function (csvD) {
            const data = $.csv.toObjects(csvD);
            getChart(myState, data);
            $('#states').change(function () {
                const newState = $(this).val();
                location.href = '?state=' + newState;
            });
        });
});

function getChart(myState, result) {
    const formatter = new Intl.DateTimeFormat('en-us', {month: 'short', day: 'numeric'});
    let dates = [];
    let cases = [];
    let deaths = [];
    const states = $('#states');
    states.empty();
    stateList = [...new Set(result.map(item => item.state))].sort();

    function extracted(result, myState) {
        let output = sumByDate(result);
        let label = 'US';
        if (stateList.includes(myState)) {
            let interim = result.filter(function (x) {
                return x.state === myState;
            });
            output = sumByDate(interim);
            label = myState;
        }
        return {output, label};
    }

    let {output, label} = extracted(result, myState);
    let option = '<option value="">US</option>';
    for (let i = 0; i < stateList.length; i++) {
        if (stateList[i] === label) {
            option += '<option value="' + stateList[i] + '" selected="selected">' + stateList[i] + '</option>'
        } else {
            option += '<option value="' + stateList[i] + '">' + stateList[i] + '</option>'
        }
    }
    states.append(option);
    $('#covid').html(output);
    output.forEach(function (item) {
        let d1 = new Date(item.date);
        let f1 = formatter.format(d1);
        dates.push(f1);
        cases.push(parseInt(item.cases));
        deaths.push(parseInt(item.deaths));
    });
    graph(label, dates, cases, deaths);
}
