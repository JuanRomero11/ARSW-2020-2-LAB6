api = (function () {


    function getFunctionsByCinema(cinema_name, callback) {//cinemas/{nombre}
        $.getJSON("http://localhost:8080/cinemas/" + cinema_name, function (data) {
            callback(data);
        });
    }

    function getFunctionsByCinemaAndDate(cinema_name, fdate, callback) {//cinemas/{nombre}/{fecha}
        $.getJSON("http://localhost:8080/cinemas/" + cinema_name +"/"+ fdate, function (data) {
            callback(data);
        });
    }

    function getFunctionByNameAndDate(cinema_name, fdate, movie_name, callback) {//cinemas//{nombre}/{fecha}/{nombrePelicula}
        $.getJSON("http://localhost:8080/cinemas/"+cinema_name+"/"+ fdate+"/"+movie_name, function (data) {
            callback(data);
        });
    }

	function update(cinema_name,  fdate, movie_name, cc){
			return $.ajax({
		    url: "http://localhost:8080/cinemas/"+cinema_name,
		    type: 'PUT',
			data: JSON.stringify(cc),
			//data: '{"movie":{"name":"SuperHeroes Movie","genre":"Action"},"seats":[[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]],"date":"2018-12-18 15:30"}', 
		   	///data: '{"name":"CineColombia","functions":[{"movie":{"name":"La vengaza de Danielo","genre":"Action"},"seats":[[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]],"date":"2018-12-18 15:3033333333333"},{"movie":{"name":"La vengaza de Karón","genre":"Horror"},"seats":[[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]],"date":"2018-12-18 15:30"}',
			//data: '{"movie":{"name":"pruebioooo","genre":"Action"},"seats":[[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]],"date":"2018-12-18 15:31"}',
		    contentType: "application/json"
		});
	}

    return {
        getFunctionsByCinema: getFunctionsByCinema,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        getFunctionByNameAndDate: getFunctionByNameAndDate,
		update:update

    }

})();

