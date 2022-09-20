const tambahBuku = () => {
    const title = document.getElementById("input-judulBuku").value;
    const author = document.getElementById("input-bukuAuthor").value;
    const year = document.getElementById("input-bukuYear").value;
    const isCompleted = document.getElementById("input-bukuIsComplete").checked;
    const object = {
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isCompleted: isCompleted,
    };

    books.push(object);
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const buatBuku = (buku) => {
    const bukuItem = document.createElement("article");
    bukuItem.classList.add("buku-item");
    bukuItem.innerHTML = "";

    if (buku.isCompleted) {
        bukuItem.innerHTML = `
            <h3>${buku.title}</h3>
            <p>Penulis: ${buku.author}</p>
            <p>Tahun: ${buku.year}</p>
            <div class="action">
                <button class="incomplete" onclick="moveToUnCompleted(${buku.id}); return confirm('Apakah anda yakin megubah data ini?')">
                    - Belum Selesai
                </button>
                <button class="trash" onclick="removeBukuFromapp(${buku.id}); return confirm('Apakah anda yakin menghapus data ini?')">
                    <img class="icon" src="assets/trash.png" />
                </button>
            </div>`;
    } else {
        bukuItem.innerHTML = `
            <h3>${buku.title}</h3>
            <p>Penulis: ${buku.author}</p>
            <p>Tahun: ${buku.year}</p>
            <div class="action">
                <button class="complete" onclick="moveToCompleted(${buku.id}); return confirm('Apakah megubah yakin megubah data ini?')">
                    + Selesai dibaca
                </button>
                <button class="trash" onclick="removeBukuFromapp(${buku.id}); return confirm('Apakah anda yakin menghapus data ini?')">
                    <img class="icon" src="assets/trash.png" />
                </button>
            </div>`;
    }

    return bukuItem;
};

const moveToCompleted = (bukuId) => {
    const bukuTarget = findBuku(bukuId);
    if (bukuTarget == null) return;
    bukuTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const moveToUnCompleted = (bukuId) => {
    const bukuTarget = findBuku(bukuId);
    if (bukuTarget === null) return;
    bukuTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const removeBukuFromapp = (bukuId) => {
    const bukuTarget = findBukuIndex(bukuId);
    if (bukuTarget === -1) return;
    books.splice(bukuTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const searchBuku = (string) => {
    const bukuItem = document.querySelectorAll(".buku-item");
    for (const item of bukuItem) {
        const title = item.childNodes[1];
        if (title.innerText.toUpperCase().includes(string)) {
            title.parentElement.style.display = "";
        } else {
            title.parentElement.style.display = "none";
        }
    }
};

const bukuMain = (e) => {
    const appItem = document.querySelectorAll(".app-item");
    for (const app of appItem) {
        if (e == "all") {
            app.style.display = "";
            app.classList.remove("appByFilter");
        } else if (e == app.id) {
            app.style.display = "";
            app.classList.add("appByFilter");
        } else {
            app.style.display = "none";
        }
    }
};

const filters = document.querySelectorAll(".buku-main");
for (const filter of filters) {
    filter.addEventListener("click", () => {
        const active = document.querySelectorAll(".buku-active");
        for (const item of active) {
            item.className = item.className.replace("buku-active", "");
        }
        filter.classList.add("buku-active");
    });
}

const countApp = () => {
    let complete = [];
    let incomplete = [];

    books.filter((buku) => {
        if (buku.isCompleted === true) {
            complete.push(buku);
        } else {
            incomplete.push(buku);
        }
    });

    document.getElementById("hitungSemuaBuku").innerText = books.length;
    document.getElementById("hitungSelesai").innerText = complete.length++;
    document.getElementById("hitungBelumSelesai").innerText = incomplete.length++;
};

const sectionMain = document.getElementById("sectionMain");
const showTambahBuku = document.getElementById("showTambahBuku");
const hideTambahBuku = document.getElementById("hideTambahBuku");

showTambahBuku.addEventListener("click", () => {
    sectionMain.style.display = "block";
    showTambahBuku.style.display = "none";
});

hideTambahBuku.addEventListener("click", () => {
    sectionMain.style.display = "none";
    showTambahBuku.style.display = "flex";
});
