(function () {

    const Status = Object.freeze({
        NO_TYPED: 'No Typed',
        OTP_VALID: 'OTP Valid',
        OTP_INVALID: 'OTP Invalid',
        ANOTHER: 'Another Process'
    });

    const Message = Object.freeze({
        NO_TYPED: 'The OTP wasnt typed',
        OTP_VALID: 'The OTP is Valid',
        OTP_INVALID: 'The OTP is Invalid',
        PROCESS_STOPPED: 'Process Stopped'
    });

    const Validation = Object.freeze({
        NUMERS: /^.{6}$/
    });

    let intervalId;
    let seconds;
    let sSec;
    let ipGenerated = document.getElementById('ipGenerated');
    let btnGenerate = document.getElementById('btnGenerate');
    let lblTimeLeft = document.getElementById("lblTimeLeft");
    let ipValidated = document.getElementById('ipValidated');
    let btnValidate = document.getElementById('btnValidate');
    let OTPGenerated;

    function initial() {
        seconds = 20;
        sSec = '';
        OTPGenerated = '';
        ipGenerated.value = '';
        btnGenerate.disabled = false;
        lblTimeLeft.innerText = '';
        ipValidated.value = '';
        ipValidated.disabled = true;
        ipValidated.classList.remove('correct');
        ipValidated.classList.remove('incorrect');
        btnValidate.disabled = true;
        btnValidate.disabled = true;
    }

    function startInterval() {

        initial();

        if (intervalId) {
            stopInterval();
        }

        OTPGenerated = generateOTP();

        intervalId = setInterval(() => {

            sSec = seconds == 1 ? 'second' : 'seconds';

            if (seconds == 20) {
                ipGenerated.value = OTPGenerated;
                btnGenerate.disabled = true;
                ipValidated.disabled = false;
                ipValidated.focus();
            }

            lblTimeLeft.innerText = `This OTP is valid for ${seconds} ${sSec}.`;
            seconds--;

            if (seconds <= 0) {
                stopInterval();
                Swal.fire({
                    title: Status.NO_TYPED,
                    text: Message.NO_TYPED,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    timer: 5000,
                    timerProgressBar: true
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                        startInterval();
                    }
                });
            }

        }, 1000);
    }

    function validateOTP() {

        if (OTPGenerated != null) {
            if (ipValidated.value == "") {
                stopInterval(Status.NO_TYPED);
                startInterval();
            } else if (ipValidated.value !== null) {
                if (OTPGenerated == ipValidated.value) {
                    stopInterval(Status.OTP_VALID);
                } else if (OTPGenerated !== ipValidated.value) {
                    stopInterval(Status.OTP_INVALID);
                    startInterval();
                } else {
                    stopInterval(Status.ANOTHER);
                    startInterval();
                }
            } else {
                stopInterval(Status.ANOTHER);
            }
        }

    }

    function stopInterval(status) {
        if (status == Status.OTP_VALID) {
            Swal.fire({
                title: Message.OTP_VALID,
                text: `El OTP Generated is ${OTPGenerated}, and the OTP Entered is ${ipValidated.value}`,
                icon: "success",
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                    initial();
                }
            });
        } else if (status == Status.OTP_INVALID) {
            Swal.fire({
                title: Message.OTP_VALID,
                text: `El OTP Generated is ${OTPGenerated}, and you type this ${ipValidated.value}`,
                icon: "error",
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                    initial();
                }
            });
        } else if (status == Status.NO_TYPED) {
            Swal.fire({
                title: Message.NO_TYPED,
                text: 'No se ingreso el OTP para validarlo',
                icon: "error",
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                    initial();
                }
            });
        } else if (status == Status.ANOTHER) {
            Swal.fire({
                title: Message.PROCESS_STOPPED,
                text: 'El proceso se detuvo por alguna razon',
                icon: "info",
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                    initial();
                }
            });
        }

        clearInterval(intervalId);
        OTPGenerated = '';
        seconds = 20;
        sSec = '';

    }

    function generateOTP() {
        let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    const OTPEntered = document.querySelectorAll('#ipValidated');

    const validarOTP = (e) => {
        if (Validation.NUMERS.test(e.target.value)) {
            ipValidated.classList.remove('incorrect');
            ipValidated.classList.add('correct');
            btnValidate.disabled = false;
        } else {
            ipValidated.classList.remove('correct');
            ipValidated.classList.add('incorrect');
            btnValidate.disabled = true;
        }
    }

    OTPEntered.forEach((input) => {
        input.addEventListener('keyup', validarOTP);
        input.addEventListener('blur', validarOTP);
    });


    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            validateOTP();
        }
    })

}());