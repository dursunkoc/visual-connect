import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, showAddForm, onShowAddForm, onRefresh }) => {
    const onAdd = (e) => {
        onShowAddForm(e)
    }

    return (
        <header>
            <h1>{title}</h1>
            <Button color={showAddForm?'red':'green'} text={showAddForm?'Close Add Form':'Show Add Form'} onClick={onAdd} />
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
