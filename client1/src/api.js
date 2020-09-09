
export default {
    //Get
    fetchServers : () => {
        return fetch('http://localhost:4000/servers', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchTypes : () => {
        return fetch('http://localhost:4000/types', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },
    
    fetchChangeCurrency : (currency) => {
        return fetch(`http://localhost:4000/currency/${currency}`, {
            method: "get",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    },

    //POST
    fetchInsert : (server) => {
        return fetch('http://localhost:4000/addserver', {
            method: "post",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: server.name,
            ip: server.ip,
            type: server.type,
            isRunning: server.isRunning,
            runTime:  server.runTime,
            price:  server.price,
          })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    //DELETE
    fetchDelete : (id) => {
        return fetch(`http://localhost:4000/deleteserver/${id}`, {
            method: "delete",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchUpdateIsRunning: (id, toggle) => {
        return fetch(`http://localhost:4000/switch/${id}`, {
            method: "put",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            toggle: toggle
          })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchUpdateRunTime: (id, runTime) => {
        return fetch(`http://localhost:4000/runtime/${id}`, {
            method: "put",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            runTime: runTime
          })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchUpdatePrice: (id, price) => {
        return fetch(`http://localhost:4000/price/${id}`, {
            method: "put",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            price: price
          })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchPrice: (type) => {
        return fetch(`http://localhost:4000/types/${type}`, {
            method: "get",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    },

    fetchUpdateIsRunningOff: () => {
        return fetch('http://localhost:4000/isrunningoff', {
            method: "put",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    }
}

