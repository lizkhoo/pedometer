// Global Variables
var StepCount=0;
var ThisAccel=0;
var LastAccel=9;

// Starts the js app
function startApp() {
	
	// Waits until the device is ready before starting the js function(s) and then calls startWatch
	document.addEventListener("deviceready", startWatch, false);

};

var watchID = null;
function startWatch() {

    // Update acceleration every 10 miliseconds
    var options = { frequency: 10 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}


// onSuccess: Get a snapshot of the current acceleration
function onSuccess(acceleration) {
	
		//convert vector acceleration from vector to magnitude
		var magnitude = Math.sqrt(Math.pow(acceleration.x,2) + Math.pow(acceleration.y,2) + Math.pow(acceleration.z,2));	
		
	//stores the acceleration magnitude for this snapshot	
	ThisAccel=magnitude;
	
	//detects an impulse to the phone only if the prior stored acceleration is less than 9 Newtons and the current accelaration is greater than 11 Newtons
	if(LastAccel<9 && ThisAccel > 11){	
		
		//Increment the step count		
		StepCount++;
	}
	
	//after incrementing, set the current acceleration to the last acceleration for the next round
	LastAccel=ThisAccel;
	
	//Print Step Count data
    var element = document.getElementById('pedometerData');
    element.innerHTML = '<CENTER>' + '<font size="200">' + StepCount + '</font>' + '</CENTER>'
	
	//Print developer data (this is on the developer page of the app and displays all acceleration data)
    var developerData = document.getElementById('developerData');
    developerData.innerHTML = 'Acceleration X: ' 	+ acceleration.x + '<br />' +
                        'Acceleration Y: ' 			+ acceleration.y + '<br />' +
                        'Acceleration Z: ' 			+ acceleration.z + '<br />' +
						'Acceleration:'				+ magnitude + '<br />' +
                    	'Timestamp: '      			+ acceleration.timestamp + '<br />' +
						'Step Count: '	   			+ StepCount + '<br />'
						
}


//If the reset button is pushed, this sets the step counter to zero
function resetCounter(){
	StepCount=0;
}


// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}