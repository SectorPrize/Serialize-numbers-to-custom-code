const generateRandomNumbers = (min, max, count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return numbers;
};

const createCharacterSet = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:;<=>?@[]^_`{|}~";
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
  return result.split("").reverse().join("");
};

const customBaseToDecimal = (encoded) => {
  const [symbols, base] = createCharacterSet();
  let result = 0;
  for (let i = 0; i < encoded.length; i++) {
    result +=
      symbols.indexOf(encoded[i]) * Math.pow(base, encoded.length - 1 - i);
  }
  return result;
};

const compressData = (input) => {
  if (!Array.isArray(input)) {
    input = input.split(",").map((num) => parseInt(num.trim(), 10));
  }

  if (!input.length) return input;

  const indexedInput = input.map((num, index) => ({ num, index }));
  indexedInput.sort((a, b) => a.num - b.num);

  const numberCounts = indexedInput.reduce((map, { num, index }) => {
    if (!map.has(num)) {
      map.set(num, []);
    }
    map.get(num).push(index);
    return map;
  }, new Map());

  const compressedParts = [];
  let prevNum = null;
  let count = 0;

  for (const [num, indices] of numberCounts) {
    if (prevNum !== null && num === prevNum + 1 && count === 0) {
      count = indices.length;
    } else {
      if (count > 0) {
        compressedParts.push(
          `${decimalToCustomBase(prevNum)}-${decimalToCustomBase(
            prevNum + count - 1
          )}`
        );
      } else {
        compressedParts.push(decimalToCustomBase(prevNum));
      }

      if (indices.length > 1) {
        compressedParts.push(
          `${decimalToCustomBase(num)}~${decimalToCustomBase(
            indices.length - 1
          )}`
        );
      }

      prevNum = num;
      count = 0;
    }
  }

  if (prevNum !== null) {
    if (count > 0) {
      compressedParts.push(
        `${decimalToCustomBase(prevNum)}-${decimalToCustomBase(
          prevNum + count - 1
        )}`
      );
    } else {
      compressedParts.push(decimalToCustomBase(prevNum));
    }
  }

  const compressedString = compressedParts.join("!");
  console.log("Сжата строка:", compressedString);
  return { compressedString, indexedInput };
};

const decompressData = ({ compressedString, indexedInput }) => {
  const decodedNumbers = compressedString.split("!").reduce((array, part) => {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(customBaseToDecimal);
      for (let num = start; num <= end; num++) {
        array.push(num);
      }
    } else if (part.includes("~")) {
      const [value, count] = part.split("~").map(customBaseToDecimal);
      for (let repeatCount = count; repeatCount > 0; repeatCount--) {
        array.push(value);
      }
    } else {
      array.push(customBaseToDecimal(part));
    }
    return array;
  }, []);

  const restoredNumbers = indexedInput
    .sort((a, b) => a.index - b.index)
    .map((item) => item.num);

  console.log("Декодированная строка:", restoredNumbers);
  return restoredNumbers;
};

const printResults = (input) => {
  console.log("Исходная строка:", input);

  const { compressedString, indexedInput } = compressData(input);
  const decompressed = decompressData({ compressedString, indexedInput });

  const isMatch = JSON.stringify(input) === JSON.stringify(decompressed);
  console.log("Исходные и декодированные данные совпадают:", isMatch);

  const originalLength = JSON.stringify(input).length;
  const compressedLength = compressedString.length;
  const compressionRatio = Math.floor(
    (compressedLength / originalLength) * 100
  );
  console.log("Коэффициент сжатия:", compressionRatio, "%");
};

printResults(generateRandomNumbers(1, 301, 10));

printResults(generateRandomNumbers(1, 301, 50));
printResults(generateRandomNumbers(1, 301, 100));
printResults(generateRandomNumbers(1, 301, 500));
printResults(generateRandomNumbers(1, 301, 1000));
printResults(generateRandomNumbers(1, 10, 1000));
printResults(generateRandomNumbers(10, 100, 1000));
printResults(generateRandomNumbers(100, 301, 1000));
