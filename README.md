Цель программы - максимальное сжатие данных относительно простой сериализации без алгоритма сжатия.
Сериализованная строка должна содержит только ASCII символы (в диапазоне с 33 по 122, но его можно кастомизирвоать).
В консоль выводятся исходная строка, сжатая строка, коэффициент сжатия.
В программе прописан набор тестов.
=================
Программа состояит из нескольких функций:

generateRandomNumbers(min, max, count) — генерирует случайную строку чисел.

createCharacterSet() — создаёт набор символов для кастомной системы счисления (за основу берется диапозон с 33 по 122 символы ASCII).

decimalToCustomBase(number) — переводит число в строку в новой системе счисления.

compressData(input) — сжимает строку чисел, группируя последовательности и частые элементы.

decompressData(input) — восстанавливает исходную строку чисел из сжатых данных.

Пример работы программы:

const input = generateRandomNumbers(1, 100, 10)
Генерируется случайня строка из 10 чисел диапозоном от 0 до 100.

createCharacterSet()
Создает набор символов для кодировки

decimalToCustomBase(number)
number - каждое число из набора
Преобразует числа в строку в новой кодировке, используя созданный набор символов

const compressed = compressData(input)
input - наша закодированная строка
Сожмёт эту уже закодированную строку

const decompressed = decompressData(compressed);
compressed - наша сжатая закодированная строка
Восстановит строку в числа

Вывод в косноль:
Исходная строка:
159,252,138,43,68,46,199,136,225,2
Сжата строка:
#!L!O!e!O"!Q"!f"!4#!N#
Коэффициент сжатия: 64 %
Декодированное: 2,43,46,68,199,225
