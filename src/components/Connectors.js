import Connector from "./Connector"
import PropTypes from 'prop-types'

const Connectors = ({connectors, onDelete}) => {
    return (
        <>
            {
            connectors.length>0 ?
             connectors.map((connector, index)=>
                 <Connector key={index} connector={connector.status} info={connector.info} onDelete={onDelete}/>
                 )
                :
            <p>Nothing to show</p>}
        </>
    ) 
}

Connectors.defaultProps={
    connectors: [],
    onDelete: (id) => {console.log("TODO: implement the onDelete for Connectors, ", id)}
}

Connector.propTypes = {
    connectors: PropTypes.array,
    onDelete: PropTypes.func,
}


export default Connectors
