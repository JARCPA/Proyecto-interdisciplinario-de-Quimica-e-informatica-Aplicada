/* =========================================================
   QUÍMICA ORGÁNICA EN LA VIDA COTIDIANA
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   1. MENÚ PARA CELULARES
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });


    /* Cerrar menú al seleccionar una opción */

    const enlacesMenu = navMenu.querySelectorAll("a");

    enlacesMenu.forEach(enlace => {

        enlace.addEventListener("click", () => {

            navMenu.classList.remove("show");

        });

    });

}


/* =========================================================
   2. ANIMACIÓN AL APARECER LAS SECCIONES
========================================================= */

const elementosAnimados = document.querySelectorAll(
    ".category-card, .intro-content, .section-title, .discover-content"
);


const observador = new IntersectionObserver(

    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


elementosAnimados.forEach(elemento => {

    observador.observe(elemento);

});


/* =========================================================
   3. BOTÓN PARA VOLVER ARRIBA
========================================================= */

const botonArriba = document.createElement("button");

botonArriba.innerHTML = "↑";

botonArriba.className = "back-to-top";

botonArriba.setAttribute(
    "aria-label",
    "Volver al inicio de la página"
);

document.body.appendChild(botonArriba);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        botonArriba.classList.add("show");

    } else {

        botonArriba.classList.remove("show");

    }

});


botonArriba.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/* =========================================================
   4. EFECTO DE PROFUNDIDAD EN LAS MOLÉCULAS
========================================================= */

const moleculas = document.querySelectorAll(".molecule");


window.addEventListener("mousemove", (evento) => {

    const x = (evento.clientX / window.innerWidth - 0.5);
    const y = (evento.clientY / window.innerHeight - 0.5);


    moleculas.forEach((molecula, indice) => {

        const velocidad = (indice + 1) * 8;

        molecula.style.transform =
            `translate(${x * velocidad}px, ${y * velocidad}px)`;

    });

});


/* =========================================================
   5. MENSAJE DE BIENVENIDA
========================================================= */

console.log(
    "🧪 Bienvenido a Química Orgánica en la Vida Cotidiana."
);

console.log(
    "Explora, aprende y descubre la química presente en tu día a día."
);

// =====================================================
// QUIZ DE QUÍMICA ORGÁNICA
// =====================================================

const correctAnswers = {
    1: "b",
    2: "a",
    3: "a",
    4: "a",
    5: "a",
    6: "a",
    7: "a",
    8: "a",
    9: "b",
    10: "b"
};


// Seleccionar respuestas

const answerOptions = document.querySelectorAll(".answer-option");

answerOptions.forEach(option => {

    option.addEventListener("click", function () {

        const question = this.dataset.question;

        const optionsOfQuestion =
            document.querySelectorAll(
                `.answer-option[data-question="${question}"]`
            );


        // Quitar selección anterior

        optionsOfQuestion.forEach(item => {

            item.classList.remove("selected");

        });


        // Seleccionar respuesta

        this.classList.add("selected");

    });

});


// =====================================================
// FINALIZAR QUIZ
// =====================================================

const finishQuiz = document.getElementById("finishQuiz");

if (finishQuiz) {

    finishQuiz.addEventListener("click", function () {

        let score = 0;


        // Revisar las 10 preguntas

        for (let i = 1; i <= 10; i++) {

            const selected =
                document.querySelector(
                    `.answer-option[data-question="${i}"].selected`
                );


            // Si respondió

            if (selected) {

                const answer = selected.dataset.answer;


                if (answer === correctAnswers[i]) {

                    score++;

                    selected.classList.add("correct");

                } else {

                    selected.classList.add("incorrect");


                    // Mostrar la respuesta correcta

                    const correctOption =
                        document.querySelector(
                            `.answer-option[data-question="${i}"][data-answer="${correctAnswers[i]}"]`
                        );

                    if (correctOption) {

                        correctOption.classList.add("correct");

                    }

                }

            }

        }


        // Mostrar resultado

        const result = document.getElementById("quizResult");

        const scoreText = document.getElementById("scoreText");

        const resultMessage =
            document.getElementById("resultMessage");


        if (result && scoreText && resultMessage) {

            result.style.display = "block";


            scoreText.textContent =
                `Obtuviste ${score} de 10`;


            if (score === 10) {

                resultMessage.textContent =
                    "Excelente. Dominas muy bien los conceptos de química orgánica.";

            } else if (score >= 8) {

                resultMessage.textContent =
                    "Muy buen resultado. Tienes una comprensión sólida del tema.";

            } else if (score >= 6) {

                resultMessage.textContent =
                    "Buen trabajo. Algunos conceptos todavía necesitan un pequeño repaso.";

            } else if (score >= 4) {

                resultMessage.textContent =
                    "Vas avanzando. Repasa las familias de compuestos y sus aplicaciones.";

            } else {

                resultMessage.textContent =
                    "Necesitas repasar algunos fundamentos de química orgánica.";

            }


            // Llevar al resultado

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }


        // Desactivar respuestas

        answerOptions.forEach(option => {

            option.disabled = true;

        });


        finishQuiz.disabled = true;

        finishQuiz.textContent =
            "Quiz completado";

    });

}


// =====================================================
// REINICIAR QUIZ
// =====================================================

const restartQuiz =
    document.getElementById("restartQuiz");


if (restartQuiz) {

    restartQuiz.addEventListener("click", function () {

        answerOptions.forEach(option => {

            option.disabled = false;

            option.classList.remove(
                "selected",
                "correct",
                "incorrect"
            );

        });


        const result =
            document.getElementById("quizResult");


        if (result) {

            result.style.display = "none";

        }


        if (finishQuiz) {

            finishQuiz.disabled = false;

            finishQuiz.textContent =
                "Ver mi resultado";

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

