
module.exports = {
    getServersQuery: () => {
    return 'select *' 
        + ' from servers'
    },

    getTypesQuery: () => {
        return 'select *' 
        + ' from types'
    },

    insertServer: (server) => {
        return "INSERT INTO `servers` (`ip`,`name`,`type`,`isRunning`, `runTime`, `price`) VALUES ('" 
        + server.ip + "', '" + server.name + "', '" + server.type 
        + "', '" + server.isRunning + "', '" + server.runTime + "','" + server.price + "')";

    },
    deleteServer: (id) => {
        return `DELETE from servers where id = ${id}`
    },

    changeCurrency: (currency) => {
        return "select id, ip, name, type, isRunning, runTime, (price * '" + currency + "') as price from servers"
    },

    updateIsRunning: (id, toggle) => {
        return `update servers SET isRunning = ${toggle.toggle}
                WHERE id = ${id}`
    },

    updateRunTime: (id, runTime) => {
        return `update servers SET runTime = (SELECT ADDTIME(runTime, ${runTime}))
                WHERE id = ${id}`
    },

    updatePrice: (id, price) => {
        return "update servers SET price = (SELECT price + '"  + price + "') WHERE id =  '"  + id + "'"
    },

    getPrice: (type) => {
        return "select price from types WHERE name = '"  + type + "'"
    },

    isRunningOff: () => {
        return "update servers SET isRunning = '"  + 0 + "'"
    }
}



