const logDiv = document.getElementById("log");
const socket = io.connect("http://localhost:5000");
socket.on("connected", (data) => {
  console.log("Socket: ", data);
});

socket.on("log", (data) => {
  logDiv.innerHTML += "<p>" + data.log + "</p>";
});

const beginMarketing = async () => {
  const errorDiv = document.getElementById("errorText");
  logDiv.innerHTML = "";
  const privateKey = document.getElementById("privateTextField").value;
  const bnbAmount = document.getElementById("bnbTextField").value;
  const bleggsAmount = document.getElementById("bleggsTextField").value;
  const numOfWallets = document.getElementById("numWalletsTextField").value;
  const purchaseRate = document.getElementById("rateTextField").value;
  const minBuy = document.getElementById("minB").value;
  const maxBuy = document.getElementById("maxB").value;
  const minSell = document.getElementById("minS").value;
  const maxSell = document.getElementById("maxS").value;
  if (
    privateKey === "" ||
    bnbAmount === "" ||
    bleggsAmount === "" ||
    numOfWallets === "" ||
    purchaseRate === "" ||
    minBuy === "" ||
    maxBuy === "" ||
    minSell === "" ||
    maxSell === ""
  ) {
    errorDiv.className = errorDiv.className.replace("hidden", " block");
    errorDiv.innerHTML = "Must fill all data.";
    return;
  } else {
    errorDiv.className = errorDiv.className.replace("block", " hidden");
    errorDiv.innerHTML = "";
  }
  const { data } = await axios.post("http://localhost:5000/begin", {
    socketId: socket.id,
    privateKey: privateKey,
    bnb: bnbAmount,
    bleggs: bleggsAmount,
    numOfWallets: numOfWallets,
    purchaseRate: purchaseRate,
    minB: minBuy,
    maxB: maxBuy,
    minS: minSell,
    maxS: maxSell,
  });

  if (data.err) {
    errorDiv.className = errorDiv.className.replace("hidden", " block");
    errorDiv.innerHTML = data.err;
  }
};

const showButtonClicked = () => {
  const privateKeyDiv = document.getElementById("privateTextField");
  const showDiv = document.getElementById("show");
  privateKeyDiv.type == "text" ? (privateKeyDiv.type = "password") : (privateKeyDiv.type = "text");
  privateKeyDiv.type == "text" ? (showDiv.innerHTML = "hide") : (showDiv.innerHTML = "show");
};

function isValidEthereumPrivateKey(privateKey) {
  // Check if the private key is a string of 64 hex characters
  const hexRegex = /^[0-9a-fA-F]{64}$/;
  if (typeof privateKey === "string" && hexRegex.test(privateKey)) {
    return true;
  } else {
    return false;
  }
}
