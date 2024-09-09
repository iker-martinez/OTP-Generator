let intervalId;
let seconds = 20;
let OTPGenerated = '';

OTPGenerated = generateOTP();

intervalId = setInterval(() => {

    let sSec = seconds == 1 ? 'second' : 'seconds';
    console.log(`Your OTP is ${OTPGenerated}, valid for ${seconds} ${sSec}.`);
    seconds--;

    if (seconds <= 0) {
        clearInterval(intervalId);
        seconds = 20;
        sSec = '';
        console.log('');
        console.log('The process is finished.');
    }

}, 1000);

function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
