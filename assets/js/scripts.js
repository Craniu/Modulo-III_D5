const listaTareas = [
    {id: 1, nombre: "Pasear al Ganso", completada: false},
    {id: 2, nombre: "Bañar al Ganso", completada: true},
    {id: 3, nombre: "Darle Cariño al Ganso", completada: false}
];

const encontrarCorrelativo = function() {
    const ordenado = listaTareas.sort((x,y)=> x.id - y.id)
    console.log(ordenado)
    let correlativo = ordenado.length -1;
    return listaTareas[correlativo].id;
}

const borrarTarea = function(id) {
    listaTareas.splice(listaTareas.findIndex((item)=>item.id == id), 1);
    cargarResumen();
    cargarLista();
};

const cambiarEstado = function(id,estado){
    indice = listaTareas.findIndex((item)=>item.id == id)
    listaTareas[indice].completada = estado;
    cargarResumen();
    cargarLista();
}

const agregarTarea = function(){
    const txtIn = document.querySelector("#txtIn");
    if(txtIn.value != ""){
        let nombre = txtIn.value;
        listaTareas.push({id:encontrarCorrelativo()+1, nombre:nombre, completada: false});
    }else{
        alert("Debe ingresar una tarea.");
    }
    cargarResumen();
cargarLista();
}

const cargarLista = function(){
    const docLista = document.querySelector("#lista");
    let html = "<tr><th>ID</th><th>Tarea</th><th>Completada</th><th>Borrar</th></tr>";
    for(let item of listaTareas){
        html += `
            <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td><input type="checkbox" ${item.completada? "checked=true":""} onchange="cambiarEstado(${item.id},${item.completada? false:true })"></td>
            <td><a href="javascript:borrarTarea(${item.id})"><img src="./assets/img/delete.png"></a></td>
        `;
    }
    docLista.innerHTML = html;
};

const cargarResumen =function(){
    const docResumen = document.querySelector(".resumen");
    let total = listaTareas.length;
    let completadas = listaTareas.filter((x)=>x.completada == true).length;
    docResumen.innerHTML= `
        <p>Total: ${total}</p>
        <p>Realizadas: ${completadas}</p>
    `;
}

const btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click",()=>agregarTarea());

cargarResumen();
cargarLista();