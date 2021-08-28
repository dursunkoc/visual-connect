import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, showAddForm, onShowAddFormClick }) => {
    const onAdd = (e) => {
        onShowAddFormClick(e)
    }

    return (
        <header>
            <h1>{title}</h1>
            <Button color={showAddForm?'red':'green'} text={showAddForm?'Close Add Form':'Show Add Form'} onClick={onAdd} />
        </header>
    )
}

// const headingStyle = {
//     color: 'green', backgroundColor: 'black',
// }

Header.defaultProps = {
    title: "Visual Connector",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
