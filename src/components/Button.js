import PropTypes from 'prop-types'


const Button = ({color, disabled, text, onClick}) => {
    return <button style  = {{backgroundColor: color}}
                className = 'btn'
                disabled = {disabled}
                onClick = {onClick}>
        {text}
    </button>
}

Button.defaultProps = {
    color: 'steelblue',
    disabled: false,
    onClick: (e)=>{console.log('Button clicked!', e)}
}

Button.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    text : PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button
