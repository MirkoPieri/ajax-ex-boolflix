$(document).ready(function() {


$("header button").click(function() {

  var ricercaUtente = $("header input").val();
  console.log(ricercaUtente);
  // pulizia dell'html ad ogni ricerca
  $(".general").html("");

  // chiamata ajax
  $.ajax (
    {
      url: "https://api.themoviedb.org/3/search/movie?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
      data: {"query": ricercaUtente}, //query per ricerca film digitato
      method: "GET",
      success: function(data) {
        var risultato = data;
        console.log(risultato);
        var arrayRisultati = risultato.results;
        var lunghezza = arrayRisultati.length;
        console.log(lunghezza);

        // handlebars per stampare su schermo i risultati
        var source   = document.getElementById("template").innerHTML;
        var template = Handlebars.compile(source);

        // ciclo per prendere tutti gli elementi restituiti dalla chiamata ajax
        for (var i = 0; i < lunghezza; i++) {
          var context = {titolo: arrayRisultati[i].title, originalTitle: arrayRisultati[i].original_title, lingua: arrayRisultati[i].original_language, voto: arrayRisultati[i].vote_average};
          var html = template(context);
          $(".general").append(html);
        }

      },
      error: function (richiesta,stato,errore) {
        alert("problema sul server", errore);
      }
  }
)
});


});
