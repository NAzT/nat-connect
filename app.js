var piWifi = require('pi-wifi');
const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");

let config = { }
//let config = require("../config/serial");
//k
let port = new SerialPort(
    config.PORT || "/dev/ttyUSB0", {
      baudRate: parseInt(config.BAUDRATE) || 9600,
    });
 

const parser = port.pipe(new Delimiter({delimiter: "\r\n"}));
port.on("open", () => {
	  console.log("port opened.");
})

port.on("close", () => {
  console.log("on close.");
  setTimeout(() => {
    //process.exit(-1);
  }, 2000);
});

parser.on("data", data => {
  let str = data.toString();
  let wifi_creds = str.split(",,,");
  console.log(wifi_creds)
  console.log(`Recv: `, data.toString());
  let ssid = wifi_creds[0];
  let passwd = wifi_creds[1]
  console.log(ssid, passwd)
  if (wifi_creds[0] && wifi_creds[1]) {
    piWifi.connect(ssid, passwd , function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log('Successful connection!');
      port.write("OK");
    }); 
  }

});

/*
*/
