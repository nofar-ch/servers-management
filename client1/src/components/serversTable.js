import React, { Component } from 'react'

class ServersTable extends Component {

    constructor(props) {
        super(props)
        this.state = ({isLoading: true,
                        servers: null,
                        intervals: []});
    }

    componentDidMount = () => {  
        this.setState({servers: this.props.servers}, () => 
        {
            this.setState({isLoading: false})
            this.createIntervals();
        });
    }

    classes = {
        GREEN: 'btn btn-success',
        DARK: 'btn btn-dark'
    }

    createIntervals = () => {
        this.setState({intervals: []}, () => {
        var intervals = []; 
        this.state.servers.forEach(element => {
            intervals.push(this.createObjTimer(element.id))
        });
            this.setState({intervals: intervals});
        });
    }

    componentWillReceiveProps(nextProps) {
        // Any time props.servers changes, update this state.servers
        if (nextProps.servers.length !== this.props.servers.length) {
            var newServers = nextProps.servers;
          this.setState({servers: newServers}, () => this.createIntervals()
        )
    }
}
    
    createObjTimer = (id) => {
        var objTimer =  {
            id: id,
            interval: null,
            currentTimer: 0,
            timerString: '00:00:00'
        }
        return objTimer
    }

 switchRunning = (id, isRunningSwitchFn, updateRunTimeFn, updatePriceFn, intervals) => {  
    var button = document.getElementById(id);
    var label = button.textContent;

    var timerObj = intervals.filter(item => item.id === id)[0];
 
    // On
    if(label === 'On') 
    {
        isRunningSwitchFn(id, 0);
        button.setAttribute("class", this.classes.DARK);
        button.textContent = 'Off';
        this.stopTimer(timerObj, updateRunTimeFn, updatePriceFn);
    }
    //Off
    else 
    {
        isRunningSwitchFn(id, 1);
        button.setAttribute("class", this.classes.GREEN);
        button.textContent = 'On';
        this.startTimer(timerObj, updateRunTimeFn, updatePriceFn)
    }
}

  startTimer = (timerObj, updateRunTimeFn, updatePriceFn) => {
    timerObj['lastUpdateTime'] = new Date().getTime()
    timerObj['interval'] = setInterval(this.update, 10000, timerObj, updateRunTimeFn, updatePriceFn);
    
}

   stopTimer = (timerObj) => {
    clearInterval(timerObj['interval'])
}

 update = (timerObj, updateRunTimeFn, updatePriceFn) => {
    var now = new Date().getTime();
    
    var dt = now - timerObj['lastUpdateTime'];

    timerObj['currentTimer'] += dt;

    var time = new Date(timerObj['currentTimer']);

    var hours = time.getMinutes() / 60;
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    var timer = this.pad(hours)+ ':' + this.pad(minutes) + ':' + this.pad(seconds);
    timerObj['timerString'] = timer;
    timerObj['lastUpdateTime'] = now;

    //update runTime
    updateRunTimeFn(timerObj['id'], timerObj)
    var fil = this.state.servers.filter((item) => item.id === timerObj['id'])[0].type;
    
    //update price per second
    updatePriceFn(timerObj['id'], seconds, fil)
    timerObj['lastUpdateTime'] = new Date().getTime()
    timerObj['currentTimer'] = 0;
}
 pad = (n) => {
    return ('00' + n).substr(-2);
}

    render() {
    const {servers, deleteServerFn, currencyIconClass, isRunningSwitchFn, updateRunTimeFn, updatePriceFn} = this.props;
    
    if(this.state.isLoading === true)
        return <h1>Loading...</h1>
    else
    return (
    <table className="table table-striped" style={{width: '100%', border: '1px solid black'}}>
        <thead>
            <tr>
            <th scope="col">IP</th>
            <th scope="col">Server Name</th>
            <th scope="col">Time Running</th>
            <th scope="col">Toggle</th>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
        {
            servers != null ?
            servers.map((item, index) => {
                var runTimeId = 'runTime_' + item.id;
                return <tr key={index}>
                <td>{item.ip}</td>
                <td>{item.name}</td>
                <td id={runTimeId}>{item.runTime}</td>
                {
                    item.isRunning === 0 ? 
                    <td>
                    <button type="button" className="btn btn-dark" id={item.id} style={{borderRadius: '50%'}}
                    onClick={() => this.switchRunning(item.id, isRunningSwitchFn, updateRunTimeFn, updatePriceFn, this.state.intervals)}>Off</button>
                    </td> 
                    : <td><button type="button" className="btn btn-success" id={item.id} style={{borderRadius: '50%'}}
                     onClick={() => this.switchRunning(item.id, isRunningSwitchFn, updateRunTimeFn, updatePriceFn, this.state.intervals)}>On</button> 
                     </td> 
                }
                <td>{item.type}</td>
                <td>{item.price.toFixed(2)}<i className={currencyIconClass} style={{marginLeft: '5px'}}></i></td>
                <td><button type="button" className="btn btn-danger" onClick={() => deleteServerFn(item.id, this.state.intervals)}>Delete</button></td>
            </tr>
            }) : null   
        }
        </tbody>
        </table>)
    }

}

export default ServersTable;
