import { renderCategories, renderProducts } from "./ui.js";

let categoriesCache = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {
    bindEvents();
    await loadCategories();
    await loadProducts();
}

async function loadCategories() {

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyR3VpZCI6IjY5MTE1YWRiLTk0M2MtNDZlZS05OWE1LWQ4ZGIzMmQyNDNiNyIsInNob3BDb2RlIjoiMWE4ODE3NDktYTNiNi00ZGFkLTNmMjYtMDhkZWNiOGIzNzEyIiwiVGltZU91dC1NaW51dGUiOiI2MCIsIm5iZiI6MTc4MjY0MTYxMSwiZXhwIjoxNzgyNjQ1MjExLCJpYXQiOjE3ODI2NDE2MTF9.wRIZk2-zDK0FsOXj8YBc15Pm2LV9ix5OBGCCK3MKe5M";

    const response = await fetch(
        "https://api.apitester.ir/api/Category/GetCategory/" + "1a881749-a3b6-4dad-3f26-08decb8b3712",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },

        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();

    let categoriesCache = result.isSuccess ? (result.data) : [];

    renderCategories(categoriesCache);
}

async function loadProducts() {
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyR3VpZCI6IjY5MTE1YWRiLTk0M2MtNDZlZS05OWE1LWQ4ZGIzMmQyNDNiNyIsInNob3BDb2RlIjoiMWE4ODE3NDktYTNiNi00ZGFkLTNmMjYtMDhkZWNiOGIzNzEyIiwiVGltZU91dC1NaW51dGUiOiI2MCIsIm5iZiI6MTc4MjY0MTYxMSwiZXhwIjoxNzgyNjQ1MjExLCJpYXQiOjE3ODI2NDE2MTF9.wRIZk2-zDK0FsOXj8YBc15Pm2LV9ix5OBGCCK3MKe5M";

  const response = await fetch(
                "https://api.apitester.ir/api/Product/GetProductWithPagination",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        size: 10,
                        page: 1,
                        shopCode: "1a881749-a3b6-4dad-3f26-08decb8b3712"
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            
            const result = await response.json();

                renderProducts(result.data);

}

function bindEvents() {
    document.addEventListener("click", async (e) => {
        const link = e.target.closest("[data-category-id]");
        if (!link) return;

        e.preventDefault();
        // state.categoryId = link.dataset.categoryId || "";
        saveState(state);
        await loadProducts();
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        // searchInput.value = state.search || "";

        let timer;
        searchInput.addEventListener("input", () => {
            clearTimeout(timer);
            // timer = setTimeout(async () => {
            //     state.search = searchInput.value.trim();
            //     saveState(state);
            //     await loadProducts();
            // }, 400);
        });
    }

    const pageTitle = document.getElementById("pageTitle");
    // if (pageTitle) {
    //     pageTitle.textContent = state.categoryId
    //         // ? "محصولات گروه انتخاب‌شده"
    //         // : "لیست محصولات";
    // }
}
