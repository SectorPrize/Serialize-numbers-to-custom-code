const generateRandomNumbers = (min, max, count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return numbers.join(",");
};

const createCharacterSet = () => {
  let characters = "";
  for (let i = 33; i < 123; i++) {
    characters += String.fromCharCode(i);
  }
  return [characters, characters.length];
};

const decimalToCustomBase = (number) => {
  const [symbols, base] = createCharacterSet();
  let result = "";
  while (number >= base) {
    result += symbols[number % base];
    number = Math.floor(number / base);
  }
  result += symbols[number % base];
  return result;
};

const compressData = (input) => {
  console.log("Исходная строка:\n", input);

  if (!input.length) return input;

  const numberCounts = input
    .split(",")
    .sort((a, b) => a - b)
    .reduce((map, num) => {
      num = Number(num);
      map.has(num) ? map.set(num, map.get(num) + 1) : map.set(num, 1);
      return map;
    }, new Map());

  let rangeStart = Array.from(numberCounts.keys())[0];
  let rangeEnd = rangeStart;
  const compressedParts = [];

  for (const num of numberCounts.keys()) {
    if (num - rangeEnd <= 1) {
      rangeEnd = num;
    } else {
      if (rangeStart === rangeEnd) {
        compressedParts.push(decimalToCustomBase(rangeStart));
        rangeStart = num;
        rangeEnd = num;
      } else {
        compressedParts.push(
          `${decimalToCustomBase(rangeStart)}"${decimalToCustomBase(rangeEnd)}`
        );
        rangeStart = num;
        rangeEnd = num;
      }
    }
  }

  if (rangeStart !== rangeEnd) {
    compressedParts.push(
      `${decimalToCustomBase(rangeStart)}"${decimalToCustomBase(rangeEnd)}`
    );
  }

  for (const num of numberCounts.keys()) {
    if (numberCounts.get(num) > 1) {
      compressedParts.push(
        `${decimalToCustomBase(num)}~${decimalToCustomBase(
          numberCounts.get(num) - 1
        )}`
      );
    }
  }

  const compressedString = compressedParts.join("!");
  console.log("Сжата строка:\n", compressedString);
  console.log(
    "Коэффициент сжатия: ",
    Math.floor((compressedString.length / input.length) * 100),
    "%"
  );

  return compressedString;
};

const decompressData = (input) => {
  const decodeString = (encoded) => {
    let result = 0;
    const [symbols, base] = createCharacterSet();
    for (let i = 0; i < encoded.length; i++) {
      result += symbols.indexOf(encoded[i]) * Math.pow(base, i);
    }
    return result;
  };

  const decodedNumbers = input.split("!").reduce((array, part) => {
    if (part.includes('"')) {
      const range = part.split('"').map(decodeString);
      let num = range[0];
      while (num <= range[1]) array.push(num++);
    } else if (part.includes("~")) {
      const [value, count] = part.split("~").map(decodeString);
      let repeatCount = count;
      while (repeatCount > 0) {
        array.push(value);
        repeatCount--;
      }
    } else {
      array.push(decodeString(part));
    }
    return array;
  }, []);

  console.log("Декодированное:", decodedNumbers.join(","));
  return decodedNumbers.join(",");
};

decompressData(compressData(generateRandomNumbers(1, 301, 10)));
decompressData(compressData(generateRandomNumbers(92, 94, 10)));
decompressData(compressData(generateRandomNumbers(1, 301, 20)));
decompressData(compressData(generateRandomNumbers(1, 301, 50)));
decompressData(compressData(generateRandomNumbers(1, 301, 100)));
decompressData(compressData(generateRandomNumbers(1, 301, 500)));
decompressData(compressData(generateRandomNumbers(1, 301, 1000)));
decompressData(compressData(generateRandomNumbers(1, 11, 1000)));
decompressData(compressData(generateRandomNumbers(11, 100, 1000)));
decompressData(compressData(generateRandomNumbers(100, 301, 1000)));
