import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Context } from '../Store'
import Button from './Button'


const Header = ({ title, onShowAddForm, onRefresh }) => {
    const [state, setState] = useContext(Context)

    const onAdd = (e) => {
        onShowAddForm(e)
    }

    return (
        <header>
            <h1>{title}</h1>
            <input value={state.kafkaConnectUrl} onChange={(e) => setState({ ...state, kafkaConnectUrl: e.target.value })} /><br/>
            <Button color={'green'} text={'Add Connector'} onClick={onAdd} />
            <Button color={'green'} text={'Refresh'} onClick={onRefresh} />
        </header>
    )
}

// const headingStyle = {
//     color: 'green', backgroundColor: 'black',
// }

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
