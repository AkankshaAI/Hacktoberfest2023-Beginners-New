document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const hashButton = document.getElementById("hashButton");
    const resultDiv = document.getElementById("result");

    hashButton.addEventListener("click", function () {
        const password = passwordInput.value;
        if (password) {
            hashPassword(password).then(function (hashedPassword) {
                resultDiv.innerText = `Hashed Password: ${hashedPassword}`;
            }).catch(function (error) {
                console.error(error);
                resultDiv.innerText = "Error hashing the password.";
            });
        } else {
            resultDiv.innerText = "Please enter a password.";
        }
    });

    async function hashPassword(password) {
        const salt = new Uint8Array(16);
        crypto.getRandomValues(salt);

        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        const combinedData = new Uint8Array(salt.length + data.length);
        combinedData.set(salt, 0);
        combinedData.set(data, salt.length);

        const hashBuffer = await crypto.subtle.digest("SHA-256", combinedData);

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    }
});
