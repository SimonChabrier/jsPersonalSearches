const module = {

    name : "api",

    init : () => { console.log(`${module.name} initialisé`) },

    apiGet : async (url) => {   
        try {
            const response = await fetch(url, { 
                method: 'GET', 
            });
            module.checkResponseStatus(response) === false ? console.log(`Erreur: ${response.status}`) : console.log(`Success: ${response.status}`);
            const data = await response.json();
            return data;   
        } catch (error) {
            console.log(error);  
        }
    },

    apiPost : async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            module.checkResponseStatus(response) === false ? console.log(`Erreur: ${response.status}`) : console.log(`Success: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    },

    apiPut : async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            module.checkResponseStatus(response) === false ? console.log(`Erreur: ${response.status}`) : console.log(`Success: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    },

    apiPatch : async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            module.checkResponseStatus(response) === false ? console.log(`Erreur: ${response.status}`) : console.log(`Success: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    },

    apiDelete : async (url) => {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            module.checkResponseStatus(response) === false ? console.log(`Erreur: ${response.status}`) : console.log(`Success: ${response.status}`);
        } catch (error) {
            console.log(error);
        }
    },

    checkResponseStatus : (response) => {
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    },

}

document.addEventListener('DOMContentLoaded', () => { module.init() }, false);

export default module;