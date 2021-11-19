async function fetchInput(url) {
    (async () => {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAllInputs())
        });
        const content = await rawResponse.json();
    })();
}

function getAllInputs(){
    var inputs, body = {};

    inputs = document.getElementsByTagName('input');
    for (i = 0; i < inputs.length; ++i){
        body[inputs[i].name] = inputs[i].value;
    };
    select = document.getElementsByTagName('select');
    for (i = 0; i < select.length; ++i) {
        body[select[i].name] = select[i].value;
    };

    return body;
};

async function getLogin(url) {
    (async () => {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAllInputs())
        });
        const content = await rawResponse.json();
        if(content.gso == 'false'){
            $('.message').text('Bitte geben Sie eine GSO-Email ein!');
            $('.message').css({ "border": '#FF0000 1px solid' });
        }else{
            if(content.registered == false){
                window.location.href = "//localhost:7000/app/benutzeranlegen"
            }else{
                document.getElementById('pw').style.display = 'block';
                if(content.loggedIn == 'true'){
                    window.location.href = "//localhost:7000/app/auswahl"
                }
            }            
        }
    })();
}

async function fetchSession() {
    (async () => {
        const rawResponse = await fetch('/app/session', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        content = await rawResponse.json();

        if(content.loggedIn == 'true'){
            window.location.href = "//localhost:7000/app/auswahl"
        }else{
            $('#mail').val(content.email);
        }
    })();
}

async function fetchBenutzerAnlegen() {
    (async () => {
        const rawResponse = await fetch('/app/getId', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAllInputs())
        });
    })();
}


async function fetchRegister(url) {
    (async () => {
        console.log('fetchregister2')
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAllInputs())
        })
        
        
    })()
}

async function fetchUserData() {
    (async () => {
        const rawResponse = await fetch('/app/benutzerfetchen', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const content = await rawResponse.json();
        $('#vorname').val(content.vorname);
        $('#nachname').val(content.nachname);
        $('#adresse').val(content.adresse);
        $('#plz').val(content.plz);
        $('#ort').val(content.ort);
        $('.geschlecht').val(content.geschlecht);

    })()
}

async function saveUser() {
    (async () => {
        const rawResponse = await fetch('/app/benutzeraendern', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(getAllInputs())
        });
        const content = await rawResponse.json();
        
        console.log(content);

    })()
}


async function fetchInputFahrer(url) {
    (async () => {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAllInputs())
        });
        const content = await rawResponse.json();
    })();
    if(content.message = 'success'){
        console.log('Jey');
        window.location.href = "//localhost:7000/app/fahrterstellen";

    }else{
        console.log('fuck');
    }
}
