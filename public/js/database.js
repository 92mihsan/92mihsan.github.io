function createFav(dataType, isi ) {
    var storeName = "";
    var item = {}
    if (dataType == "match"){
        storeName = "jadwal_tanding"
        item = {
            id: isi.match.id,
            head2head: {
                numberOfMatches: isi.head2head.numberOfMatches,
                totalGoals: isi.head2head.totalGoals,
                homeTeam: {
                    wins:  isi.head2head.homeTeam.wins,
                    draws:  isi.head2head.homeTeam.draws,
                    losses:  isi.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins:  isi.head2head.awayTeam.wins,
                    draws:  isi.head2head.awayTeam.draws,
                    losses:  isi.head2head.awayTeam.losses
                }
            },
            match: {
                competition: {
                    name: isi.match.competition.name
                },
                utcDate: isi.match.utcDate,
                venue: isi.match.venue,
                matchday: isi.match.matchday,
                homeTeam: {
                    name: isi.match.homeTeam.name
                },
                awayTeam: {
                    name: isi.match.awayTeam.name
                }
            }          
        }
    } 

    openDatabase().then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(item);

        return tx.complate;
    }).then(function () {
        console.log('berhasil di simpan');
        document.getElementById("iconFav").innerHTML = "favorite";
        M.toast({
            html: 'Data berhasil disimpan'
        });
    }).catch(function() {
        M.toast({
            html: 'Tidak Tersimpan'
        });
    });
}

function getMatchById(){
  var urlParams = new URLSearchParams(window.location.search);
  var id= Number(urlParams.get("id"));

  openDatabase()
   .then(function (db){
        var tx = db.transaction("jadwal_tanding" , "readonly");
        var obj = tx.objectStore("jadwal_tanding");
        return obj.get(id);
     })
     .then(function (data) {
        console.log("getMatchById :" +data);
        var articlesHTML = `
          <div class="card" >
            <div class="center-align"><h5>${data.match.competition.name}</h5></div>
            <div class="center-align"><h6>Matchday</h6></div>
            <div class="center-align"><b>${data.match.matchday}</b></div>
            <div class="center-align">${convertDate(new Date(data.match.utcDate))}</div>
            <div class="row match">
              <div class="col s4 center-align">${data.match.homeTeam.name}</div>
              <div class="col s4 center-align">vs</div>
              <div class="col s4 center-align" textSize ='20px'>${data.match.awayTeam.name}</div>
            </div>
            <div class="center-align"><b>Venue : ${data.match.venue}</b></div>
            <br>
            <div class="center-align"><b>head to head</b></div>
            <div class="row s12">
              <div class="col s4 center-align">${data.head2head.homeTeam.wins}</div>
              <div class="col s4 center-align">win</div>
              <div class="col s4 center-align">${data.head2head.awayTeam.wins}</div>
            </div>
            <div class="row s12">
              <div class="col s4 center-align">${data.head2head.homeTeam.draws}</div>
              <div class="col s4 center-align">draw</div>
              <div class="col s4 center-align">${data.head2head.awayTeam.draws}</div>
            </div>
            <div class="row s12">
              <div class="col s4 center-align">${data.head2head.homeTeam.losses}</div>
              <div class="col s4 center-align">lose</div>
              <div class="col s4 center-align">${data.head2head.awayTeam.losses}</div>
            </div>
          </div>
        `;

        
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matchDetail").innerHTML = articlesHTML;
     });
}
function getDataMatch(){
    openDatabase()
    .then(function (db){
        var tx = db.transaction("jadwal_tanding" , "readonly");
        var obj = tx.objectStore("jadwal_tanding");
        return obj.getAll();
    })
    .then(function (data) {
        var articlesHTML = ""
        data.forEach(function (jadwal){
        articlesHTML += `
          <div class="card" >
               <div class="center-align"><h5>Matchday</h4></div>
               <div class="center-align"><b>${jadwal.match.matchday}</b></div>
                <div class="center-align">${convertDate(new Date(jadwal.match.utcDate))}</div>
                <div class="row match">
                  <div class="col s4 center-align">${jadwal.match.homeTeam.name}</div>
                  <div class="col s4 center-align">vs</div>
                  <div class="col s4 center-align" textSize ='20px'>${jadwal.match.awayTeam.name}</div>
                </div>
                <div class="center-align"><a href="./match.html?id=${jadwal.id}" class="waves-effect waves-light btn-small">Detail Matches</a></div>
          </div>

        `;
          });
        
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matches").innerHTML = articlesHTML;
    });
}

function cekFavorite(id){
    return new Promise(function (resolve, reject){
        openDatabase(idb)
            .then(function(db){
                var tx = db.transaction("jadwal_tanding", "readonly");
                var store =tx.objectStore("jadwal_tanding");
                return store.get(id);
            })
            .then(function (data){
                if (data != undefined){
                    console.log("messege = "+  data)
                    resolve("data favorite")
                } else {
                    console.log("messege = "+  data)
                    reject("bukan favorite")
                }
            });
    });
}

function deleteFavorite(data){
    openDatabase().then(function (db) {
        var tx = db.transaction("jadwal_tanding", "readwrite");
        var store =tx.objectStore("jadwal_tanding");
        store.delete(data);

        return tx.complate;
    }).then(function (){
        document.getElementById("iconFav").innerHTML = "favorite_border";
        M.toast({
            html: 'Data telah dihapus'
        });
    }).catch(function () {
        M.toast({
            html: 'Data gagal dihapus'
        });
    });
}