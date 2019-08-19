// tabulate
let tab = () => {
    let counts = {};
    return (color) => {
        if (color) {
            counts[color] = counts[color] === undefined ? 1 : counts[color] += 1;
        }
        return counts;
    }
};

// create a colors div bar
let colorBar = (tab) => {
    let colorTabs = tab(),
    total = 0,
    html = '<div style="display:inline-block;width:100px;height:20px;">';
    Object.keys(colorTabs).forEach((color) => {
        total += colorTabs[color];
    });
    ['lime', 'green', 'orange', 'red'].forEach((color) => {
        let t = colorTabs[color] / total;
        t = String(t) === 'NaN' ? 0 : t;
        let w = Math.floor(t * 100);
        if (w) {
            html += '<div style="display:inline-block;width:' + w + 'px;height:20px;background:' + color + ';"></div>';
        }
    });
    html += '</div>';
    return html
};

colorTabs = tab();

colorTabs('red');
colorTabs('red');
colorTabs('red');
colorTabs('red');
colorTabs('red');
colorTabs('green');
colorTabs('lime');

console.log(colorTabs());

console.log( colorBar(colorTabs) );
