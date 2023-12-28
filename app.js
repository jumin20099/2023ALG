// input에 숫자를 입력하고 + 버튼을 클릭하면 결과값에 입력한 숫자 만큼 더해지고 input의 값은 없어진다.
// input에 숫자를 입력하고 - 버튼을 클릭하면 결과값에 입력한 숫자 만큼 빼지고 input의 값은 없어진다.
// input에 유효하지 않은 숫자를 입력하고 +, - 버튼을 클릭하면 동작은 무되되고 input의 값은 없어진다.
// undo를 클릭하면 이전 값으로 돌아간다.
// redo를 클릭하면 이후 값으로 되돌린다.
// undo와 redo는 동작이 가능할때만 활성화 상태가 된다.

let value = document.getElementById('value');
let total = 0;
let resultArray = [0];
let currentIndex = 0;

let undoButton = document.getElementById('undoButton'),
  addButton = document.getElementById('addButton'),
  subButton = document.getElementById('subButton'),
  redoButton = document.getElementById('redoButton'),
  inputValue = document.getElementById('inputbox');

// ===== onload 함수 ===== //
function onload() {
  undoButton.onclick = handleClick;
  addButton.onclick = handleClick;
  subButton.onclick = handleClick;
  redoButton.onclick = handleClick;
}

// ===== handleClick 함수 ===== //
function handleClick(event) {
  switch (event.target.id) {
    case 'undoButton':
      if (currentIndex > 0) { //undo
        currentIndex--;
        total = resultArray[currentIndex];
        inputValue.value = '';
        updateDisplay();
      };
      break;

    case 'redoButton':
      if (currentIndex < resultArray.length - 1) { //redo
        currentIndex++;
        total = resultArray[currentIndex];
        inputValue.value = '';
        updateDisplay();
      }
      break;

    default:
      calculate(event.target.id);
      break;
  }

  updateButtons(); // undo, redo 버튼 활성화 상태 업데이트
}

function calculate(operation) { // 계산
  let inputValueNumber = parseFloat(inputValue.value);

  if (isNaN(inputValueNumber)) {
    alert('유효하지 않은 숫자입니다.');
    inputValue.value = '';
    return;
  }

  switch (operation) {
    case 'addButton':
      currentIndex++;
      resultArray.splice(currentIndex, resultArray.length - currentIndex, total + inputValueNumber);
      total += inputValueNumber;
      break;

    case 'subButton':
      currentIndex++;
      resultArray.splice(currentIndex, resultArray.length - currentIndex, total - inputValueNumber);
      total -= inputValueNumber;
      break;
  }

  updateDisplay(); // 계산 결과 표시
  inputValue.value = ''; // 입력값 초기화
}


function updateDisplay() {
  document.getElementById('value').innerText = total;
  updateButtons();
}

function updateButtons() { //버튼 활성화 비활성화
  undoButton.disabled = currentIndex <= 0;
  redoButton.disabled = currentIndex >= resultArray.length - 1;
}