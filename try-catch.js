let fetchRetourData = async function (sendungsnummer) {
    const url = `/retoure/lookup/barcode=${sendungsnummer}&type=qrcode`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
  
      let liefernummer = data.liefernummer;
      let versandart = data.versandart;
      let kundePlz = data.kunde_plz;
      let kundeName = data.kunde_name;
      let orderNumber = data.orderNumber;
  
      console.log("Die daten Sind : ")
      console.log('Liefernummer:', liefernummer);
      console.log('Versandart:', versandart);
      console.log('Kunden-PLZ:', kundePlz);
      console.log('Kundenname:', kundeName);
      console.log('orderNumber:', orderNumber);
  
    } catch (error) {
      console.error('An error occurred:', error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };
  