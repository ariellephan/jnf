var g = J$("John","Doe");
console.log(g);
g.greet().setLang('es').greet(true).log();

$('#login').click(function() {
	var loginGrtr = J$('John', 'Doe');
	$('#loginDiv').hide();
	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});