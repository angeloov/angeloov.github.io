onNetworkClassChange();
netClassContainer.addEventListener("click", onNetworkClassChange);

const calculate = () => {
  document.querySelector(".result-table tbody").innerHTML = "";

  const networkClass = document.querySelector('input[name="class"]:checked').value;
  const subnetMaskCIDR = subnetSelectElement.value;
  const networkIPAddress = ipAddressTextInput.value;

  console.log({ networkClass, subnetMaskCIDR, networkIPAddress });

  const [firstOctet, secondOctet, thirdOctet, fourthOctet] = networkIPAddress.split(".");

  let netAddress, firstAddress, lastAddress, broadcastAddress;

  if (networkClass === "A") {
    let n = subnetMaskCIDR - 8;

    for (let i = 0; i < 2 ** n; i++) {
      // First address
      let h1 = i << (8 - n);
      let h2 = 0;
      let h3 = 1;

      netAddress = `${firstOctet}.${h1}.0.0`;
      firstAddress = `${firstOctet}.${h1}.${h2}.${h3}`;

      // Last address
      h1 |= 255 >> n;
      h2 = 255;
      h3 = 255;

      broadcastAddress = `${firstOctet}.${h1}.${h2}.${h3}`;
      lastAddress = `${firstOctet}.${h1}.${h2}.${h3 - 1}`;

      addEntryToTableOnDOM(netAddress, firstAddress, lastAddress, broadcastAddress);
    }
  } else if (networkClass === "B") {
    let n = subnetMaskCIDR - 16;

    for (let i = 0; i < 2 ** n; i++) {
      // First address
      let h2 = i << (8 - n);
      let h3 = 1;

      netAddress = `${firstOctet}.${secondOctet}.${h2}.0`;
      firstAddress = `${firstOctet}.${secondOctet}.${h2}.${h3}`;

      // Last address
      h2 |= 255 >> n;
      h3 = 255;

      broadcastAddress = `${firstOctet}.${secondOctet}.${h2}.${h3}`;
      lastAddress = `${firstOctet}.${secondOctet}.${h2}.${h3 - 1}`;

      addEntryToTableOnDOM(netAddress, firstAddress, lastAddress, broadcastAddress);
    }
  } else {
    let n = subnetMaskCIDR - 24;

    for (let i = 0; i < 2 ** n; i++) {
      // First address
      let h3 = i << (8 - n);

      netAddress = `${firstOctet}.${secondOctet}.${thirdOctet}.${h3}`;
      firstAddress = `${firstOctet}.${secondOctet}.${thirdOctet}.${h3 + 1}`;

      // Last address
      h3 |= 255 >> n;

      broadcastAddress = `${firstOctet}.${secondOctet}.${thirdOctet}.${h3}`;
      lastAddress = `${firstOctet}.${secondOctet}.${thirdOctet}.${h3 - 1}`;

      addEntryToTableOnDOM(netAddress, firstAddress, lastAddress, broadcastAddress);
    }
  }
};

document.querySelector("#calculate-btn").addEventListener("click", calculate);
