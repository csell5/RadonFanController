var ADC = require('adc-pi-gpio'),
    config = {
        tolerance : 2,
        interval : 300,
        channels : [ 0 ],
        SPICLK: 18,
        SPIMISO: 23,
        SPIMOSI: 24,
        SPICS: 25
    };
 
var adc = new ADC(config);
 
process.on('SIGTERM', function(){
    adc.close();
});

process.on('SIGINT', function(){
    adc.close();
});
 
adc.init();
 
adc.on('ready', function() {
    console.log('Pins ready, listening to channel');
});

adc.on('close', function() {
    console.log('ADC terminated');
    process.exit();
});

adc.on('change', function(data) {
    console.log('Channel ' + data.channel + ' value is now ' + data.value + ' which in proportion is: ' + data.percent);
});