import Connector from "./Connector"
import PropTypes from 'prop-types'

const Connectors = ({connectors, onDelete}) => {
    return (
        <>
            {
            connectors.length>0 ?
            connectors.map((connector)=>
                <Connector    key={connector.id} 
                        connector={connector} 
                         onDelete={onDelete}
                />
                )
                :
            <p>Nothing to show</p>}
        </>
    ) 
}

Connectors.propDefaults={
    connectors: [],
    onDelete: (id) => {console.log("TODO: implement the onDelete for Connectors, ", id)}
}

Connector.propTypes = {
    connectors: PropTypes.array,
    onDelete: PropTypes.func,
}


export default Connectors
