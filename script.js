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
        var pagine = data.total_pages;
        var risultato = data;
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
          // for per stampare tutte le pagine
        for (var i = 1; i <= pagine; i++) {
          var page = i;

          $.ajax (
            {
              url: "https://api.themoviedb.org/3/search/movie?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
              data: {"query": ricercaUtente, "page": page }, //query per ricerca film digitato
              method: "GET",
              success: function(data) {

                var risultato = data;
                console.log(risultato);

                var arrayRisultati = risultato.results;
                var lunghezza = arrayRisultati.length;

                // handlebars per stampare su schermo i risultati

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
                  // stampa dei risultati a schermo
                  // condizione per verificare presenza immagine copertina
                  if (immagine == null) {
                    var source   = document.getElementById("templateNull").innerHTML;
                    var template = Handlebars.compile(source);

                    var context = {titolo: arrayRisultati[i].title, originalTitle: arrayRisultati[i].original_title, lingua: arrayRisultati[i].original_language, voto: votoStella, tipo: "Film", overview: arrayRisultati[i].overview };
                  } else {
                    var source   = document.getElementById("template").innerHTML;
                    var template = Handlebars.compile(source);

                    var context = {titolo: arrayRisultati[i].title, originalTitle: arrayRisultati[i].original_title, lingua: arrayRisultati[i].original_language, voto: votoStella, tipo: "Film", url: 'https://image.tmdb.org/t/p/w300' + immagine, overview: arrayRisultati[i].overview };
                  }
                  var html = template(context);
                  $(".general").append(html);

                  // funzione per sostituire le varie valutazioni con le rispettive stelle
                  $(".film .valutazione").each(function() {
                    switch (true) {
                      case votoStella === 1:
                        $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                        break;
                      case votoStella === 2:
                        $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                        break;
                      case votoStella === 3:
                        $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                        break;
                      case votoStella === 4:
                      $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>');
                        break;
                      case votoStella === 5:
                      $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>');
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
                      case language === "ja":
                        $(this).replaceWith('<img src="image/ja.png" alt="lingua">');
                      break;
                      case language === "de":
                        $(this).replaceWith('<img src="image/de.png" alt="lingua">');
                      break;
                      default:
                    }
                  });
                }
              // }
            },
            error: function (richiesta,stato,errore) {
              alert("problema sul server", errore);
            }
          }); // chiusura seconda chiamata
        } //chiusura for pagine
      }
      },
      error: function (richiesta,stato,errore) {
        alert("problema sul server", errore);
      }
  } // chiusura funzione prima chiamata ajax
) // chiusura prima chiamata ajax



// chiamata ajax
// chiamata serie tv
$.ajax (
  {
    url: "https://api.themoviedb.org/3/search/tv?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
    data: {"query": ricercaUtente}, //query per ricerca film digitato
    method: "GET",
    success: function(data) {

      var pagine = data.total_pages;

      var risultatoTv = data;
      console.log(risultatoTv);
      var arrayRisultatiTv = risultatoTv.results;
      var lunghezzaTv = arrayRisultatiTv.length;

      if (lunghezzaTv === 0) {
            var nessunRisultato = '"' + ricercaUtente + '"' + ", " + "nessuna serieTv trovata.";
            var source   = document.getElementById("template1").innerHTML;
            var template = Handlebars.compile(source);
            var context = {notfound: nessunRisultato};
            var html = template(context);
            $(".general").append(html);

    } else {

      for (var i = 1; i <= pagine; i++) {
        var page = i;

      $.ajax (
        {
          url: "https://api.themoviedb.org/3/search/tv?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
          data: {"query": ricercaUtente, "page": page }, //query per ricerca film digitato
          method: "GET",
          success: function(data) {

              var risultatoTv = data;
              console.log(risultatoTv);
              var arrayRisultatiTv = risultatoTv.results;
              var lunghezzaTv = arrayRisultatiTv.length;

                      // tentativo aggiunta genere film
                      // var genereTv = [];
                      //   $.ajax (
                      //     {
                      //       url: "https://api.themoviedb.org/3/genre/tv/list?api_key=7281fa587a1cb4960ded5c5f97ee3e8d",
                      //       method: "GET",
                      //       success: function(data) {
                      //       var genere = data.genres;
                      //       genereTv.push(genere);
                      //       },
                      //       error: function (richiesta,stato,errore) {
                      //       alert("problema sul server", errore);
                      //       }
                      //     }
                      //   )
                      //     console.log(genereTv.[0].length, "genere");

                        // ciclo per prendere tutti gli elementi restituiti dalla chiamata ajax
                        for (var i = 0; i < lunghezzaTv; i++) {

                          // var genereSerie = arrayRisultatiTv[i].genre_ids;
                          // console.log(genereSerie,"adesso");
                          // for (var j = 0; j < genereSerie.length; j++) {
                          //   for (var z = 0; z < genereTv[0].length; z++) {
                          //     if (genereSerie[j] === genereTv[z].id) {
                          //       var genereTrovato = genereTv[z].name;
                          //       console.log(genereTrovato, "trovato");
                          //     }
                          //   }
                          // }
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
                        var immagine = arrayRisultatiTv[i].poster_path;
                        // cindizione per verificare presenza copertina serieTv
                        if (immagine == null) {
                          var source   = document.getElementById("templateNull").innerHTML;
                          var template = Handlebars.compile(source);
                          var context = {titolo: arrayRisultatiTv[i].name, originalTitle: arrayRisultatiTv[i].original_name, lingua: arrayRisultatiTv[i].original_language, voto: votoStella, overview: arrayRisultatiTv[i].overview};
                        } else {
                          var source   = document.getElementById("template").innerHTML;
                          var template = Handlebars.compile(source);

                          var context = {titolo: arrayRisultatiTv[i].name, originalTitle: arrayRisultatiTv[i].original_name, lingua: arrayRisultatiTv[i].original_language, voto: votoStella, tipo: 'Tv', url: 'https://image.tmdb.org/t/p/w300' + immagine, overview: arrayRisultatiTv[i].overview};
                        }
                        // stampa dei risultati a schermo
                        var html = template(context);
                        $(".general").append(html);

                        // funzione per sostituire le varie valutazioni con le rispettive stelle
                        $(".film .valutazione").each(function() {
                          switch (true) {
                            case votoStella === 1:
                              $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                              break;
                            case votoStella === 2:
                              $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                              break;
                            case votoStella === 3:
                              $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>');
                              break;
                            case votoStella === 4:
                            $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>');
                              break;
                            case votoStella === 5:
                            $(this).replaceWith('<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>');
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
                            case language === "ja":
                            $(this).replaceWith('<img src="image/ja.png" alt="lingua">');
                            break;
                            case language === "de":
                              $(this).replaceWith('<img src="image/de.png" alt="lingua">');
                            break;
                            default:
                          }
                      });
                    }


              },
              error: function (richiesta,stato,errore) {
              alert("problema sul server", errore);
              }
          }); // chiusura seconda chiamata serie tv
        } //chiusura for pagine serie tv
       }
      },
      error: function (richiesta,stato,errore) {
      alert("problema sul server", errore);
      }
    } // chiusura funzione prima chiamata ajax serie tv
  ) // chiusura prima chiamata ajax serie tv
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
