function openDatabase(){
    var dbPromise = idb.openDb("football", 1, function(upgradeDb){
        if (!upgradeDb.objectStoreNames.contains("jadwal_tanding")) {
            var jadwalTandingFav = upgradeDb.createObjectStore("jadwal_tanding", {
                keyPath: "id"
            });
            
            jadwalTandingFav.createIndex("homeTeam", "match.homeTeam.name", {
                unique: false
            });

            jadwalTandingFav.createIndex("awayTeam", "match.awayTeam.name", {
                unique: false
            });                   
        }
        
    });

    return dbPromise;
}