let currentOrder = 2; // Default ordo matriks

// Fungsi untuk memperbarui ukuran matriks sesuai pilihan ordo
function updateOrder() {
  currentOrder = parseInt(document.getElementById("order").value);
  generateMatrix(1);
  generateMatrix(2);
}

// Fungsi untuk membuat input matriks dalam bentuk grid
function generateMatrix(matrixNumber) {
  const matrixContainer = document.getElementById(`matrix${matrixNumber}`);
  matrixContainer.innerHTML = ""; // Reset matriks

  // Atur grid berdasarkan ordo
  matrixContainer.style.gridTemplateColumns = `repeat(${currentOrder}, 1fr)`;

  for (let i = 0; i < currentOrder; i++) {
    for (let j = 0; j < currentOrder; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.classList.add("matrix-input");
      input.dataset.row = i;
      input.dataset.col = j;
      input.value = 0; // Nilai default input adalah nol
      matrixContainer.appendChild(input);
    }
  }
}

// Fungsi untuk mengambil nilai dari matriks input
function getMatrix(matrixNumber) {
  const matrixContainer = document.getElementById(`matrix${matrixNumber}`);
  const inputs = matrixContainer.getElementsByTagName("input");
  const matrix = [];

  for (let i = 0; i < currentOrder; i++) {
    const row = [];
    for (let j = 0; j < currentOrder; j++) {
      const value = inputs[i * currentOrder + j].value || 0;
      row.push(parseFloat(value));
    }
    matrix.push(row);
  }
  return matrix;
}

// Fungsi untuk melakukan operasi pada matriks
function performOperation(operation) {
  const matrixA = getMatrix(1);
  const matrixB = getMatrix(2);
  let result = [];

  let operatorSymbol = ""; // Menyimpan simbol operator

  switch (operation) {
    case "add":
      result = matrixA.map((row, i) =>
        row.map((val, j) => val + matrixB[i][j])
      );
      operatorSymbol = "+"; // Simbol penjumlahan
      break;
    case "subtract":
      result = matrixA.map((row, i) =>
        row.map((val, j) => val - matrixB[i][j])
      );
      operatorSymbol = "-"; // Simbol pengurangan
      break;
    case "multiply":
      for (let i = 0; i < currentOrder; i++) {
        const row = [];
        for (let j = 0; j < currentOrder; j++) {
          let sum = 0;
          for (let k = 0; k < currentOrder; k++) {
            sum += matrixA[i][k] * matrixB[k][j];
          }
          row.push(sum);
        }
        result.push(row);
      }
      operatorSymbol = "x"; // Simbol perkalian
      break;
    default:
      alert("Operasi tidak valid.");
      return;
  }

  // Menampilkan simbol operator di tengah
  document.getElementById("operator-sign").textContent = operatorSymbol;

  displayResult(result);
}

// Fungsi untuk menampilkan hasil operasi dalam bentuk grid
function displayResult(matrix) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // Reset hasil

  // Atur grid untuk hasil
  resultContainer.style.gridTemplateColumns = `repeat(${currentOrder}, 1fr)`;

  matrix.forEach((row) => {
    row.forEach((value) => {
      const cell = document.createElement("div");
      cell.classList.add("matrix-input");
      cell.textContent = value;
      resultContainer.appendChild(cell);
    });
  });
}

// Inisialisasi awal
updateOrder();
