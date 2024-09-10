let intervalId;
let seconds = 20;
let OTPGenerated = '';
let OTPEntered = '';

const Status = Object.freeze({
    VALID: 'OTP Valid',
    INVALID: 'OTP Invalid',
    CANCEL: 'Process Cancel',
    OTHER: 'Another Process'
});

function startInterval() {

    if (intervalId) {
        console.log(intervalId);
        stopInterval();
    }

    OTPGenerated = generateOTP();
    if (OTPGenerated) {
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
            validateOTP();
            stopInterval();
            startInterval();
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
        console.log(`El OTP Generated is ${OTPGenerated}, and the OTP Entered is ${OTPEntered}`)
        console.log('OTP Validated.');
        stopInterval();
    } else {
        console.log('OTP not Validated');
        stopInterval();
        startInterval();
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
    return Math.floor(100000 + Math.random() * 900000);
}

startInterval();

if (OTPGenerated != null) {
    if (OTPEntered !== null) {
        console.log(`The OTP typed is ${OTPEntered}`);
        validateOTP();
    } else if (OTPEntered === null) {
        console.log('Proceso Cancelado');
        stopInterval();
    } else {
        console.log('This OTP is incorrect');
        stopInterval();
    }
}
