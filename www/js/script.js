 $(document).ready(function () {
 	var count = 0;
 	var livro = [];
 	var idd = 0;
 	addPaco(count);
 	$("#paco").click(function(){
 		addPaco(count);
 	});
 	$("#sub").click(function(){
 		var n = []
 		idd++;
 		for (var i = 0; i < count; i++) {
 			var k = $("#inpt"+i).val();
 			n.push(k);
 		}
 		var pgDesci = $("#desc").val();
 		var receita = {
 			id: idd, //Inteiro
 			descri: pgDesci, //String
 			etapa: n //Array (de Strings)
 		};
 		livro.push(receita);
 		mostrarLivro("#livros",livro);
 	});
 });

function addPaco(count){
	var val = "";
 	val += "º: <input class='form-control' placeholder='Passo número "+(count+1)+"' id='inpt"+count+"'></input><br>";
 	count++;
 	$("#etapas").append(count+val);
}

function mostrarLivro(espaco, array){
	var contador = 0;
 	for (var i = array.length-1; i >= 0; i--) {
 		for (var x = array[i].etapa.length - 1; x >= 0; x--) {
 			contador++
 			$(espaco).append(contador+"º: "+array[i].etapa[x]+"<br>");
 		}
 	}
}
