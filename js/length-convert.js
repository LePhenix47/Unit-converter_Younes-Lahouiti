const lengthSelectElements = document.getElementsByClassName(
  "main__select-length"
); //HTMLCollection
for (selectElement of lengthSelectElements) {
  selectElement.addEventListener("change", handleSelectionForLength);
}

let conversionInputtedLength = "";
let conversionResultInputLength = "";

function handleSelectionForLength(e) {
  if (this.getAttribute("data-select-type") === "input") {
    console.log("Input");
    conversionInputtedLength = this.value;
  } else {
    console.log("Result");
    conversionResultInputLength = this.value;
  }

  console.table(e.target.value);
  console.log({ conversionInputtedLength }, { conversionResultInputLength });

  convertLengthValue(
    valueOfInputLength,
    conversionInputtedLength,
    conversionResultInputLength
  );
}

const lengthInput = document.querySelector(".main__input#length");

let valueOfInputLength = 0;
let valueOfResultLength = 0;

lengthInput.addEventListener("input", handleLengthConversion);

function handleLengthConversion(e) {
  valueOfInputLength = e.target.valueAsNumber;
  console.log({ valueOfInputLength });

  convertLengthValue(
    valueOfInputLength,
    conversionInputtedLength,
    conversionResultInputLength
  );
}

const resultLengthInputElement = document.querySelector(
  ".main__input-length-result"
);

