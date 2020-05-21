//Buscar en carpetas de ciertos tipos, pero no de otros tipos y pillar el path.
var nodos = search.luceneSearch("TYPE: \"cm:folder\" AND NOT TYPE: \"un:type\" AND PATH: \""+ document.getQnamePath() +"//*\//*\"");
logger.log("nodos:" + nodos.length);
var hijosTotales = 0;
var docTotales = 0;
var docBorrados = 0;

//mirar en dos niveles debajo de una estructura
for (var i = 0; i < nodos.length; i++){
//buscamos hijos de un type concreto.
	var hijos = search.luceneSearch("TYPE: \"un:type\" AND PATH: \""+ nodos[i].getQnamePath() +"//*\"");
	//hijos de cada carpeta de nivel 2
	logger.log(nodos[i].getName() + "::" + hijos.length);
	hijosTotales += hijos.length;
  //sumamos los hijos
	for (var j = 0; j < hijos.length; j++){
    //en el segundo nivel pillamos los de otro type distintos, documentos
		var documentos = search.luceneSearch("TYPE: \"un:typeDoc\" AND PATH: \""+ hijos[j].getQnamePath() +"//*\"");
		logger.log(hijos[j].getName() + "::" + documentos.length);
    //contamos los docs
		docTotales += documentos.length;
		for (var k = 0; k < documentos.length; k++){
    //borrar los nodos encontrados
			documentos[k].remove();
			//documentos[k].removeNode(documentos[k]);
      //contar borrados
			docBorrados += 1;
		}
	}
}
//hijos de todo el mes.
logger.log("Expedientes:" + hijosTotales);
//docs contados
logger.log("Documentos:" + docTotales);
//docs borrados deben coincidir, ;)
logger.log("docBorrados:" + docBorrados);
