---
title: javaScript example tax brackets
date: 2020-02-27 17:59:00
tags: [js]
layout: post
categories: js
id: 618
updated: 2020-02-27 18:10:21
version: 1.3
---

So for todays [javaScript examples](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript) post I thought I would throw together a quick module that can eb use to work out a progressive tax system.

<!-- more -->

## 1 - The tax module for the javaScript example

First off I want to work out a javaScript module that I can use to create a tax object of sorts. This tax object will have an array of bracket objects, and some top level properties for total tax and tax percent.

```js
var tax = (function () {
 
    // 2019 hard table data
    // https://www.propublica.org/article/what-are-2019s-tax-brackets
    var hardTableData = '10:9700,12:39475,22:84200,24:160725,32:204100,35:510300,37:Infinity';
 
    var createBracketObject = function (rate, lower, upper) {
        return {
            rate: rate,
            lower: lower,
            upper: upper,
            amount: 0,
            tax: 0
        };
    };
 
    var createBrackets = function (tableData) {
        tableData = tableData === undefined ? hardTableData : tableData;
        var lower = 0;
        return tableData.split(',').map(function (bracketData) {
            var bd = bracketData.split(':'),
            upper = bd[1] === 'Infinity' ? Number.MAX_SAFE_INTEGER : parseInt(bd[1]),
            bracketObj = createBracketObject(parseInt(bd[0]), lower, upper);
            lower += parseInt(bd[1]) + 1;
            return bracketObj;
        });
    };
 
    var createTaxObject = function (tableData) {
        return {
            totalTax: 0,
            totalPercent: 0,
            brackets: createBrackets(tableData)
        };
    };
 
    var figureTax = function (income, brackets) {
        brackets = brackets === undefined ? createBrackets() : brackets;
        var m = income,
        a = 0;
        return brackets.map(function (bracket) {
            if (m <= bracket.upper) {
                a = m;
            } else {
                a = bracket.upper;
            }
            m -= a;
            bracket.amount = a;
            bracket.tax = a * (bracket.rate / 100);
            return bracket;
        });
    };
 
    var tabulateTaxAmounts = function (brackets) {
        return brackets.reduce(function (acc, bracket) {
            acc = typeof acc === 'object' ? acc.tax : acc;
            return acc + bracket.tax;
        });
    };
 
    var api = {
        income: function (income, tableData) {
 
            var taxObj = createTaxObject(tableData);
 
            taxObj.brackets = figureTax(income, createBrackets(tableData));
            taxObj.totalTax = tabulateTaxAmounts(taxObj.brackets);
            taxObj.totalPercent = taxObj.totalTax / income;
 
            return taxObj;
        }
    };
 
    return api; ;
 
}
    ());
```

## 2 - Now for a demo the makes use of the module

So now that I have my tax module worked out it is time to use it in in a HTML file. I want to just have a simple project that just has an input text element that I can use to input a taxable amount of money, and then a total tax is displayed as well as a breakdown for each tax bracket.

```html
<html>
    <head>
        <title>javaScript example tax brackets</title>
    </head>
    <body>
        <div>
        <input id="income" value="20000"><br>
        <span id="tax"></span><br>
        <div id="brackets"></div>
        </div>
        <script src="tax_brackets.js"></script>
        <script>
var input_income = document.getElementById('income'),
el_tax = document.getElementById('tax'),
el_brack = document.getElementById('brackets');
 
var update = function () {
    var income = input_income.value,
    t = tax.income(income),
    per = Number(t.totalPercent * 100).toFixed(2) + ' %';
    el_tax.innerText = 'tax: ' + t.totalTax + ' ( ' + per + ' ) ';
    var html = '<table>';
    html += '<tr><th>Rate</th><th>Amount</th><th>Tax</th></tr>';
    t.brackets.forEach(function(bracket){
        html += '<tr>'+
        '<td>'+bracket.rate+'%</td>'+
        '<td>'+bracket.amount+'</td>'+
        '<td>'+bracket.tax+'</td>'+
        '</tr>';
    });
    el_brack.innerHTML = html + '<table>';
}
 
update();
input_income.addEventListener('keyup', function () {
    update();
});
 
        </script>
    </body>
</html>
```