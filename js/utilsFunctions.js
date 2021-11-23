const updateSubnetMaskInput = networkClass => {
  subnetSelectElement.innerHTML = "";

  let i;
  let end;

  if (networkClass === "A") {
    i = 9;
    end = 16;
  } else if (networkClass === "B") {
    i = 17;
    end = 24;
  } else {
    i = 25;
    end = 30;
  }

  for (; i <= end; i++) {
    let optionEl = document.createElement("option");
    optionEl.value = i;
    optionEl.innerText = "/" + i;

    subnetSelectElement.appendChild(optionEl);
  }
};

const inputIsValid = (s) => {
  const regExp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  return regExp.test(s);
}

const showError = (err) => {
  
}

function onNetworkClassChange() {
  const networkClass = document.querySelector('input[name="class"]:checked').value;
  updateSubnetMaskInput(networkClass);
}

const addEntryToTableOnDOM = (netAddress, firstAddress, lastAddress, broadcastAddress) => {
  const table = document.querySelector(".result-table tbody");  

  let tr = document.createElement("tr");

  let netAddr = document.createElement("td");
  let rangeHosts = document.createElement("td");
  let broadcastAddr = document.createElement("td");

  netAddr.innerText = netAddress;
  rangeHosts.innerText = `${firstAddress} - ${lastAddress}`;
  broadcastAddr.innerText = broadcastAddress;

  tr.appendChild(netAddr);
  tr.appendChild(rangeHosts);
  tr.appendChild(broadcastAddr);

  table.appendChild(tr);
};
