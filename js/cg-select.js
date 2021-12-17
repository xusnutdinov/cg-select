// Template for Top part of Select
const selectTopTemplate = (placeholder = "Выберете элемент") => {
    return `
    <div class="cg-select-top">
        <span>${placeholder}</span>
        <div class="cg-select-top__icon">Icon</div>
    </div>
    `;
};

// Template for dropdown part of Select
const selectBodyTemplate = (data = {}, selectedKey) => {
    let items = [];
    if (data != {}) {
        for (let key in data) {
            let cls = "";
            if (selectedKey === key.toString()) {
                cls = "selected";
            }
            items.push(
                `<li class="cg-select-body__item ${cls}" data-select-value="${key}">${data[key.toString()]}</li>`
            );
        }
        items = items.join("");
    }
    return `
    <div class="cg-select-body">
        <ul class="cg-select-body__list">
            ${items}
        </ul>
    </div>
    `;
};

// Template for whole Select
const selectTemplate = (data, selectedKey) => {
    return `
        ${selectTopTemplate()}
        ${selectBodyTemplate(data, selectedKey)}
    `;
};

class Select {
    constructor(selector = "#select", options = {}) {
        this.$select = document.querySelector(selector);
        this.$newSelect = "";
        this.$newSelectTop = "";
        this.data = {};
        this.#render();
        this.#clickHandler();
        this.selectedKey = "";
    }

    // Render markup of new Select in HTML
    #render() {
        const $selectParent = this.$select.parentNode;

        this.$newSelect = document.createElement("div");
        this.$newSelect.classList.add("cg-select");

        this.getData();
        this.$newSelect.innerHTML = selectTemplate(this.data, this.selectedKey);
        $selectParent.insertBefore(this.$newSelect, this.$select);
        this.$select.style.display = "none";
        this.$newSelectTop = document.querySelector(".cg-select-top");
    }

    // EventListener of clicks
    #clickHandler() {
        this.$newSelect.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        this.$newSelectTop.addEventListener("click", (e) => {
            this.toggle();
        });

        document.body.addEventListener("click", (e) => {
            this.close();
        });

        this.$newSelect.querySelectorAll(".cg-select-body__item").forEach((item) => {
            item.addEventListener("click", (e) => {
                this.close();

                this.$newSelectTop.querySelector("span").innerText = e.currentTarget.innerText;
                this.selectedKey = e.currentTarget.dataset.selectValue;
                this.$select.querySelectorAll("option").forEach((el) => {
                    el.setAttribute("selected", "");
                });
                this.$select.querySelector(`[value="${this.selectedKey}"]`).setAttribute("selected", "selected");
                this.$newSelect.querySelectorAll(".cg-select-body__item").forEach((el) => {
                    el.classList.remove("selected");
                });
                this.$newSelect.querySelector(`[data-select-value="${this.selectedKey}"]`).classList.add("selected");
            });
        });
    }

    // toggle the active class for select
    toggle() {
        if (this.$newSelectTop.classList.contains("active")) {
            this.close();
        } else {
            this.open();
        }
    }

    // Open Select
    open() {
        this.$newSelectTop.classList.add("active");
    }

    // Close Select
    close() {
        this.$newSelectTop.classList.remove("active");
    }

    // get Data from options of original select
    getData() {
        this.data = {};
        this.$select.querySelectorAll("option").forEach((el) => {
            this.data[el.value] = el.innerText;
        });
    }
}

const select = new Select("#cg-select", {});
