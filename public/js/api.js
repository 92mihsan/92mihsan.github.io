var base_url = "https://api.football-data.org/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.message);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getKlasemen() {
  if ('caches' in window) {
    caches.match(base_url+'v2/competitions/2014/standings').then(function(response) {
      if (response) {

        response.json().then(function (data) {
          htmlKlaemen(data)
        })
      }
    })
  }
  
   fetch(base_url + "v2/competitions/2014/standings", {
    headers: {
      "X-Auth-Token": "a034b1f521b04bae834c705cd27c5a62"
    }
  })
  
   .then(json)
   .then(function(data) {
           
            console.log(data);
htmlKlaemen(data)

    });
}

function getTeamById() {

  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  fetch(base_url + "v2/teams/" + idParam, {
    headers: {
      "X-Auth-Token": "a034b1f521b04bae834c705cd27c5a62"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      
        var competitions = "";
        var squad = "";

        data.activeCompetitions.forEach(function (compe){
            
                competitions += `         
                      <ol>${compe.name}</ol>
                    `;

          });

        data.squad.forEach(function (player){
            
                squad += `         
                      <tr>
                        <td>${player.name}</td>
                        <td>${player.position}</td>
                      </tr>
                    `;

          });

        var articleAtas = `
          
            <h3 class="title center">${data.name}</h3>
            <div class="card-image waves-effect waves-block waves-light">
                <img id="image" src="${data.crestUrl}" />
            </div>
            <br>
          
        `;

        var articleHTML = `
                   
            <div class="card-content"> 
              <ul>
                <li>Venue : ${data.venue}</li>                
                <li>Address : ${data.address}</li>
                <li>Website : ${data.venue}</li>
                <li>Competitions :
                  <ul>`+competitions+ `</ul>
                </li>
                
              </ul>                           
            </div>

  
        `;
        var articleSquad = `
         
              <table class="striped">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Posisi</th>
                  </tr>
                </thead>
              `+squad+ `
              </table>

        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("content").innerHTML = articleAtas;
      document.getElementById("overview").innerHTML = articleHTML;
      document.getElementById("player").innerHTML = articleSquad;

  });
}

function getScheduleById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  fetch(base_url + "v2/teams/"+ idParam+"/matches?status=SCHEDULED" , {
    headers: {
      "X-Auth-Token": "a034b1f521b04bae834c705cd27c5a62"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);

      var articlesHTML = "";
      // Menyusun komponen card artikel secara dinamis
      data.matches.forEach(function (jadwal){
             articlesHTML += `
          <div class="card" >
                <div class="center-align"><b>${jadwal.competition.name}</b></div>
                <div class="center-align">${convertDate(new Date(jadwal.utcDate))}</div>
                <div class="row match">
                  <div class="col s4 center-align">${jadwal.homeTeam.name}</div>
                  <div class="col s4 center-align">vs</div>
                  <div class="col s4 center-align" textSize ='20px'>${jadwal.awayTeam.name}</div>
                </div>                   
                <div class="center-align"><a href="./match.html?id=${jadwal.id}" class="waves-effect waves-light btn-small">Detail Matches</a></div>
          </div>

        `;
          });

        
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("match").innerHTML = articlesHTML;
    });
}

function getSchedule() {
  fetch(base_url + "v2/competitions/2014/matches?status=SCHEDULED" , {
    headers: {
      "X-Auth-Token": "a034b1f521b04bae834c705cd27c5a62"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);

      var articlesHTML = "";
      // Menyusun komponen card artikel secara dinamis
      data.matches.forEach(function (jadwal){
             articlesHTML += `
          <div class="card" >
               <div class="center-align"><h5>Matchday</h4></div>
               <div class="center-align"><b>${jadwal.matchday}</b></div>
                <div class="center-align">${convertDate(new Date(jadwal.utcDate))}</div>
                <div class="row match">
                  <div class="col s4 center-align">${jadwal.homeTeam.name}</div>
                  <div class="col s4 center-align">vs</div>
                  <div class="col s4 center-align" textSize ='20px'>${jadwal.awayTeam.name}</div>
                </div>
                <div class="center-align"><a href="./match.html?id=${jadwal.id}" class="waves-effect waves-light btn-small">Detail Matches</a></div>
          </div>

        `;
          });

        
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("match").innerHTML = articlesHTML;
    });
}

function getScheduleDetail() {
  // Ambil nilai query parameter (?id=)
  return new Promise(function (resolve, reject){
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  fetch(base_url + "v2/matches/"+ idParam, {
    headers: {
      "X-Auth-Token": "a034b1f521b04bae834c705cd27c5a62"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
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

        resolve(data);

    })
  });
}

function htmlKlaemen(data){
  var klasemenHTML = "";
          var tabelHTML = "";
          
          data.standings[0].table.forEach(function (tabel){
            var url = tabel.team.crestUrl;
            //console.log(url);

            url = url.replace(/^http:\/\//i, 'https://');
            //console.log(url);
                tabelHTML += `            
                      <tr>
                        <td>${tabel.position}</td>
                        <td><img  class="logoClub" src="${url}"><a href="./team.html?id=${tabel.team.id}">${tabel.team.name}</a></td>
                        <td>${tabel.playedGames}</td>
                        <td>${tabel.won}</td>
                        <td>${tabel.lost}</td>
                        <td>${tabel.goalDifference}</td>
                        <td>${tabel.points}</td>
                      </tr>
                    `;

          });

          klasemenHTML += `
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Club</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Lost</th>
                  <th>+/-</th>
                  <th>Points</th>
                </tr>
              </thead>`+tabelHTML;

           // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("klasemen").innerHTML = klasemenHTML;
}