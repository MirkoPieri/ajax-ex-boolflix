$(document).ready(function() {


// $("header button").click(myfunction);

$("header input").keyup(function() {
  if (event.which == 13) {
    myfunction();
  }
});

  function myfunction() {

  var ricercaUtente = $("header input").val();
  console.log(ricercaUtente);
  // pulizia dell'html ad ogni ricerca
  $(".general").html("");
  //pulizia input ad ogni ricerca
  $("header input").val("");

  // chiamata ajax
  // chiamata per film
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
        // condizione se esiste qualcosa cercata dall'utente
        if (lunghezza === 0) {
          var nessunRisultato = '"' + ricercaUtente + '"' + ", " + "nessun Film trovato.";
          var source   = document.getElementById("template1").innerHTML;
          var template = Handlebars.compile(source);
          var context = {notfound: nessunRisultato};
          var html = template(context);
          $(".general").append(html);
        } else {
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

            var immagine = arrayRisultati[i].poster_path;
            console.log(immagine, "immagine");
            // stampa dei risultati a schermo
            var context = {titolo: arrayRisultati[i].title, originalTitle: arrayRisultati[i].original_title, lingua: arrayRisultati[i].original_language, voto: votoStella, tipo: "Film", url: 'https://image.tmdb.org/t/p/w300' + immagine, overview: arrayRisultati[i].overview };
            var html = template(context);
            $(".general").append(html);

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
        }
      },
      error: function (richiesta,stato,errore) {
        alert("problema sul server", errore);
      }
  }
)



// chiamata ajax
// chiamata serie tv
$.ajax (
  {
    url: "https://api.themoviedb.org/3/search/tv?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
    data: {"query": ricercaUtente}, //query per ricerca film digitato
    method: "GET",
    success: function(data) {

      var risultatoTv = data;
      console.log(risultatoTv);
      var arrayRisultatiTv = risultatoTv.results;
      var lunghezzaTv = arrayRisultatiTv.length;
      console.log(lunghezzaTv);
      if (lunghezzaTv === 0) {
            var nessunRisultato = '"' + ricercaUtente + '"' + ", " + "nessuna serieTv trovata.";
            var source   = document.getElementById("template1").innerHTML;
            var template = Handlebars.compile(source);
            var context = {notfound: nessunRisultato};
            var html = template(context);
            $(".general").append(html);
          } else {
      // handlebars per stampare su schermo i risultati
      var source   = document.getElementById("template").innerHTML;
      var template = Handlebars.compile(source);
        // ciclo per prendere tutti gli elementi restituiti dalla chiamata ajax
        for (var i = 0; i < lunghezzaTv; i++) {
          // modifica del voto ad una scala da 1 a 5 con arrotondamento per eccesso
          var stella = arrayRisultatiTv[i].vote_average / 2;
          var votoStella = Math.round(stella);
          // variabile per salvare la lingua
          var language = arrayRisultatiTv[i].original_language;
          // condizione se il film è senza classificazione
          if (votoStella === 0) {
            votoStella = "Non Classificato";
          }
          // variabile per salvare url immagine
          var immagine = 'https://image.tmdb.org/t/p/w300' + arrayRisultatiTv[i].poster_path;
          // stampa dei risultati a schermo
          var context = {titolo: arrayRisultatiTv[i].name, originalTitle: arrayRisultatiTv[i].original_name, lingua: arrayRisultatiTv[i].original_language, voto: votoStella, tipo: 'Tv', url: immagine, overview: arrayRisultatiTv[i].overview};
          var html = template(context);
          $(".general").append(html);

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
        }
    },
    error: function (richiesta,stato,errore) {
      alert("problema sul server", errore);
    }
}

)
}
// mostrare infromazioni film al passaggio del mouse
$(".general").on('mouseenter', '.film .imageFilm', function() {
  var elementoSelezionato = $(this).children(":hidden");
  $(elementoSelezionato).addClass("active");
});

$(".general").on('mouseleave', '.film', function() {
  var elementoSelezionato = $(this).children(":hidden");
  $(".info").removeClass("active");
});

});
