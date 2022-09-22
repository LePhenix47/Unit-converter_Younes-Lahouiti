const temperatureSelectElements = document.getElementsByClassName(
  "main__select-temperature"
); //HTMLCollection
for (selectElement of temperatureSelectElements) {
  selectElement.addEventListener("change", handleSelectionForTemperature);
}

let conversionInputtedTemperature = "";
let conversionResultInputTemperature = "";

function handleSelectionForTemperature(e) {
  if (this.getAttribute("data-select-type") === "input") {
    console.log("Input");
    conversionInputtedTemperature = this.value;
  } else {
    console.log("Result");
    conversionResultInputTemperature = this.value;
  }

  console.log(e.target.value);
  console.log(
    { conversionInputtedTemperature },
    { conversionResultInputTemperature }
  );

  convertTemperatureValue(
    valueOfInputTemperature,
    conversionInputtedTemperature,
    conversionResultInputTemperature
  );
}

const temperatureInput = document.querySelector(".main__input#temperature");

const resultTemperatureInputElement = document.querySelector(
  ".main__input-temperature-result"
);

let valueOfInputTemperature = 0;
let valueOfResultTemperature = {};

temperatureInput.addEventListener("input", handleTemperatureConversion);

function handleTemperatureConversion(e) {
  valueOfInputTemperature = e.target.valueAsNumber;
  console.log({ valueOfInputTemperature });
  convertTemperatureValue(
    valueOfInputTemperature,
    conversionInputtedTemperature,
    conversionResultInputTemperature
  );
}

function convertTemperatureValue(value, unitOfValue, unitToBeConvertedTo) {
  if (unitOfValue === unitToBeConvertedTo) {
    valueOfResultTemperature = value;
    resultTemperatureInputElement.value = valueOfResultTemperature;
    return;
  }

  valueOfResultTemperature = convertTemperatures(
    value,
    unitOfValue,
    unitToBeConvertedTo
  );

  console.log(
    value,
    unitOfValue,
    "equals to:",
    valueOfResultTemperature,
    unitToBeConvertedTo
  );
  resultTemperatureInputElement.getAttribute("disabled", "false");

  let { valueOfTemperature, kelvinTemperatureIsNegative } =
    valueOfResultTemperature;

  valueOfTemperature = valueOfTemperature.toFixed(2);

  if (kelvinTemperatureIsNegative) {
    valueOfTemperature = valueOfTemperature.toString() + "*";
  }
  resultTemperatureInputElement.value = valueOfTemperature;
}

function convertTemperatures(
  valueOfTemperature,
  unitOfValue,
  unitToBeConvertedTo
) {
  let celsius = 0;
  let fahrenheit = 0;
  let kelvin = 0;

  let kelvinTemperatureIsNegative = false;

  switch (unitOfValue) {
    case "celsius": {
      celsius = valueOfTemperature;
      fahrenheit = (celsius * 9) / 5 + 32; //x°F = (x°C * 9/5) + 32
      kelvin = 273.15 + celsius; //x°K = x°C + 273.15, also Kelvin values are NEVER negative

      break;
    }
    case "fahrenheit": {
      fahrenheit = valueOfTemperature;
      celsius = ((fahrenheit - 32) * 5) / 9; //x°C = (x°F - 32) * 5/9
      kelvin = -17.22222 * fahrenheit + fahrenheit; //x°K = (x°F - 32) * 5/9 + 273.15

      break;
    }
    case "kelvin": {
      //x°K = x°C  -273.15 or x°K = (x°F - 32) * 5/9 - 273.15
      kelvin = valueOfTemperature;
      celsius = kelvin - 273.15;
      fahrenheit = kelvin - 459.67;

      break;
    }
  }

  kelvinTemperatureIsNegative =
    kelvin < 0
      ? kelvinTemperatureIsNegative === false
      : kelvinTemperatureIsNegative === true;

  switch (unitToBeConvertedTo) {
    case "celsius": {
      valueOfTemperature = celsius;
      break;
    }
    case "fahrenheit": {
      valueOfTemperature = fahrenheit;
      break;
    }
    case "kelvin": {
      valueOfTemperature = kelvin;
      break;
    }
  }

  return { valueOfTemperature, kelvinTemperatureIsNegative };
}

resultTemperatureInputElement.addEventListener("click", copyToClipboard);
