import { useState } from 'react'
import { useAlert } from 'react-alert'
import Button from './Button'

const AddConnector = ({onAdd, onCancel}) => {
    const [connectorStr, setConnectorStr] = useState("")
    const alert = useAlert()

    const onSubmit = (e) => {
        e.preventDefault()
        if (!connectorStr){
            alert.error("Please insert a valid Connector definition!")
            return
        }
        try {
            const connectorJson = JSON.parse(connectorStr)
            onAdd(connectorJson)
            setConnectorStr("")
        } catch (error) {
            alert.error("Please insert a valid Connector definition!")
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
            <Button color='green' onClick={onSubmit} text='Save'/>
            <Button color='red' onClick={onCancel} text='Cancel'/>
        </form>
    )
}

AddConnector.defaultProps={
    onAdd: (json)=>{console.log("TODO: implement the addConnector method, ", json)}
}

export default AddConnector
