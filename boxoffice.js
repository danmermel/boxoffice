// extract the gig address from command-line parameters
var argv = process.argv;
var gig_address = argv[2];
if (!gig_address) {
  console.error('You must supply a gig address');
  process.exit(1);
}
console.log('gig_address', gig_address);

// get Cloudant URL from environment
var CLOUDANT_URL = process.env.CLOUDANT_URL;
if (!CLOUDANT_URL) {
  console.error('You must have a CLOUDANT_URL');
  process.exit(1);
}

// Create the database;
var donothing = function() { };
var dbname = "gig_" + gig_address;
var db = require('silverlining')(CLOUDANT_URL, dbname);
db.create().then(donothing).catch(donothing);

// create gig in web3
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8000'));
var abi = [{"constant":true,"inputs":[],"name":"seat_count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_seat_address1","type":"address"},{"name":"_seat_address2","type":"address"},{"name":"_seat_address3","type":"address"},{"name":"_seat_address4","type":"address"}],"name":"buy_seats","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"artist","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"event_owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"seating_plan","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"venue","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_seat_to_redeem","type":"address"}],"name":"redemption_challenge","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_seat_to_redeem","type":"address"}],"name":"redeem_ticket","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"seating_list","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_seat_address","type":"address"}],"name":"buy_seat","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"event_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"event_name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"seats_sold","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_seat_name","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_sellable_from","type":"uint256"},{"name":"_sellable_until","type":"uint256"}],"name":"create_seat","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_venue","type":"bytes32"},{"name":"_event_name","type":"bytes32"},{"name":"_event_time","type":"uint256"},{"name":"_artist","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"seat_address","type":"address"}],"name":"Log_seat_created","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"seat_bought","type":"address"}],"name":"Log_seat_bought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticket_redeemed","type":"address"},{"indexed":false,"name":"redeemer","type":"address"}],"name":"Log_ticket_redeemed","type":"event"}]; 
var gig = web3.eth.contract(abi).at(gig_address);
console.log(gig);
/*gig.event_name(function(err, data) {
  console.log(err, data);
});*/
var events = gig.allEvents();

events.watch(function(error, event) {
  console.log('EVENT!', JSON.stringify(event));
  // {"address":"0x406d44eaeec9dc63d6ccde851253597c42827081","blockNumber":null,"transactionIndex":0,"transactionHash":"0x0000000000000000000000000000000000000000000000000000000000000000","blockHash":null,"logIndex":0,"removed":false,"event":"Log_seat_created","args":{"seat_address":"0x6593923764ff52643f3d9ec194749564c90dc8a7"}}

});
