import React, { Component } from 'react'

class AddServer extends Component {

    constructor(props) {
        super(props);
        this.state= {
            name: "", ip:"", type: "", message: {flag: 0, error: null, msg: null}
        }
    }

    typing = (e, textbox) => {
        const value = e.target.value;
        switch (textbox) {
            case 'name':
                this.setState({name: value})
                break;
            case 'ip':
                this.setState({ip: value})
                break;
            default:
                break;
        }
    }

    submit = (e) => {
      e.preventDefault();
      if(this.checkRequired())
     { 
      const sel = document.getElementById('inputState');
      const type = sel.options[sel.selectedIndex].text
        const server = {
            ip: this.state.ip,
            name: this.state.name,
            type: type,
            isRunning: 0,
            runTime: '00:00:00',
            price: 0
        }
        this.props.addServerFn(server)
        this.setState({message: {flag: 1, error: false, msg: 'Added successfully'}}, () => this.showMessage())
      }
      // error
      else {
        this.setState({message: {flag: 1, error: true, msg: 'All fields are required'}},() => this.showMessage())
      }
    }
 
    checkRequired = () => {
      return (this.state.ip !== "" && this.state.name !== "")
  }

  showMessage = () => {
     setTimeout(() => this.setState({message: {flag: 0}}), 3000)
  }

    render(){
        const {types} = this.props;
   
        return <div><form>
        <div className="form-row">
          <div className="form-group col-sm-2">
            <label htmlFor="inputName">Server name</label>
            <input type="text" className="form-control" id="inputName" onChange={(e) => this.typing(e, 'name')} required/>
          </div>
          <div className="form-group col-sm-2">
            <label htmlFor="inputIp">Server IP</label>
            <input type="text" className="form-control" id="inputIp" onChange={(e) => this.typing(e, 'ip')} required/>
          </div>
        </div>
    
        <div className="form-row">
          <div className="form-group col-sm-2">
          {
            types.length > 0 ?
            <select id="inputState" className="form-control">
              <option defaultValue>{types[0].name}</option>
                 { 
                    types.slice(1).map((item, index) => {
                    return <option key={index}>{item.name}</option>})
                 }
            </select> :  <select id="inputState" className="form-control"></select>
          }
          </div>
          <div className="form-group col-sm-2">
          <button type="submit" className="btn btn-primary" onClick={(e) => this.submit(e)}>Add Server</button>
          </div>
        </div>
        
        {
          this.state.message.flag === 0 ?
          null 
          : this.state.message.flag === 1 && this.state.message.error === true ?
          <div className="alert alert-danger" role="alert">
           {this.state.message.msg}
          </div>
          : <div className="alert alert-success" role="alert">
          {this.state.message.msg}
          </div>
          }
      </form>
      </div>
    }
}

export default AddServer;
