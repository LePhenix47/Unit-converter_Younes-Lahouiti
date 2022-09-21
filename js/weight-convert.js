const weightSelectElements = document.getElementsByClassName(
  "main__select-weight"
); //HTMLCollection
for (selectElement of weightSelectElements) {
  selectElement.addEventListener("change", handleSelectionForWeight);
}

let conversionInputtedWeight = "";
let conversionResultInputWeight = "";

function handleSelectionForWeight(e) {
  if (this.getAttribute("data-select-type") === "input") {
    console.log("Input");
    conversionInputtedWeight = this.value;
  } else {
    console.log("Result");
    conversionResultInputWeight = this.value;
  }

  console.log(e.target.value);
  console.log({ conversionInputtedWeight }, { conversionResultInputWeight });

  convertWeightValue(
    valueOfInputWeight,
    conversionInputtedWeight,
    conversionResultInputWeight
  );
}

const weightInput = document.querySelector(".main__input#weight");

const resultWeightInputElement = document.querySelector(
  ".main__input-weight-result"
);

let valueOfInputWeight = 0;
let valueOfResultWeight = 0;

weightInput.addEventListener("input", handleWeightConversion);

function handleWeightConversion(e) {
  valueOfInputWeight = e.target.valueAsNumber;
  console.log({ valueOfInputWeight });
  convertWeightValue(
    valueOfInputWeight,
    conversionInputtedWeight,
    conversionResultInputWeight
  );
}

function convertWeightValue(value, unitOfValue, unitToBeConvertedTo) {
  if (unitOfValue === unitToBeConvertedTo) {
    valueOfResultWeight = value;
    resultWeightInputElement.value = valueOfResultWeight;
    return;
  }

  let bothUnitsAreMetric =
    unitOfValue.includes("grams") && unitToBeConvertedTo.includes("grams");

  let metricToImperial =
    unitOfValue.includes("grams") === true &&
    unitToBeConvertedTo.includes("grams") === false;

  let imperialToMetric =
    unitOfValue.includes("grams") === false &&
    unitToBeConvertedTo.includes("grams") === true;

  let bothUnitsAreImperial =
    unitOfValue.includes("grams") === false &&
    unitToBeConvertedTo.includes("grams") === false;

  if (bothUnitsAreMetric) {
    valueOfResultWeight = convertMetricUnitWeights(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  } else if (metricToImperial) {
    valueOfResultWeight = convertMetricToImperialUnitsWeights(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  } else if (imperialToMetric) {
    valueOfResultWeight = convertImperialToMetricUnitsWeights(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  } else if (bothUnitsAreImperial) {
    valueOfResultWeight = convertImperialUnitWeights(
      value,
      unitOfValue,
      unitToBeConvertedTo
    );
  }

  console.log(
    value,
    unitOfValue,
    "equals to:",
    valueOfResultWeight,
    unitToBeConvertedTo
  );
  resultWeightInputElement.getAttribute("disabled", "false");

  if (typeof valueOfResultWeight === "number") {
    Number(valueOfResultWeight).toFixed(2);
    console.log(valueOfResultWeight, "is a", typeof valueOfResultWeight);
  }

  resultWeightInputElement.value = valueOfResultWeight;
}

function convertMetricUnitWeights(value, unitOfValue, unitToBeConvertedTo) {
  let milligrams = 0;
  let grams = 0;
  let kilograms = 0;

  switch (unitOfValue) {
    case "milligrams": {
      milligrams = value;
      grams = milligrams / 1000;
      kilograms = milligrams / 1000000;
      break;
    }
    case "grams": {
      grams = value;
      milligrams = grams * 1000;
      kilograms = grams / 1000;

      break;
    }
    case "kilograms": {
      kilograms = value;
      milligrams = kilograms * 1000000;
      grams = kilograms * 1000;

      break;
    }
  }

  switch (unitToBeConvertedTo) {
    case "milligrams": {
      value = milligrams;
      break;
    }
    case "grams": {
      value = grams;
      break;
    }
    case "kilograms": {
      value = kilograms;
      break;
    }
  }

  return value;
}

function convertMetricToImperialUnitsWeights(
  value,
  unitOfValue,
  unitToBeConvertedTo
) {
  let zerosToBeRemoved = 0;
  switch (unitOfValue) {
    case "milligrams": {
      zerosToBeRemoved = 0.01;
      break;
    }
    case "grams": {
      zerosToBeRemoved = 1;
      break;
    }
    case "kilograms": {
      zerosToBeRemoved = 1000;
      break;
    }
  }

  switch (unitToBeConvertedTo) {
    case "pounds": {
      //1 gram = 0.002204623 pounds
      value = value * 0.002204623 * zerosToBeRemoved;
      break;
    }
    case "stone": {
      //1 gram = 0.000157473 stone
      value = value * 0.000157473 * zerosToBeRemoved;
      break;
    }
    case "ounces": {
      //1 gram = 0.03527396 ounces
      value = value * 0.03527396 * zerosToBeRemoved;
      break;
    }
  }
  return value;
}
function convertImperialToMetricUnitsWeights(
  value,
  unitOfValue,
  unitToBeConvertedTo
) {
  switch (unitToBeConvertedTo) {
    case "milligrams": {
      zerosToBeAdded = 1000;
      break;
    }
    case "grams": {
      zerosToBeAdded = 1;
      break;
    }
    case "kilograms": {
      zerosToBeAdded = 0.001;
      break;
    }
  }

  switch (unitOfValue) {
    case "pounds": {
      // 1 pound = 453.5924 grams
      value = value * 453.5924 * zerosToBeAdded;
      break;
    }
    case "stone": {
      // 1 stone = 6350.293 grams
      value = value * 6350.293 * zerosToBeAdded;
      break;
    }
    case "ounces": {
      // 1 ounce = 28.34952 grams
      value = value * 28.34952 * zerosToBeAdded;
      break;
    }
  }

  return value;
}

function convertImperialUnitWeights(value, unitOfValue, unitToBeConvertedTo) {
  let pounds = 0;
  let stone = 0;
  let ounces = 0;

  switch (unitOfValue) {
    case "pounds": {
      pounds = value;
      stone = pounds / 14;
      ounces = pounds * 16;
      break;
    }
    case "stone": {
      stone = value;
      pounds = stone * 14;
      ounces = stone * 224;

      break;
    }
    case "ounces": {
      ounces = value;
      pounds = ounces / 16;
      stone = ounces / 224;
      break;
    }
  }

  switch (unitToBeConvertedTo) {
    case "pounds": {
      value = pounds;
      break;
    }
    case "stone": {
      value = stone;
      break;
    }
    case "ounces": {
      value = ounces;
      break;
    }
  }
  return value;
}

resultWeightInputElement.addEventListener("click", copyToClipboard);
