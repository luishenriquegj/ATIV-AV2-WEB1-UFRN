
function getCurrentStoredData(){
    return JSON.parse(localStorage.getItem("storedData")) || [];
}
 
function requestCPF(message){
    do {
        cpf = prompt(message, "");
        if (cpf === null) {
            return null; 
        } else if (cpf.length !== 14) {
            alert("Por favor insira um CPF válido.");
        }
    } while (cpf.length !== 14); 
    return cpf;
    
}

function clearData(event){
    event.preventDefault();
    const containerToBeCleared = document.getElementById("card-container");
    localStorage.clear();
    containerToBeCleared.innerHTML ='';
    alert('dados apagados com sucesso!');
}

function showCards(event) {
    const mapContainer = document.getElementById("card-container");
    let storedData = getCurrentStoredData();
    mapContainer.innerHTML = '';

    storedData.forEach((card, key) => {
        const div = document.createElement("div");
        div.classList.add("PersonCard");
        div.id = key;
        
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
    event.preventDefault(); 
    let storedData = getCurrentStoredData();
    const name = document.getElementById("nameInput").value;
    const cpf = document.getElementById("cpfInput").value;
    const birthday = document.getElementById("birthdayInput").value;
    const address = document.getElementById("addressInput").value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!cpfRegex.test(cpf)) {
        alert("CPF inválido, por favor insira o CPF no formato XXX.XXX.XXX-XX (pontuação necessária)");
        return;
    }

    if (storedData.some(item => item.cpf === cpf)) {
        alert("CPF já cadastrado, por favor tente novamente com outro CPF");
        return;
    }

    const formData = {
        name: name,
        cpf: cpf,
        birthday: birthday,
        address: address
    };

    storedData.unshift(formData);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    
    document.getElementById("nameInput").value = "";
    document.getElementById("cpfInput").value = "";
    document.getElementById("birthdayInput").value = "";
    document.getElementById("addressInput").value = "";

    alert("Cadastro efetuado com sucesso!");

    showCards(event);
}

function findAccount(event) {
    event.preventDefault();
    let storedData = getCurrentStoredData();
    const cpf = requestCPF("Insira o CPF do cadastro que deseja exibir:");

    if(!cpf){
        alert("busca cancelada");
        return;
    }

    const requestedEntry = storedData.find(item => item.cpf === cpf);
    if(!requestedEntry){
        alert("CPF digitado não consta no banco de dados");
        return;
    }

    alert(`Nome:${requestedEntry.name},Data de Nascimento:${requestedEntry.birthday},Endereço:${requestedEntry.address}`);
}


 
function removeData(event) {
    event.preventDefault();
    let storedData = getCurrentStoredData();
    const cpfToBeRemoved = requestCPF("Insira o CPF cadastrado que deseja remover (ESSA AÇÃO NÃO PODE SER REVERTIDA):");    
    const index = storedData.findIndex(data => data.cpf.includes(cpfToBeRemoved));
    console.log(index);
    if(!cpfToBeRemoved){
        alert("remoção cancelada");
        return;
    }
    if (index !== -1) {
        storedData.splice(index,1)
        console.log(storedData);
        localStorage.setItem("storedData", JSON.stringify(storedData));
        alert("Dados removidos com sucesso.");
       
    } else if(cpf !=null) {
        alert("CPF não encontrado.");
    }
    setTimeout(showCards(event),1000);
    
}

