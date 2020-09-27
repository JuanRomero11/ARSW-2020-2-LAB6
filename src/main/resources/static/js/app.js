app = (function () {

    var cine;
    var fecha;
	var moduloApimock="js/apimock.js";
	var moduloApiclient="js/apiclient.js";
	var va=  {movie:{name:null,genre:null},seats:[],date:null};
        var datosApi;
        
       

  

    function getFunctionsByCinemaAndDate() {
        cine = $("#nombre").val();
        fecha = $("#fecha").val();
        
        console.info(fecha);
        $.getScript(moduloApiclient, function(){
           api.getFunctionsByCinemaAndDate(cine, fecha, mapElemtosObjetos);
        });
    }

    function mapElemtosObjetos(datos) {
        var mapeoDatos = datos.map(function (val) {
            return {movieName: val.movie.name, 
				genre: val.movie.genre, 
				hour: val.date.substring(11, 16)};
        })
        rellenarTabla(mapeoDatos);
    }

    function rellenarTabla(datos) {
        var canvas = document.getElementById("canvitas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        datosApi =datos;
        $("#nombreCine").text("Cinema selected:"+cine);
        var tabla = $("table");
        var body = $("tbody");
        if (body != null) {body.remove();}
        
		tabla.append("<tbody>");
		var tblBody = $("tbody");
                
		datos.map(function(movie){
                    va.movie.name= movie.movieName;
                    va.movie.genre= movie.genre;
            var fila = '<tr><td>' + movie.movieName + '</td><td>' 
				+ movie.genre + '</td><td>' 
				+ movie.hour + '</td><td>' + 
				"<input type='button' class='show' value='Disponibilidad' onclick=" + 
				"app.busquedaSillas()" + 
				"></input>" + '</tr>';
            tblBody.append(fila);
        })
        tabla.append(tblBody);
        tabla.append("</tbody>");
    }



    function busquedaSillas() {
        var canvas = document.getElementById("canvitas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        var movieName;
        var hora;
        datosApi.map(function(val){
            movieName = val.movieName;
            hora = val.hour;
        })
        $("#moviename").text("Seats:"+movieName);
        $.getScript(moduloApiclient, function(){
            
            console.info(" entreeeeeee ");
            api.getFunctionByNameAndDate(cine,fecha,movieName,insertarSillas);
            console.info(" saliiiiiiiiiii ");
        });
    }

    function insertarSillas(datos) {
        va.seats = datos;
        
        // var asientos = datos.seats;
        var a = document.getElementById("canvitas");
        var atx = a.getContext("2d");
		var y=40;
		for (i of datos){
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
	var newDate = $("#nombre1").val();
        va.date=newDate;
        fecha=newDate;
        console.info(va);
        console.info(cine);
	$.getScript(moduloApiclient, function(){
            api.update(cine,va);
        });
        app.getFunctionsByCinemaAndDate();
    }
        

    return {
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        busquedaSillas: busquedaSillas,
        salvar:salvar
    }

})();
