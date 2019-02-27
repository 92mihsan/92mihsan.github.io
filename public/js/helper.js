var convertDate = date => {


//console.log(date);

var stillUtc = moment.utc(date).toDate();
var local = moment(stillUtc).format('dddd, DD MMMM YYYY HH:mm');

return local ;
}
