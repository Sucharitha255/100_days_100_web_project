const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const historyList = document.querySelector("[data-history-list]");
const clearHistoryBtn = document.querySelector("[data-clear-history]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const PASSWORD_HISTORY_KEY = "passwordGeneratorHistory";


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
let passwordHistory = loadPasswordHistory();
handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");
renderPasswordHistory();


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function loadPasswordHistory() {
    try {
        const storedHistory = localStorage.getItem(PASSWORD_HISTORY_KEY);
        if (!storedHistory) {
            return [];
        }

        const parsedHistory = JSON.parse(storedHistory);
        if (!Array.isArray(parsedHistory)) {
            return [];
        }

        return parsedHistory.filter((item) => typeof item === "string" && item.trim()).slice(0, 5);
    } catch (error) {
        return [];
    }
}

function savePasswordHistory() {
    try {
        localStorage.setItem(PASSWORD_HISTORY_KEY, JSON.stringify(passwordHistory));
    } catch (error) {
        return;
    }
}

function renderPasswordHistory() {
    historyList.innerHTML = "";

    if (passwordHistory.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "history-empty";
        emptyItem.textContent = "No recent passwords yet";
        historyList.appendChild(emptyItem);
        return;
    }

    passwordHistory.forEach((savedPassword) => {
        const historyItem = document.createElement("li");
        historyItem.className = "history-item";
        historyItem.textContent = savedPassword;
        historyList.appendChild(historyItem);
    });
}

function addPasswordToHistory(newPassword) {
    passwordHistory = [newPassword, ...passwordHistory];

    if (passwordHistory.length > 5) {
        passwordHistory = passwordHistory.slice(0, 5);
    }

    savePasswordHistory();
    renderPasswordHistory();
}

function clearPasswordHistory() {
    passwordHistory = [];
    savePasswordHistory();
    renderPasswordHistory();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
})

clearHistoryBtn.addEventListener("click", clearPasswordHistory);

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if (checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    //remaining adddition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    addPasswordToHistory(password);
    //calculate strength
    calcStrength();
});