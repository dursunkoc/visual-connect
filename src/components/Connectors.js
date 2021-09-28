import Connector from "./Connector"
import PropTypes from 'prop-types'
import { useContext, useState } from "react"
import { Context } from "../Store"
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa"

const Connectors = ({connectorType, onDelete, onPause, onResume, onRestart, onUpdate}) => {
    const [state] = useContext(Context)
    const [connectorsVisible, setConnectorsVisible] = useState(true)

    const capitalize=([first, ...rest]) => {
        return first.toUpperCase() + rest.join('').toLowerCase();
    }

    return (
        <div className={`connectors ${connectorType}`}>
            <h2><div>{capitalize(connectorType)} Connectors</div>
                <div className="buttonGroup">
                    {connectorsVisible ? <FaChevronCircleUp onClick={() => setConnectorsVisible(false)} /> : <FaChevronCircleDown onClick={() => setConnectorsVisible(true)} />}
                </div>
            </h2>
            {connectorsVisible &&
            (state.connectors.length>0 ?
            state.connectors.filter(connector=>connector.info.type===connectorType).map((connector, index)=>
                 <Connector key={index} connector={connector.status} info={connector.info} onDelete={onDelete} onPause={onPause} onResume={onResume} onRestart={onRestart} onUpdate={onUpdate}/>
                 )
                :
            <p>Nothing to show</p>)}
        </div>
    ) 
}

Connectors.defaultProps={
    connectors: [],
    onDelete: (id) => {console.log("TODO: implement the onDelete for Connectors, ", id)},
    onPause: (id) => {console.log("TODO: implement the onPause for Connectors, ", id)},
    onResume: (id) => {console.log("TODO: implement the onResume for Connectors, ", id)},
    onRestart: (id) => {console.log("TODO: implement the onRestart for Connectors, ", id)},
    onUpdate: (id) => {console.log("TODO: implement the onUpdate for Connectors, ", id)},
}

Connectors.propTypes = {
    connectors: PropTypes.array,
    onDelete: PropTypes.func,
    onPause: PropTypes.func,
    onResume: PropTypes.func,
    onRestart: PropTypes.func,
    onUpdate: PropTypes.func,
}


export default Connectors
