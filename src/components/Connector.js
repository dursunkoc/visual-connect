import { FaTimes, FaStopCircle, FaPlayCircle, FaRedoAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Connector = ({ connector, onDelete, onStop, onStart, onRestart }) => {
    const isRunning = connector.status === 'Running'
    return (
        <div className={`connector ${isRunning ? 'running' : 'failed'}`}>
            <h3><div>{connector.name}</div>
                <div className="buttonGroup">{isRunning?
                    <FaStopCircle
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => onStop(connector.id)} />
                    :
                    <FaPlayCircle
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => onStart(connector.id)} />
                }
                <FaRedoAlt
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => onRestart(connector.id)} />
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(connector.id)} /></div>
            </h3>
            <p>{connector.status}</p>
        </div>
    )
}

Connector.defaultProps = {
    onDelete: (id) => { console.log("TODO: Implement the delete: id=" + id) },
    onStop: (id) => { console.log("TODO: Implement the stop: id=" + id) },
    onStart: (id) => { console.log("TODO: Implement the start: id=" + id) },
    onRestart: (id) => { console.log("TODO: Implement the restart: id=" + id) },
}

Connector.propTypes = {
    connector: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
}

export default Connector
