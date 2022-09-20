document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("input-buku").addEventListener("submit", (e) => {
        e.preventDefault();
        tambahBuku();
    });

    document
        .getElementById("cariJudulBuku")
        .addEventListener("keyup", (e) => {
            const searchString = e.target.value.toUpperCase();
            searchBuku(searchString);
        });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const incomplete = document.getElementById("incompleteBukuList");
    const complete = document.getElementById("completeBukuList");
    incomplete.innerHTML = "";
    complete.innerHTML = "";

    for (const buku of books) {
        const bukuContent = buatBuku(buku);
        if (buku.isCompleted) {
            complete.append(bukuContent);
        } else {
            incomplete.append(bukuContent);
        }
    }

    countApp();
});

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});
