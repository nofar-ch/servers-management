import React, { Component } from 'react'
import Api from '../api'
import ServersTable from './serversTable';
import Currency from './currency';
import AddServer from './addServer';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            servers: [],
            types: [],
            currencyIconClass: 'fa fa-usd',
        }
    }

    currency = {
        USD: 'fa fa-usd',
        EUR: 'fa fa-eur',
        ILS: 'fa fa-ils'
    }

    componentDidMount = () => {
        Api.fetchServers()
        .then(data => this.setState({servers: data}))

        Api.fetchTypes()
        .then(data => this.setState({types: data}))

        var saveThis = this;
        window.onbeforeunload = function () { 
            Api.fetchUpdateIsRunningOff()
            .then(() => saveThis.updateSevers());   
            return false; 	
        } 
}
 
    updateSevers = () => {
        Api.fetchServers()
        .then(data => this.setState({servers: data}))
        document.getElementById("select").selectedIndex = 0; 
        this.updateCurrency('USD');
    }

    addServer = (server) => {
        Api.fetchInsert(server)
        .then(() => this.updateSevers());

        this.clearTextBox();
    }

    deleteServer = (id, intervals) => {
        Api.fetchDelete(id)
        .then(() => this.updateSevers());
        //stop running
        var interval = intervals.filter((item) => item.id = id)['interval']
        clearInterval(interval);
    }

    changeCurrency = () => {
        var valueOption = document.getElementById("select").value;
        this.updateCurrency(valueOption);
    }

    updateCurrency = (currency) => {
        const EUR = 0.839;
        const ILS = 3.36;
        switch (currency){
            case 'EUR':
                Api.fetchChangeCurrency(EUR)
                .then(data => this.setState({servers: data,
                                            currencyIconClass: this.currency.EUR}));
                break;
            case 'ILS':
                Api.fetchChangeCurrency(ILS)
                .then(data => this.setState({servers: data,
                                            currencyIconClass: this.currency.ILS}));
                break;
            default:
                Api.fetchServers()
                .then(data => this.setState({servers: data,
                                            currencyIconClass: this.currency.USD}))
                break;
        
        }
        
    }

    isRunningSwitch = (id, isRunning) => {
        isRunning ? 
        Api.fetchUpdateIsRunning(id, 1) 
        : Api.fetchUpdateIsRunning(id, 0) 
    }

    updateRunTime = (id, objTimer) => {
        Api.fetchUpdateRunTime(id, objTimer['timerString']) 
        .then(() => this.updateSevers());

    }

    updatePrice = (id, second, type) => {
        Api.fetchPrice(type) 
        .then(data => this.setState({price: data[0].price}, 
            () => {
            Api.fetchUpdatePrice(id, this.state.price*second) 
            .then(() => this.updateSevers())
        }));
    }

    clearTextBox = () => {
        var name = document.getElementById('inputName');
        var ip = document.getElementById('inputIp');
        var selectType =  document.getElementById("inputState");
       
        selectType.selectedIndex = 0; 
        name.value = "";
        ip.value = "";
    }


    render(){
            return <div style={{position: 'relative', width: '800px', margin: '100px auto'}}>
            <ServersTable servers={this.state.servers} deleteServerFn={(id, intervals) => this.deleteServer(id, intervals)}
                            currencyIconClass={this .state.currencyIconClass}
                            isRunningSwitchFn={(id, toggle) => this.isRunningSwitch(id, toggle)}
                            updateRunTimeFn={(id, runTime) => this.updateRunTime(id, runTime)}
                            updatePriceFn={(id, second, price) => this.updatePrice(id, second, price)}
                            />
            <Currency changeCurrencyFn={(e) => this.changeCurrency(e)}/>
            <AddServer types={this.state.types} addServerFn={this.addServer}/>
            </div>
    }
}

export default Dashboard;
