function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    function onScanSuccess(decodeText, decodeResult) {
        alert("Der QR-Code ist: " + decodeText);
        document.getElementById("QR-Link").value = decodeText;
    }

    const htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
        fps: 10,
        qrbox: 250
    });

    htmlscanner.render(onScanSuccess);
});

function sendungsnummer() {
    const link = document.getElementById("QR-Link").value;
    console.log("Eingegebener Link: " + link);

    const regex = /https:\/\/dringend\.ewanto\.de\/(500)?(\d{7})([A-Za-z0-9]?)$/;
    const result = link.match(regex);

    let sendungsnummer = null;

    if (result) {
        sendungsnummer = result[2];

        if (result[3]) {
            sendungsnummer += result[3];
        }
    }

    if (sendungsnummer) {
        document.getElementById("Sd-Nr").value = sendungsnummer;
    } else {
        document.getElementById("QR-Link").value = "";
    }

    console.log("Sendungsnummer = " + (sendungsnummer || 'Nicht gefunden'));
}

document.getElementById("sendungsnummer").addEventListener("click", sendungsnummer);
setInterval(sendungsnummer, 2000);


    function deleteElementByAlt() {
        var element = document.querySelector('img[alt="Info icon"]'); 

            element.remove();
    }
    setInterval(
        deleteElementByAlt, 2
        );
    