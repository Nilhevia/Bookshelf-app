const books = [];
const STORAGE_KEY = "DATA_BOOK";
const RENDER_EVENT = "render-buku";
const SAVED_EVENT = "saved-buku";

function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser tidak mendukung local storage");
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data !== null) {
        for (const buku of data) {
            books.push(buku);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function updateDataFromStorage() {
    if (isStorageExist()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function findBuku(bukuId) {
    for (const buku of books) {
        if (buku.id === bukuId) {
            return buku;
        }
    }
    return null;
}

function findBukuIndex(bukuId) {
    let index = 0;
    for (const buku of books) {
        if (buku.id === bukuId) return index;
        index++;
    }
    return -1;
}