function convertLengthValue(value, unitOfValue, unitToBeConvertedTo) {
  if (value === null || value < 0) {
    alert("Please enter a positive floating number");
    return;
  }

  if (unitOfValue === unitToBeConvertedTo) {
    valueOfResultLength = value;
    resultLengthInputElement.value = valueOfResultLength;
    return;
  }

  let bothUnitsAreMetric =
    unitOfValue.includes("meter") === true &&
    unitToBeConvertedTo.includes("meter") === true;

  let metricToImperial =
    unitOfValue.includes("meter") === true &&
    unitToBeConvertedTo.includes("meter") === false;

  let imperialToMetric =
    unitOfValue.includes("meter") === false &&
    unitToBeConvertedTo.includes("meter") === true;

  let bothUnitsAreImperial =
    unitOfValue.includes("meter") === false &&
    unitToBeConvertedTo.includes("meter") === false;

  if (bothUnitsAreMetric) {
    console.log("Both units are in metric: Metric → Metric");
    valueOfResultLength = convertMetricUnitLengths(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  } else if (metricToImperial) {
    console.log(
      "Left unit is metric and right unit is imperial: Metric → Imperial"
    );
    valueOfResultLength = convertMetricToImperialUnitLengths(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );

    console.log({ valueOfResultLength });
  } else if (imperialToMetric) {
    valueOfResultLength = convertImperialToMetricUnitLengths(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  } else if (bothUnitsAreImperial) {
    valueOfResultLength = convertImperialUnitLengths(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  }

  console.log(
    value,
    unitOfValue,
    "equals to:",
    valueOfResultLength,
    unitToBeConvertedTo
  );

  resultLengthInputElement.removeAttribute("disabled");

  if (typeof valueOfResultLength === "number") {
    Number(valueOfResultLength).toFixed(2);
    console.log(valueOfResultLength, "is a", typeof valueOfResultLength);
  }

  resultLengthInputElement.value = valueOfResultLength;

  console.log({ valueOfResultLength });
}

function convertMetricUnitLengths(value, unitOfValue, unitToBeConvertedTo) {
  if (unitOfValue === unitToBeConvertedTo) {
    return value;
  }

  let zerosToBeAdded = 0;
  let zerosToBeRemoved = 0;

  switch (unitOfValue) {
    case "millimeters": {
      zerosToBeAdded = 0.001;
      break;
    }
    case "centimeters": {
      zerosToBeAdded = 0.01;
      break;
    }
    case "meters": {
      zerosToBeAdded = 1;
      break;
    }
    case "kilometers": {
      zerosToBeAdded = 1000;
      break;
    }
  }
  switch (unitToBeConvertedTo) {
    case "millimeters": {
      zerosToBeRemoved = 0.001;
      break;
    }
    case "centimeters": {
      zerosToBeRemoved = 0.01;
      break;
    }
    case "meters": {
      zerosToBeRemoved = 1;
      break;
    }
    case "kilometers": {
      zerosToBeRemoved = 1000;
      break;
    }
  }
  value = (zerosToBeAdded / zerosToBeRemoved) * value; //1 km → cm = 1 000/0.01 = 1 000 * 100 = 100 000

  return value;
}

//m → yd, mi, inch, ft..
function convertMetricToImperialUnitLengths(
  value,
  unitOfValue,
  unitToBeConvertedTo
) {
  if (unitOfValue === unitToBeConvertedTo) {
    return value;
  }
  //We transform the metric value inputted by the user in meters ex: km → m
  let zerosToBeRemoved = 0;

  switch (unitOfValue) {
    case "millimeters": {
      zerosToBeRemoved = 0.001;

      break;
    }
    case "centimeters": {
      zerosToBeRemoved = 0.01;
      break;
    }
    case "meters": {
      zerosToBeRemoved = 1;
      break;
    }
    case "kilometers": {
      zerosToBeRemoved = 1000;
      break;
    }
  }
  switch (unitToBeConvertedTo) {
    case "miles": {
      //1 meter = 0.0006213712 mile
      value = value * 0.0006213712 * zerosToBeRemoved;
      break;
    }
    case "inches": {
      //1 meter = 39.37008 inches
      value = value * 39.37008 * zerosToBeRemoved;
      break;
    }
    case "feet": {
      //1 meter = 3.28084 feet
      value = value * 3.28084 * zerosToBeRemoved;
      break;
    }
    case "yards": {
      //1 meter = 1.093613 yard
      value = value * 1.093613 * zerosToBeRemoved;
      break;
    }
  }

  console.log("convertMetricToImperialUnitLengths", value);

  return value;
}

//yd, ft,
function convertImperialToMetricUnitLengths(
  valueToReturn,
  unitOfValue,
  unitToBeConvertedTo
) {
  if (unitOfValue === unitToBeConvertedTo) {
    return value;
  }
  //If the value to be converted to in meters
  let zerosToBeAdded = 0;

  switch (unitToBeConvertedTo) {
    case "millimeters": {
      zerosToBeAdded = 1000;
      break;
    }
    case "centimeters": {
      zerosToBeAdded = 100;
      break;
    }
    case "meters": {
      zerosToBeAdded = 1;
      break;
    }
    case "kilometers": {
      zerosToBeAdded = 0.001;
      break;
    }
  }

  switch (unitOfValue) {
    case "inches": {
      //1 inch =  0.254 meters
      valueToReturn = valueToReturn * 0.0254 * zerosToBeAdded;
      break;
    }
    case "feet": {
      // 1 foot = 0.3048 meters
      valueToReturn = valueToReturn * 0.3048 * zerosToBeAdded;
      break;
    }
    case "yards": {
      // 1 yard = 0.9144 meters
      valueToReturn = valueToReturn * 0.9144 * zerosToBeAdded;
      break;
    }
    case "miles": {
      // 1 mile =  1609.344 meters
      valueToReturn = valueToReturn * 1609.344 * zerosToBeAdded;
      break;
    }
  }

  return valueToReturn;
}

function convertImperialUnitLengths(value, unitOfValue, unitToBeConvertedTo) {
  if (unitOfValue === unitToBeConvertedTo) {
    return value;
  }

  let inches = 0;
  let feet = value;
  let yards = value;
  let miles = value;

  /* 
      1 ft = 12 inches
      1 yard = 3 ft or 36 inches
      1 mile = 1760 yd or 5208ft or 63360 inches
  
      1 inch = 1/12 ft or 1/36 yard or 1/63360 miles
      1 ft = 1/3 yard or 1/36 inches or 1/5208 miles
      1 yard = 1/1760 miles or 3 ft or 36 inches
    
      */

  switch (unitOfValue) {
    case "inches": {
      inches = value;
      feet = inches / 12;
      yards = inches / 36;
      miles = inches / 63360;
      break;
    }
    case "feet": {
      feet = value;
      inches = feet * 12;
      yards = feet / 3;
      miles = feet / 5208;
      break;
    }
    case "yards": {
      yards = value;
      miles = yards / 1760;
      feet = yards * 3;
      inches = yards * 36;
      break;
    }
    case "miles": {
      miles = value;
      inches = miles * 63360;
      feet = miles * 5208;
      yards = miles * 1760;

      break;
    }
  }

  switch (unitToBeConvertedTo) {
    case "inches": {
      value = inches;
      break;
    }
    case "feet": {
      value = feet;
      break;
    }
    case "yards": {
      value = yards;
      break;
    }
    case "miles": {
      value = miles;
      break;
    }
  }

  return value;
}

resultLengthInputElement.addEventListener("click", copyToClipboard);

function copyToClipboard(e) {
  this.select();

  this.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(this.value);

  alert(`Copied ${this.value} to clipboard`);
}
