import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Context } from '../Store'
import Button from './Button'


const Header = ({ title, onShowAddForm, onRefresh }) => {
    const [state, setState] = useContext(Context)
    const [url, setUrl] = useState(state.kafkaConnectUrl)

    const onAdd = (e) => {
        onShowAddForm(e)
    }

    const urlChange = (e) => {
        setUrl(e.target.value)
    }

    const submitUrlUpdate = async (e)=>{
        e.preventDefault()
        setState({ ...state, kafkaConnectUrl: url })
    }
    const urlModified = url !== state.kafkaConnectUrl
    return (
        <header>
            <h1>{title}</h1>
            <form  className="webflow-style-input" onSubmit={submitUrlUpdate}>
                <input value={url} onChange={urlChange} autoFocus/>
                <button type="submit"><FaArrowRight/></button>
            </form>
            {urlModified&&<div className="container warn">Current Url: {state.kafkaConnectUrl}, submit to update</div>}
            <Button color={urlModified?'gray':'green'} disabled={urlModified} text={'Add Connector'} onClick={onAdd} />
            <Button color={urlModified?'gray':'green'} disabled={urlModified} text={'Refresh'} onClick={onRefresh}/>
            
        </header>
    )
}
Header.defaultProps = {
    title: "Visual Connector",
    showAddForm: false,
    onShowAddForm: (e)=>{console.log("TODO: implement add form click")},
    onRefresh: (e)=>{console.log("TODO: implement refresh")},
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    showAddForm: PropTypes.bool.isRequired,
    onShowAddForm: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
}

export default Header
