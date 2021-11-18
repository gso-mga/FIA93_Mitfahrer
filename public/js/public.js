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
        console.log(content);
        return content;
    })();
}

function getAllInputs(){
    var inputs, body = {};

    inputs = document.getElementsByTagName('input');
    for (i = 0; i < inputs.length; ++i){
     //   console.log(inputs[i].name + ' ' + inputs[i].value);
        body[inputs[i].name] = inputs[i].value;
    };
    return body;
};

async function getInput(url) {
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

        if(content.gso){
            document.getElementById('pw').style.display = 'block';
        }
    })();
}