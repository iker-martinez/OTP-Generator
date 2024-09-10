let intervalId;
let seconds = 20;
let OTPGenerated = '';
let OTPEntered = '';

const Status = Object.freeze({
    OTP_VALID: 'OTP OTP_VALID',
    OTP_INVALID: 'OTP OTP_INVALID',
    PROCESS_CANCEL: 'Process PROCESS_CANCEL',
    ANOTHER: 'Another Process'
});

const Message = Object.freeze({
    NO_TYPED: 'The OTP wasnt typed',
    OTP_VALID: 'The OTP is Valid',
    OTP_INVALID: 'The OTP is Invalid',
    PROCESS_CANCEL: 'Process Cancelled',
    PROCESS_STOPPED: 'Process Stopped'
});

function startInterval() {

    if (intervalId) {
        stopInterval();
    }

    OTPGenerated = generateOTP();
    if (OTPGenerated) {
        console.log(OTPGenerated);
        /*console.log('hola');
        const copiarContenido = async () => {
            try {
                await navigator.clipboard.writeText(OTPGenerated);
                console.log(`OTP copiado ${OTPGenerated}`);
            } catch (err) {
                console.error('Falló al copiar: ', err);
            }
        }*/

        OTPEntered = prompt(`Ingresa el OTP ${OTPGenerated}`);
    }

    intervalId = setInterval(() => {

        let sSec = seconds == 1 ? 'second' : 'seconds';
        console.log(`Your OTP is ${OTPGenerated}, valid for ${seconds} ${sSec}.`);
        seconds--;

        if (seconds <= 0) {
            console.log(Message.NO_TYPED);
            stopInterval();
            //startInterval();
        }

    }, 1000);
}

function stopInterval(status) {
    if (status == Status.OTP_VALID) {
        console.log(`El OTP Generated is ${OTPGenerated}, and the OTP Entered is ${OTPEntered}`);
        console.log(Message.OTP_VALID);
    } else if (status == Status.OTP_INVALID) {
        console.log(`El OTP Generated is ${OTPGenerated}, and you type this ${OTPEntered}`);
        console.log(Message.OTP_INVALID);
    } else if (status == Status.PROCESS_CANCEL) {
        console.log(Message.PROCESS_CANCEL);
    } else if (status == Status.ANOTHER) {
        console.log(Message.PROCESS_STOPPED);
    }

    console.log(intervalId);
    clearInterval(intervalId);
    clearInterval(intervalId);
    console.log(intervalId);
    OTPGenerated = '';
    seconds = 20;
    sSec = '';
    console.log('');
    console.log('The process is finished.');
}

function validateOTP(status) {
    if (status == Status.TYPED) {
        if (OTPGenerated == OTPEntered) {
            stopInterval(Status.OTP_VALID);
        } else if (OTPGenerated !== OTPEntered) {
            stopInterval(Status.OTP_INVALID);
            startInterval();
        } else {
            stopInterval(Status.ANOTHER);
            startInterval();
        }
    } else if (status === Status.PROCESS_CANCEL) {
        stopInterval(Status.PROCESS_CANCEL);
    } else if (status == Status.ANOTHER) {
        stopInterval(Status.ANOTHER);
    }
}


function generateOTP() {
    /*
    //Generate a random numeric with 4 digits
      let digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
      */

    //Generate a random numeric with 6 digits
    //return Math.floor(100000 + Math.random() * 900000);
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

startInterval();

if (OTPGenerated != null) {
    if (OTPEntered !== null) {
        validateOTP(Status.TYPED);
    } else if (OTPEntered === null) {
        validateOTP(Status.PROCESS_CANCEL);
    } else {
        validateOTP(Status.ANOTHER);
    }
}