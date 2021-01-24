var count = 0;
var db = window.localStorage;
var key = "xEUjxeT0CHqgb7TjSNwQKg";
$(document).ready(function () {
	var livro = [];
	var idd = 0;
	addPaco(count);
	$("#paco").click(function(){ //Adicionar paço
		addPaco(count);
		window.scrollTo(0,document.body.scrollHeight);
	});
	$("#sub").click(function(){ //Mostrar o livro
		if ($(".form-control").val() == "")
			alert("vazio");
		else
			addReceita(count, idd, livro)
		
	});
	$("#btnReceita").click(function(){
		$("#receitas").empty();
		mostrarLivro("#receitas");
	});
});

function addPaco(contador){ //Adiciona um paço
	var val = "";
	val += "<div id='dir"+contador+"'>"+(contador+1)+"º: <input class='form-control' placeholder='Passo número "+(contador+1)+"' id='inpt"+contador+"'></input><br>";
	count++;
	$("#etapas").append(val);
}

function addReceita(contador, idd, livro){
	var n = [];
	livro = JSON.parse(db.getItem(key));
	if (livro == null)
		livro = [];
	idd++;
	for (var i = 0; i < contador; i++) {
		var k = $("#inpt"+i).val();
		n.push(k);
	}
	var pgDesci = $("#desc").val();
	var pgNome = $("#nome").val();
	var ingredientes = $("#ingrd").val();
	var receita = {
		//id: idd, //Inteiro
		nome: pgNome, //String
		descri: pgDesci, //String
		etapa: n, //Array (de Strings)
		ingr: ingredientes //String
	};
	livro.push(receita);
	db.setItem(key, JSON.stringify(livro));
	location.reload();
}

function rmReceita(index) {
	var livro = JSON.parse(db.getItem(key));
	livro.splice(index,1);
	db.setItem(key, JSON.stringify(livro));
	location.reload();
}

function mostrarReceita(index){
	var array = JSON.parse(db.getItem(key));
	for (let v of array) {
		if (index == array.indexOf(v)) {
			$(".titlesPopUp").empty(); //Irá limpar conteudo que já tiver
			$("#exampleModalLabel").html(v.nome);
			$("#popUpReceitas").append("<i>"+v.descri+"</i><br>Ingredientes:<br>"+v.ingr+"<p>");
			for(let i of v.etapa){
				$("#popUpReceitas").append((v.etapa.indexOf(i)+1)+"º: "+i+"<br> ");
			}
			$("#popUpReceitas").append("</p>");
			$("#btn-rmv").click(function () {
				rmReceita(index);
			});
		}
	}
}

function mostrarLivro(espaco){ //Mostra o livro de receitas
	var contador = 0;
	var array = JSON.parse(db.getItem(key));
	for (let i of array) {
		console.log(array.indexOf(i));
		val = "";
		val += "<div class='card card-receipe'>";
		val += "<div id='card' class='card-body'>";
		val += "<h4 class='card-title'>"+i.nome+"</h4>";
		val += "<p class='card-text'>"+i.descri+"</p>";
		val += "<button type='button' onclick='mostrarReceita("+array.indexOf(i)+")' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>";
		val += "Consultar Receita </button></div></div>";
		
		$(espaco).append(val);
	}
}