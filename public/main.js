// =====================================================
// 1. Menú responsive (móvil)
// =====================================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const abierto = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", abierto);
});

// Cerrar el menú al hacer clic en un enlace
navLinks.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", false);
    });
});


// =====================================================
// 2. Pestañas "Cómo trabajamos" (funcionalidad interactiva)
// =====================================================
const pasos = [
    {
        titulo: "Escuchar",
        texto: "Conocemos a las personas y organizaciones, entendemos su contexto y identificamos juntos las necesidades y oportunidades del territorio."
    },
    {
        titulo: "Diseñar",
        texto: "Transformamos las ideas en una propuesta clara: objetivos, actividades, recursos y aliados necesarios para avanzar."
    },
    {
        titulo: "Probar",
        texto: "Ponemos en práctica una primera versión del proyecto, aprendemos de los resultados y hacemos los ajustes necesarios."
    },
    {
        titulo: "Crecer",
        texto: "Fortalecemos las capacidades del equipo y lo conectamos con nuestra red para que el proyecto sea sostenible."
    }
];

const tabs = document.querySelectorAll(".tab");
const tabPanel = document.getElementById("tabPanel");
const tabTitulo = document.getElementById("tabTitulo");
const tabTexto = document.getElementById("tabTexto");

function mostrarPaso(indice) {
    tabs.forEach((tab, i) => {
        const activa = i === indice;
        tab.classList.toggle("active", activa);
        tab.setAttribute("aria-selected", activa);
    });

    tabTitulo.textContent = pasos[indice].titulo;
    tabTexto.textContent = pasos[indice].texto;

    // Reinicia la animación del panel
    tabPanel.style.animation = "none";
    tabPanel.offsetHeight;
    tabPanel.style.animation = "";
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        mostrarPaso(Number(tab.dataset.tab));
    });
});

mostrarPaso(0);


// =====================================================
// 3. Preguntas frecuentes (acordeón)
// =====================================================
document.querySelectorAll(".faq-question").forEach((pregunta) => {
    pregunta.addEventListener("click", () => {
        const item = pregunta.parentElement;
        const respuestaFaq = item.querySelector(".faq-answer");
        const abierto = item.classList.toggle("open");

        pregunta.setAttribute("aria-expanded", abierto);
        respuestaFaq.style.maxHeight = abierto
            ? respuestaFaq.scrollHeight + "px"
            : "0";
    });
});


// =====================================================
// 4. Formulario: Frontend → API Express → MongoDB
// =====================================================
const formulario = document.getElementById("clienteForm");
const respuesta = document.getElementById("respuesta");
const listaClientes = document.getElementById("listaClientes");
const btnEnviar = document.getElementById("btnEnviar");
const nota = document.getElementById("notaRegistros");

// Modo demostración: si la página se abre sin el servidor
// (por ejemplo en GitHub Pages), los registros se guardan en el navegador.
const CLAVE_DEMO = "lateralLabRegistros";

function leerRegistrosDemo() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_DEMO)) || [];
    } catch (error) {
        return [];
    }
}

function guardarRegistroDemo(cliente) {
    const registros = leerRegistrosDemo();
    registros.unshift(cliente);
    try {
        localStorage.setItem(CLAVE_DEMO, JSON.stringify(registros.slice(0, 10)));
    } catch (error) {
        // Si el navegador bloquea el almacenamiento, solo se muestra el mensaje
    }
}

function mostrarMensaje(texto, tipo) {
    respuesta.textContent = texto;
    respuesta.className = tipo;
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value;
    const ciudad = document.getElementById("ciudad").value.trim();

    // Validación en el navegador antes de enviar
    if (!nombre || !edad || !ciudad) {
        mostrarMensaje("Por favor completa todos los campos.", "error");
        return;
    }

    if (Number(edad) <= 0) {
        mostrarMensaje("La edad debe ser un número positivo.", "error");
        return;
    }

    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    try {
        const response = await fetch("/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, ciudad })
        });

        // Si no hay servidor (ej. GitHub Pages) la respuesta no es JSON
        const data = await response.json();

        if (!response.ok) {
            mostrarMensaje(data.error, "error");
            return;
        }

        mostrarMensaje(data.mensaje, "success");
        formulario.reset();
        cargarClientes();

    } catch (error) {
        // Sin servidor disponible: se usa el modo demostración
        guardarRegistroDemo({ nombre, edad: Number(edad), ciudad });
        mostrarMensaje(
            `Hola ${nombre} de ${ciudad}, tienes ${edad} años. Gracias por tu interés en Lateral Lab. (Modo demostración: para guardar en MongoDB, ejecuta el servidor con npm start).`,
            "success"
        );
        formulario.reset();
        cargarClientes();

    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Registrar interés";
    }
});


// Obtener los registros almacenados en MongoDB
async function cargarClientes() {
    try {
        let clientes;

        try {
            const response = await fetch("/clientes");
            if (!response.ok) throw new Error("Sin servidor");
            clientes = await response.json();
        } catch (error) {
            clientes = leerRegistrosDemo();
            nota.textContent = "Modo demostración: registros guardados en este navegador.";
        }

        listaClientes.innerHTML = "";

        if (!Array.isArray(clientes) || clientes.length === 0) {
            listaClientes.innerHTML = "<li>Aún no hay registros.</li>";
            return;
        }

        clientes.forEach((cliente) => {
            const item = document.createElement("li");
            const nombre = document.createElement("strong");
            const detalle = document.createElement("span");

            nombre.textContent = cliente.nombre;
            detalle.textContent = `${cliente.ciudad} · ${cliente.edad} años`;

            item.append(nombre, detalle);
            listaClientes.appendChild(item);
        });

    } catch (error) {
        listaClientes.innerHTML = "<li>No se pudo cargar el historial.</li>";
    }
}


// Año actual en el footer
document.getElementById("anio").textContent = new Date().getFullYear();

// Cargar los registros al abrir la página
cargarClientes();
