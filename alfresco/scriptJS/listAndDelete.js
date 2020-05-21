//a raiz de un nodo seleccionado en el share, y abrir consola JS.
//listar todos los nodos que hay debajo y borrarlos
function listarNodosyBorrar(nodo) {

    if (nodo.isDocument) {
        logger.log("nodo" + nodo.getName());
        nodo.removeNode(nodo);
    }

    if (nodo.isContainer) {
        var nodes = nodo.children;
        for (var i = 0; i < nodes.length; i++) {
            logger.log(i + "nodes" + nodes[i].getName());
            if (nodes[i].isDocument) nodes[i].removeNode(nodes[i]);
            else if (nodes[i].isContainer) listarNodosyBorrar(nodes[i]);
        }
    }
    return true;
}
logger.log("document" + document.getDisplayPath());
logger.log("document" + document.getName());
listarNodosyBorrar(document);
