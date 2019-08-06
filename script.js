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
            // modifica del voto ad una scala da 1 a 5 con arrotondamento per eccesso
            var stella = arrayRisultati[i].vote_average / 2;
            var votoStella = Math.round(stella);
            // variabile per salvare la lingua
            var language = arrayRisultati[i].original_language;
            // condizione se il film è senza classificazione
            if (votoStella === 0) {
              votoStella = "Non Classificato";
            }
            // stampa dei risultati a schermo
            var context = {titolo: arrayRisultati[i].title, originalTitle: arrayRisultati[i].original_title, lingua: arrayRisultati[i].original_language, voto: votoStella};
            var html = template(context);
            $(".general").append(html);
            console.log(votoStella, "questo voto stella");

            // funzione per sostituire le varie valutazioni con le rispettive stelle
            $(".film .valutazione").each(function() {
              switch (true) {
                case votoStella === 1:
                  $(this).replaceWith('<img src="image/star.png" alt="stella">');
                  break;
                case votoStella === 2:
                  $(this).replaceWith('<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">');
                  break;
                case votoStella === 3:
                  $(this).replaceWith('<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">');
                  break;
                case votoStella === 4:
                $(this).replaceWith('<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">');
                  break;
                case votoStella === 5:
                $(this).replaceWith('<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">' + '<img src="image/star.png" alt="stella">');
                  break;
                default:
              }
            });

            // funzione per sostituire nome lingua film con bandiera corrispondente
            $(".film .lingua").each(function() {
              switch (true) {
                case language === "en":
                  $(this).replaceWith('<img src="image/en.png" alt="lingua">');
                  break;
                case language === "it":
                  $(this).replaceWith('<img src="image/it.png" alt="lingua">');
                  break;
                case language === "et":
                  $(this).replaceWith('<img src="image/et.png" alt="lingua">');
                  break;
                case language === "pt":
                $(this).replaceWith('<img src="image/pt.png" alt="lingua">');
                  break;
                  case language === "":
                  $(this).replaceWith('Lingua non disponibile');
                    break;
                default:
              }
            });
          }
      },
      error: function (richiesta,stato,errore) {
        alert("problema sul server", errore);
      }
  }
)
});


});
