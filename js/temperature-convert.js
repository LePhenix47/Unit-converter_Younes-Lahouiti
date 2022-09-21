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

  resultTemperatureInputElement.value = valueOfResultTemperature.value;
}

function convertTemperatures(value, unitOfValue, unitToBeConvertedTo) {
  let celsius = 0;
  let fahrenheit = 0;
  let kelvin = 0;

  let kelvinTemperatureNotNegative = false;
  switch (unitOfValue) {
    case "celsius": {
      celsius = value;
      fahrenheit = (celsius * 9) / 5 + 32; //1°F = (1°C * 9/5) + 32 = 33.8 °C
      kelvin =
        273.15 + celsius > 0
          ? 273.15 + celsius
          : (273.15 + celsius).toFixed(2) + "*"; //1°K = 1°C + 273.15, also Kelvin values are NEVER negative
      break;
    }
    case "fahrenheit": {
      fahrenheit = value;
      celsius = ((fahrenheit - 32) * 5) / 9; //1°C = (1°F - 32) * 5/9 = -17.22222[...] °F
      kelvin =
        -17.22222 * fahrenheit + fahrenheit > 0
          ? -17.22222 * fahrenheit + fahrenheit
          : (-17.22222 * fahrenheit + fahrenheit).toFixed(2) + "*"; //1°K = (1°F - 32) * 5/9 + 273.15 = -17.22222[...] + 273.15 = 255.9278°K
      break;
    }
    case "kelvin": {
      //0°K = -273.15°C or 0°K = (1°F - 32) * 5/9 - 273.15 = -459.67°F
      kelvin = value;
      kelvin < 0
        ? kelvinTemperatureNotNegative === false
        : kelvinTemperatureNotNegative === true;
      celsius = kelvin - 273.15;
      fahrenheit = kelvin - 459.67;
      console.log(this);
      break;
    }
  }

  switch (unitToBeConvertedTo) {
    case "celsius": {
      value = celsius;
      break;
    }
    case "fahrenheit": {
      value = fahrenheit;
      break;
    }
    case "kelvin": {
      value = kelvin;
      break;
    }
  }

  if (typeof value === "number") {
    Number(value).toFixed(2);
    console.log(value, "is a", typeof value);
  }

  return { value, kelvinTemperatureNotNegative };
}

resultTemperatureInputElement.addEventListener("click", copyToClipboard);
