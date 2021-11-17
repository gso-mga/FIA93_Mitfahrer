async function fetchInput(mail, pw) {
    (async () => {
        const rawResponse = await fetch('/app/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: mail, password: pw })
        });
        const content = await rawResponse.json();

        console.log(content);
    })();
}