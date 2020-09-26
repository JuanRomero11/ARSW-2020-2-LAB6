app = (function () {

    var cine;
    var fecha;
	var moduloApimock="js/apimock.js";
	var moduloApiclient="js/apiclient.js";
	var va=  {name:null,seats:[],date:null};
        var datafunction;

    function cambiarNombre() {
        cine = nuevoNombre;
    }


    function cambiarFecha() {
        fecha = nuevaFecha;
    }

    function getFunctionsByCinemaAndDate() {
        cine = $("#nombre").val();
        fecha = $("#fecha").val();
        $.getScript(moduloApimock, function(){
           api.getFunctionsByCinemaAndDate(cine, fecha, mapElemtosObjetos);
        });
    }

    function mapElemtosObjetos(datos) {
        prueba(datos);
        var mapeoDatos = datos.map(function (val) {
            return {movieName: val.movie.name, 
				genre: val.movie.genre, 
				hour: val.date.substring(11, 16)};
        })
		
        rellenarTabla(mapeoDatos);
    }
	function prueba (datos){
		var mapeoDatos2= datos.map(function (val) {
            return {movieName: val.movie.name, 
				genre: val.movie.genre, 
				hour: val.date.substring(11, 16)};
        })
	}

    function rellenarTabla(datos) {
        $("#nombreCine").text("Cinema selected:"+cine);
        var tabla = $("table");
        var body = $("tbody");
        if (body != null) {body.remove();}
        
		tabla.append("<tbody>");
		var tblBody = $("tbody");
        
		datos.map(function (movie) {
            var fila = '<tr><td>' + movie.movieName + '</td><td>' 
				+ movie.genre + '</td><td>' 
				+ movie.hour + '</td><td>' + 
				"<input type='button' class='show' value='Disponibilidad' onclick=" + 
				"app.busquedaSillas(\""+movie.movieName+"\",\""+fecha+"\",\""+movie.hour+"\")" + 
				"></input>" + '</tr>';
            tblBody.append(fila);
        })
        tabla.append(tblBody);
        tabla.append("</tbody>");
    }


    function busquedaSillas(movie,date,hour) {
        $("#moviename").text("Seats of: "+movie);
        $.getScript(moduloApimock, function(){
            api.getFunctionByNameAndDate($("#nombre").val(),date.concat(" ",hour),movie,insertarSillas);
        });
    }

    function insertarSillas(datos) {
        dataFunction = datos;
	va=datos;
        var asientos = datos.seats;
        var a = document.getElementById("canvitas");
        var atx = a.getContext("2d");
		var y=40;
		for (i of datos.seats){
			var x=0;
			for (j of i){
				atx.fillStyle = "gray";
				if(j==false){
					atx.fillStyle = "cyan";
				}
				x+=50;
				atx.fillRect(x, y , 45, 40);
			}
			y+=55;
		}
    }

   function salvar(){
	///cinemaName = $("#name_input").val();
	//cinemaDate = $("#date_input").val();
	var newDate = "2018-12-19 17:300";
	
	va.date = newDate;
	va.movie.name="SuperHeroes Movie";
	va.movie.genre="Action";
	$.getScript(moduloApiclient, function(){
            api.update("cinemaX","2018-12-19 17:00","SuperHeroes Movie",va);
        });
        }


    return {
        cambiarNombre: cambiarNombre,
        cambiarFecha: cambiarFecha,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        busquedaSillas: busquedaSillas,
		salvar:salvar
    }

})();
