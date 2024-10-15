document.addEventListener("DOMContentLoaded", () => {
    const arrayContainer = document.getElementById('array');
    const countingSortButton = document.getElementById('countingSortButton');
    const heapSortButton = document.getElementById('heapSortButton');
    const quickSortButton = document.getElementById('quickSortButton');
    const mergeSortButton = document.getElementById('mergeSortButton');
    const bubbleSortButton = document.getElementById('bubbleSortButton');
    const arraySize = 60;
    let array = [];

    // Generate an array of random heights
    function generateArray() {
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(Math.floor(Math.random() * 300) + 50);
        }
        createBars(array);
    }

    // Function to create bars
    function createBars(array) {
        arrayContainer.innerHTML = '';
        array.forEach(height => {
            const bar = document.createElement('div');
            bar.style.height = `${height}px`;
            bar.classList.add('bar');
            arrayContainer.appendChild(bar);
        });
    }

    // Delay function for animations
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Change bar colors
    function changeBarColor(index, color) {
        document.getElementsByClassName('bar')[index].style.backgroundColor = color;
    }
    //Bubble sort
    async function bubbleSort(arr) {
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                bars[j].style.backgroundColor = '#e74c3c';
                bars[j + 1].style.backgroundColor = '#e74c3c';
                if (arr[j] > arr[j + 1]) {
                    await sleep(20);
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    createBars(arr);
                }
                bars[j].style.backgroundColor = '#3498db';
                bars[j + 1].style.backgroundColor = '#3498db';
            }
            bars[arr.length - i - 1].style.backgroundColor = '#2ecc71';
        }
    }

    // Counting Sort
    async function countingSort(arr) {
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        const range = max - min + 1;
        const count = Array(range).fill(0);
        const output = Array(arr.length).fill(0);

        for (let i = 0; i < arr.length; i++) {
            count[arr[i] - min]++;
        }

        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
            await sleep(50);
            createBars(output);
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            changeBarColor(i, '#2ecc71');
            await sleep(50);
        }
    }

    // Heap Sort
    async function heapSort(arr) {
        async function heapify(arr, n, i) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }

            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }

            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                await sleep(50);
                createBars(arr);
                await heapify(arr, n, largest);
            }
        }

        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            await sleep(50);
            createBars(arr);
            await heapify(arr, i, 0);
            changeBarColor(i, '#2ecc71');
        }
        changeBarColor(0, '#2ecc71');
    }

    // Quick Sort
    async function quickSort(arr, low, high) {
        async function partition(arr, low, high) {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                changeBarColor(j, '#e74c3c');
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    await sleep(50);
                    createBars(arr);
                }
                changeBarColor(j, '#3498db');
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            await sleep(50);
            createBars(arr);
            return i + 1;
        }

        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }

    // Merge Sort
    async function mergeSort(arr, l, r) {
        async function merge(arr, l, m, r) {
            const n1 = m - l + 1;
            const n2 = r - m;

            const L = Array(n1);
            const R = Array(n2);

            for (let i = 0; i < n1; i++) {
                L[i] = arr[l + i];
            }

            for (let j = 0; j < n2; j++) {
                R[j] = arr[m + 1 + j];
            }

            let i = 0, j = 0, k = l;

            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
                await sleep(50);
                createBars(arr);
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
                await sleep(50);
                createBars(arr);
            }

            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
                await sleep(50);
                createBars(arr);
            }
        }

        if (l < r) {
            const m = l + Math.floor((r - l) / 2);
            await mergeSort(arr, l, m);
            await mergeSort(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    }

    generateArray();

    // Event listeners for buttons
    bubbleSortButton.addEventListener('click', () => bubbleSort([...array]));
    countingSortButton.addEventListener('click', () => countingSort([...array]));
    heapSortButton.addEventListener('click', () => heapSort([...array]));
    quickSortButton.addEventListener('click', () => quickSort([...array], 0, array.length - 1));
    mergeSortButton.addEventListener('click', () => mergeSort([...array], 0, array.length - 1));
});
