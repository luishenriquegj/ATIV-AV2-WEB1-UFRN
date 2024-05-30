function showCards(event) {
    const mapContainer = document.getElementById("card-container");
    let storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    mapContainer.innerHTML = '';

    storedData.forEach((card, key) => {
        const div = document.createElement("div");
        div.classList.add("PersonCard");

        div.innerHTML = `
            <h3>${card.name}</h3>
            <p><strong>CPF:</strong> ${card.cpf}</p>
            <p><strong>Data de Nascimento:</strong> ${card.birthday}</p>
            <p><strong>Endereço</strong>: ${card.address}</p>`;

        mapContainer.appendChild(div);
        event.preventDefault();
    });
}


function storeData(event) {
    console.log(event);

    const name = document.getElementById("nameInput").value;
    const cpf = document.getElementById("cpfInput").value;
    const birthday = document.getElementById("birthdayInput").value;
    const address = document.getElementById("addressInput").value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    
    if (!cpfRegex.test(cpf)) {
        alert("CPF inváido, por favor insira o CPF no formato XXX.XXX.XXX-XX (pontuação necessária)");
        return;
    }

    const formData = {
        name: name,
        cpf: cpf,
        birthday: birthday,
        address: address
    };

    let storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    storedData.push(formData);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    
    document.getElementById("nameInput").value = "";
    document.getElementById("cpfInput").value = "";
    document.getElementById("birthdayInput").value = "";
    document.getElementById("addressInput").value = "";
    alert("Cadastro efetuado com sucesso!");
    showCards();
}


function requestCPF(){
    do {
        cpf = prompt("Insira o CPF cadastrado que deseja remover (ESSA AÇÃO NÃO PODE SER REVERTIDA):", "");
        if (cpf === null) {
            return null; // User clicked cancel, return null
        } else if (cpf.length !== 14) {
            alert("Por favor insira um CPF válido.");
        }
    } while (cpf.length !== 14); // Keep prompting until the length is correct
    return cpf;
    
}


 
function removeData(event) {
    event.preventDefault();

    let storedData = JSON.parse(localStorage.getItem("storedData")) || [];
    const cpfToBeRemoved = requestCPF();    
    const index = storedData.findIndex(data => data.cpf === cpfToBeRemoved);
    
    if (index !== -1) {
        storedData.splice(index, 1);
        localStorage.setItem("storedData", JSON.stringify(storedData));

        alert("Dados removidos com sucesso.");
        showCards();
    } else if(cpf !=null) {
        alert("CPF não encontrado.");
    }
}

