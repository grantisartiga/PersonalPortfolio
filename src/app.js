(function () {
    const controls = [...document.querySelectorAll(".control")];

    function activate(button) {
        document.querySelector(".active-btn").classList.remove("active-btn");
        button.classList.add("active-btn");
        document.querySelector(".active").classList.remove("active");
        document.getElementById(button.dataset.id).classList.add("active");
    }

    controls.forEach(button => {
        button.addEventListener("click", () => activate(button));
    });


    const fKeyMap = { F1: 0, F2: 1, F3: 2, F4: 3 };
    document.addEventListener("keydown", (e) => {
        const index = fKeyMap[e.key];
        if (index !== undefined && controls[index]) {
            e.preventDefault();
            activate(controls[index]);
        }
    });

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector("button[type=submit]");
            const btnText = submitBtn.querySelector(".btn-text");
            const originalText = btnText.textContent;

            submitBtn.disabled = true;
            btnText.textContent = "sending...";
            formStatus.textContent = "";
            formStatus.className = "form-status";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    formStatus.textContent = "// message sent — thanks for reaching out!";
                    formStatus.classList.add("status-success");
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => null);
                    const msg = data && data.errors
                        ? data.errors.map(err => err.message).join(", ")
                        : "something went wrong. please try again.";
                    formStatus.textContent = "// error: " + msg;
                    formStatus.classList.add("status-error");
                }
            } catch (err) {
                formStatus.textContent = "// error: could not send message. check your connection.";
                formStatus.classList.add("status-error");
            } finally {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        });
    }
})();

var typed = new Typed(".text", {
    strings: [
        "CpE Student",
        "Aspiring Embedded Engineer",
        "Hardware Enjoyer",
        "The GOAT",
        "Mogger",
        "Professional Overthinker",
        "Certified Nerd"
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});