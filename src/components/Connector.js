import { FaTimes, FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Tasks from './Tasks'
import { useState } from 'react'
import { Modal } from 'react-modal'

//Modal.setAppElement('root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Connector = ({ connector, info, onDelete }) => {
    const [tasksVisible, setTasksVisible] = useState(false)

    const isRunning = connector.connector.state === 'RUNNING'
    const showDetail = () => {
        // TODO: show on model
        alert(JSON.stringify(info))
    }

    const hideTasks = () => {
        setTasksVisible(false)
    }
    const showTasks = () => {
        setTasksVisible(true)
    }


    return (
        <div className={`connector ${isRunning ? 'running' : 'failed'}`}>
            <h3><div>{connector.name}</div>
                <div className="buttonGroup">
                    <FaInfoCircle
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={showDetail} />
                    {tasksVisible ? <FaMinus onClick={hideTasks} /> : <FaPlus onClick={showTasks} />}
                    <FaTimes
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => onDelete(connector.name)} />
                </div>
            </h3>
            {tasksVisible && <Tasks tasks={connector.tasks} />}
        </div>
    )
}

Connector.defaultProps = {
    onDelete: (id) => { console.log("TODO: Implement the delete: id=" + id) },
}

Connector.propTypes = {
    connector: PropTypes.object.isRequired,
    info: PropTypes.oneOf.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Connector
