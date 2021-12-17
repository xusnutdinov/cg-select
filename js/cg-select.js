// const selectID = "cg-select";
// const selectFromID = document.querySelector("#" + selectID);
// selectFromID.style.display = "none";

// if (selectFromID) {
//     selectFromID.addEventListener("click", (e) => {
//         e.stopPropagation();
//     });

//     const selectOptions = {};
//     const selectHTMLOptions = selectFromID.querySelectorAll("option");
//     const selectContainer = document.createElement("div");
//     selectContainer.classList.add("cg-select");

//     const selectTop = document.createElement("div");
//     selectTop.classList.add("cg-select-top");
//     selectTop.addEventListener("click", (e) => {
//         e.currentTarget.classList.toggle("active");
//     });
//     selectTop.innerHTML = "<span>Select the item</span>";

//     const selectBody = document.createElement("div");
//     selectBody.classList.add("cg-select-body");

//     selectHTMLOptions.forEach((option) => {
//         // selectOptions[option.value] = option.innerText;
//         let selectBodyElement = document.createElement("div");
//         selectBodyElement.classList.add("cg-select-body__item");
//         selectBodyElement.dataset.dataSelectValue = option.value;
//         selectBodyElement.innerText = option.innerText;
//         selectBodyElement.addEventListener("click", (e) => {
//             selectTop.querySelector("span").innerText = e.currentTarget.innerText;
//             selectTop.classList.remove("active");
//         });
//         selectBody.appendChild(selectBodyElement);
//     });

//     selectContainer.appendChild(selectTop);
//     selectContainer.appendChild(selectBody);

//     let selectParent = selectFromID.parentNode;

//     selectParent.insertBefore(selectContainer, selectFromID);
//     document.body.addEventListener("click", (e) => {
//         if (selectTop.classList.contains("active")) {
//             selectTop.classList.remove("active");
//         }
//     });
// }

const selectTopTemplate = (placeholder = "Выберете элемент") => {
    return `
    <div class="cg-select-top">
        <span>${placeholder}</span>
        <div class="cg-select-top__icon">Icon</div>
    </div>
    `;
};

const selectBodyTemplate = (data = {}) => {
    let items = [];
    if (data != {}) {
        for (let key in data) {
            items.push(`<li class="cg-select-body__item" data-select-value="${key}">${data[key.toString()]}</li>`);
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

const selectTemplate = (data) => {
    return `
        ${selectTopTemplate()}
        ${selectBodyTemplate(data)}
    `;
};

class Select {
    constructor(selector = "#select", options = {}) {
        this.$select = document.querySelector(selector);
        // this.options = options;
        this.$newSelect = "";
        this.$newSelectTop = "";
        this.data = {};
        this.#render();
        this.#clickHandler();
        this.selectedKey = "";
    }

    #render() {
        const $selectParent = this.$select.parentNode;
        this.$newSelect = document.createElement("div");
        this.$newSelect.classList.add("cg-select");

        this.getData();
        this.$newSelect.innerHTML = selectTemplate(this.data);
        $selectParent.insertBefore(this.$newSelect, this.$select);
        this.$select.style.display = "none";
        this.$newSelectTop = document.querySelector(".cg-select-top");
    }

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
                console.log(`[value="${this.selectedKey}"]`);
                this.$select.querySelector(`[value="${this.selectedKey}"]`).setAttribute("selected", "selected");
            });
        });
    }

    toggle() {
        if (this.$newSelectTop.classList.contains("active")) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.$newSelectTop.classList.add("active");
    }

    close() {
        this.$newSelectTop.classList.remove("active");
    }

    getData() {
        this.data = {};
        this.$select.querySelectorAll("option").forEach((el) => {
            this.data[el.value] = el.innerText;
        });
    }
}

const select = new Select("#cg-select", {});
