function setarTextoEtiqueta(texto, marginEsquerda, marginSuperior){

	doc.text(texto, marginEsquerda,  marginSuperior, {height: altura, width:largura, align: 'center'} )
}	    	

/*
	Adicionando os módulos necessários				
*/
var PDFDocument = require('pdfkit');                      
var fs 			= require('fs');		

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
var altura              = 12.70;
var largura             = 44.40;			

/*	
	Criamos a folha de acordo com as dimenssões dadas pela Pimaco
*/

doc = new PDFDocument({
	size: papelCartaPimaco,
	margins: {
    	top: 12.70,
    	bottom: 12.70, 	        	
    	left: 14.50,
    	right: 14.50
 	}
});			

// Escolhemos o tamanho da fonte
doc.fontSize(6); 			

	//Vamos popular com as etiquetas
	for(var i=1; i<=numeroLinhas; i++){

		/*
		O i corresponde a linha que estou imprimindo.

		14.50 + 3 -> É utilizado para centralizar o nome caso o nome não estja no centro pois '14.50' é a margem a esquerda
		então adicionamos ele mais para 'dentro' da margem

		Fizemos isso mesma coisa com a altura adicionamos um pouco para baixo da margem.
		*/

		// Espaçamentos coluna 01  				

		if(i == 1){ 					
			setarTextoEtiqueta('CIE 0000' + i, 5.50, altura);
		}

		if(i>1 && i<=6){
			setarTextoEtiqueta('CIE 0000' + i, 5.50,  (altura * i) + (i/2) );
		}
		
		if(i>6 && i<=10){
			setarTextoEtiqueta('CIE 0000' + i, 5.50,  (altura * i) + (i/1.5));
		}

		if(i>10 && i<=numeroLinhas){
			setarTextoEtiqueta('CIE 0000' + i, 5.50,  (altura * i) + (i/1.7)); // maior a divisão mais para cima ele insere o texto
		} 				
	}

/*
	Finaliza o PDF e gera ele;
*/			
doc.end();			

/*
   Utilizado para mostrar diretamente na tela o PDF
*/
doc.pipe(res);