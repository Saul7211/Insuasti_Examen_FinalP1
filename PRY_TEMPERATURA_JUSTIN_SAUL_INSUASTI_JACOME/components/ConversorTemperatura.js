const tpl = document.createElement("template");

tpl.innerHTML = `
<link rel="stylesheet" href="../public/vendor/bootstrap/css/bootstrap.min.css">

<div class="card shadow border-0">
    <div class="card-header bg-primary text-white text-center fw-bold">
        Conversor de Temperatura
    </div>

    <div class="card-body">

        <div class="mb-3">
            <label class="form-label fw-semibold">INGRESA UN VALOR A CONVERTIR</label>
            <input id="inputTemp" type="number" class="form-control" placeholder="Ingrese temperatura">
        </div>

        <div class="mb-3">
            <label class="form-label fw-semibold">Tipo de conversión:</label>
            <select id="selectFormato" class="form-select">
                <option value="C-F">Celsius a Fahrenheit</option>
                <option value="F-C">Fahrenheit a Celsius</option>
            </select>
        </div>

        <button id="btnConvertir" class="btn btn-warning w-100 fw-bold shadow-sm">
            Convertir
        </button>

        <div id="resultado" class="alert alert-info text-center mt-3 d-none"></div>
    </div>
</div>
`;

class ConversorTemperatura extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }

    connectedCallback() {
        this.formato = this.getAttribute("formato") || "C-F";
        this.input = this.shadowRoot.querySelector("#inputTemp");
        this.select = this.shadowRoot.querySelector("#selectFormato");
        this.resultado = this.shadowRoot.querySelector("#resultado");
        this.btn = this.shadowRoot.querySelector("#btnConvertir");

        
        this.select.value = this.formato;

        this.btn.addEventListener("click", () => this.convertir());
    }

    convertir() {
        const valor = parseFloat(this.input.value);

        if (isNaN(valor)) {
            this.mostrarResultado(" Ingrese un número válido.", "danger");
            return;
        }

        const formato = this.select.value;
        let res;

        if (formato === "C-F") {
            res = (valor * 9 / 5) + 32;
            this.mostrarResultado(`${valor} °C son ${res.toFixed(2)} °F`);
        } else {
            res = (valor - 32) * 5 / 9;
            this.mostrarResultado(`${valor} °F son ${res.toFixed(2)} °C`);
        }
    }

    mostrarResultado(texto, tipo = "info") {
        this.resultado.className = `alert alert-${tipo} text-center mt-3`;
        this.resultado.textContent = texto;
        this.resultado.classList.remove("d-none");
    }
}

customElements.define("conversor-temperatura", ConversorTemperatura);
