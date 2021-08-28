import { useState } from 'react'

const AddConnector = ({onAdd}) => {
    const [connectorStr, setConnectorStr] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if (!connectorStr){
            alert("Please insert a valid Connector definition!")
            return
        }
        try {
            const connectorJson = JSON.parse(connectorStr)
            onAdd(connectorJson)
            setConnectorStr("")
        } catch (error) {
            alert("Please insert a valid Connector definition!")
            return
        }
    }

    const onConnectorDefinitionChange = (e) => {
        setConnectorStr(e.target.value);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Connector Definition</label>
                <textarea rows='10' cols='55'
                    value={connectorStr}
                    onChange={onConnectorDefinitionChange} />
            </div>
            <input type='submit' value='Save Connector' className='btn btn-block' />
        </form>
    )
}

AddConnector.defaultProps={
    onAdd: (json)=>{console.log("TODO: implement the addConnector method, ", json)}
}

export default AddConnector
