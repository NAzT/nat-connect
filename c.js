var piWifi = require('pi-wifi');


  let ssid = 'ampere';
  let passwd = 'espertap'
  console.log(ssid, passwd)
    piWifi.connect(ssid, passwd , function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log('Successful connection!');
    }); 
