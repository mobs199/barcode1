function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    function onScanSuccess(decodeText, decodeResult) {
        document.getElementById("QR-Link").value = decodeText;
        loopUpSendungNummer();
    }

    const htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
        fps: 10,
        qrbox: 250
    });

    htmlscanner.render(onScanSuccess);
});

function loopUpSendungNummer() {
    const link = document.getElementById("QR-Link").value;
    console.log("Eingegebener Link: " + link);

    const regex = /https:\/\/dringend\.ewanto\.de\/(500)?(\d{7})([A-Za-z0-9]?)/;
    const result = link.match(regex);

    let sendungsnummer = null;

    if (result) {
        console.log(result);
        sendungsnummer = result[2];

        if (result[3]) {
            sendungsnummer += result[3];
        }
    }

    if (sendungsnummer) {
        document.getElementById("Sd-Nr").value = sendungsnummer;
        fetchRetourData(sendungsnummer);
    } else {
        document.getElementById("QR-Link").value = "";
    }

    console.log("Sendungsnummer = " + (sendungsnummer || 'Nicht gefunden'));
}

document.getElementById("sendungsnummer").addEventListener("click", loopUpSendungNummer);


    
let fetchRetourData = function (sendungsnummer) {
    const url = `/retoure/lookup/barcode=${sendungsnummer}&type=qrcode`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();  
      })
      .then(data => {
        console.log('Success:', data);

        let liefernummer = data.liefernummer;
        let versandart = data.versandart;
        let kundePlz = data.kunde_plz;
        let kundeName = data.kunde_name;

        console.log('Liefernummer:', liefernummer);
        console.log('Versandart:', versandart);
        console.log('Kunden-PLZ:', kundePlz);
        console.log('Kundenname:', kundeName);
      })
      .catch(error => {
        alert(`An error occurred: ${error.message}`);
      });    
};
