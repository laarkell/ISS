"use strict";

$(document).ready(function() {
	$(".howto").load("howto.html");
});

function changetab1() {
	$(".facts").load("facts.html");
}

function changetab2() {
	$(".howto").load("howto.html");
}

function changetab3() {
	$(".help").load("help.html");
}

$(document).on("click", '.howtotab', function() {
	changetab2();
});
$(document).on("click", '.factstab', function() {
	changetab1();
});
$(document).on("click", '.helptab', function() {
	changetab3();
});
