"use strict";

$(document).ready(function() {
	$(".howto2").load("howto2.html");
});

function changetab2() {
	$(".howto2").load("howto2.html");
}

function changetab3() {
	$(".thenumbers").load("thenumbers.html");
}

$(document).on("click", '.howto2tab', function() {
	changetab2();
});
$(document).on("click", '.numberstab', function() {
	changetab3();
});
