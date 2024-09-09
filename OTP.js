let intervalId;
let seconds = 20;
let OTPGenerated = '';

function startInterval() {

    if (intervalId) {
        stopInterval();
    }

    OTPGenerated = generateOTP();

    intervalId = setInterval(() => {

        let sSec = seconds == 1 ? 'second' : 'seconds';
        console.log(`Your OTP is ${OTPGenerated}, valid for ${seconds} ${sSec}.`);
        seconds--;

        if (seconds <= 0) {
            validateOTP();
            //stopInterval();
            //startInterval();
        }

    }, 1000);
}

function stopInterval() {
    clearInterval(intervalId);
    seconds = 20;
    sSec = '';
    console.log('');
    console.log('The process is finished.');
}

function validateOTP() {
    if (OTPGenerated == OTPGenerated) {
        console.log('');
        console.log('OTP Validated.');    
        stopInterval();
    }
}

function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

startInterval();
