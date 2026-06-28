export function renderCategories(categories) {
    const navContainer = document.getElementById('submenu-categoy');
    debugger

    const fragment = document.createDocumentFragment();

    categories.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.listStyle = "none";
        li.style.padding = "5px 0";
        li.innerHTML = ` <strong>${item.title}</strong> `;

        fragment.appendChild(li);
    });
debugger
    navContainer.appendChild(fragment);

}


export function renderProducts(products) {
    const app = document.getElementById("app");

    if (!products || products.length === 0) {
        app.innerHTML = `<p class="text-center">محصولی یافت نشد</p>`;
        return;
    }

    app.innerHTML = `
        <div class="row g-1">
            ${products.map(p => `
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="product-card">
                        <div class="product-card__img">
                        <img  alt="${p.title}" src='${p.thumbnail}' width="50" class="img-fluid"/>
                        </div>
                        <h6 class="product-card__title">${p.title}</h6>
                        <div class="product-card__price">
                            ${Number(p.price || 0).toLocaleString()} تومان
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}
