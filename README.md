## Цель программы - максимальное сжатие данных относительно простой сериализации без алгоритма сжатия.

### Сериализованная строка должна содержит только ASCII символы. В консоль выводятся исходная строка, сжатая строка, коэффициент сжатия. В программе прописан набор тестов.

Программа состояит из нескольких функций:

generateRandomNumbers(min, max, count) — Генерируется случайня строка из count чисел диапозоном от min до max.

createCharacterSet() - Создает набор символов для кодировки.

decimalToCustomBase(number) — Преобразует число number в строку в новой кодировке, используя созданный набор символов.

compressData(input) — Сожмёт закодированную строку input.

customBaseToDecimal(encoded) - Декодирование числа из строки.

decompressData(input) — Декодирует сжатые данные и восстанавливает исходный порядок чисел.

Пример работы программы:

printResults(generateRandomNumbers(1, 301, 10));
Вывод в косноль:

Исходная строка: [
21, 201, 89, 75,
100, 52, 17, 301,
252, 284
]
Сжата строка: A!R!V!0!|!BL!BW!Ct!DS!Dy!D?
Декодированная строка: [
21, 201, 89, 75,
100, 52, 17, 301,
252, 284
]
Исходные и декодированные данные совпадают: true
Коэффициент сжатия: 75 %
