/*
	Utilizado para gerar a estrutura das etiquetas 'aqueles quadradinhos' para podermos ver como será impresso
	fiz isso para ajudar visualmente onde será impresso a etiqueta
*/
function setarEstrutura(){

	for(var i=1; i<=numeroLinhas; i++){	

		doc.lineJoin('round')
			.rect(14.50, (altura * i ), largura, altura)    // Primeira coluna 14.5 pois é o inicio da margem
			.stroke();										

		doc.lineJoin('round')
			.rect(62.00, (altura * i ), largura, altura)   // Segunda coluna + a margem mais densidade horizontal
			.stroke();

		doc.lineJoin('round')
			.rect(109.05, (altura * i ), largura, altura)  // Terceira coluna é densidade anterior '62' + densidade horizontal '47.50'
			.stroke();
				
		doc.lineJoin('round')
			.rect(157.00, (altura * i ), largura, altura) // Quarta coluna é densidade anterior '109.05' + densidade horizontal '47.50'
			.stroke();
		}	    
}


function setarTextoEtiqueta(texto, marginEsquerda, marginSuperior){

	doc.text(texto, marginEsquerda,  marginSuperior, {height:altura, width:largura} )
}	    	

/*
	Adicionando os módulos necessários				
*/
var PDFDocument = require('pdfkit');                      
var fs 		= require('fs');			

/*	
	CRIAMOS O EXEMPLO DA PIMACO 6187 
	
	Tamanho da pagina: 21,59 x 27,94 cm -> 215,90 x 279,40

	Margem superiror:  1,27cm  -> 12,70mm
	Margem lateral:    1,45cm  -> 14,50mm

	Desnsidade vertical:  1,27 -> 12,70mm
	Densidade horizontal: 4,75 -> 47,50mm

	Altura etiqueta: 	1,27   -> 12,70mm
	Largura etiqueta:   4,44   -> 44,00mm

	Numero colunas: 	4
	Numero de linhas:   20
	
	Total 80 etiquetas

	// Densidade horizontal -> É o espaçamento entre as etiquetas 'linha'
	// Densidade vertical   -> É o espaçamento entre as etiquetas 'coluna'

*/

// Tamanhos das paginas que Pimaco trabalha (informações de acordo com Pimaco)
var papelCartaPimaco   = [215.90, 279.40];
var papelA4Pimaco      = [210.00, 297.00];				

// Número de linha e espaçamento das etiquetas (informações de acordo com Pimaco)
var numeroLinhas        = 20;			
var densidadeHorizontal = 47.50;

// Tamanho da etiqueta (informações de acordo com Pimaco)
var altura   = 12.70
var largura  = 44.00;			

/*	
	Criamos a folha de acordo com as dimenssões dadas pela Pimaco
*/

doc = new PDFDocument({
	size: papelCartaPimaco,
	margins: {
    	top: 12.70, 
    	bottom: 17.70,
    	left: 14.50,
    	right: 14.50
 	}
});
	

/*
	Abaixo vamos criar um retangulo passando os parametros da configuração da etiqueta
	abaixo a sintax do PDFKit para criação de um retangulo.

	doc.lineWidth(-30); 					// Informamos a espeçura da linha do retangulo
	.rect(eixo X, eixo Y, largura, altura) //  Informamos como  desenhar o retangulo em nosso PDF dand as cordenadas

	Criamos o 'esqueleto vazio da etiqueta pimaco'
*/

// Escolhemos o tamanho da fonte
doc.fontSize(8);

// Vamos escrever nas etiquetas
	
	//Quero setar a estrutura das etiquetas 
	setarEstrutura();

	//Vamos popular com as etiquetas
	for(var i=1; i<=numeroLinhas; i++){

		/*
			O 'i' corresponde a linha que estou imprimindo.
	
			14.50 + 3 -> É utilizado para centralizar o nome caso o nome não estja no centro pois '14.50' é a margem a esquerda
			então adicionamos ele mais para 'dentro' da margem
	
			Fizemos isso mesma coisa com a altura adicionamos um pouco para baixo da margem.
		*/

		// Espaçamentos coluna 01 
		setarTextoEtiqueta('Thiago', (14.50 + 3),  (altura * i + 3));

		// Espaçamentos coluna 02
		setarTextoEtiqueta('Thiago', (62.00 + 3),  (altura * i + 3));

		// Espaçamentos coluna 03
		setarTextoEtiqueta('Thiago', (109.05 + 3), (altura * i + 3));

		// Espaçamentos coluna 04
		setarTextoEtiqueta('Thiago', (157.00 + 3), (altura * i + 3)); 				
	}

/*
	Finaliza o PDF e gera ele;
*/			
doc.end();			

/*
   Utilizado para mostrar diretamente na tela o PDF
*/
doc.pipe(res);
