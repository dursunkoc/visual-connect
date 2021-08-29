import { FaTimes, FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Tasks from './Tasks'
import { useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'

Modal.setAppElement('#root')
const Connector = ({ connector, info, onDelete }) => {
    const [tasksVisible, setTasksVisible] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const isRunning = connector.connector.state === 'RUNNING'
    const showDetail = () => {
        setModalIsOpen(true)
    }

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false)
    }

    const modalStyle = {
        overlay: { backgroundColor: 'blur' },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    return (
        <div className={`connector ${isRunning ? 'running' : 'failed'}`}>
            <h3><div>{connector.name}</div>
                <div className="buttonGroup">
                    <FaInfoCircle
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={showDetail} />
                    {tasksVisible ? <FaMinus onClick={() => setTasksVisible(false)} /> : <FaPlus onClick={() => setTasksVisible(true)} />}
                    <FaTimes
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => onDelete(connector.name)} />
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                    style={modalStyle}>
                    <h3>{connector.name}</h3>
                    <div className="container info">
                        <pre>{JSON.stringify(info, (k, v) => k === "tasks" || k === "type" ? undefined : v, 2)}</pre>
                    </div>
                    <div>
                        <Button onClick={handleCloseModal} text="Close" />
                    </div>
                </Modal>
            </h3>
            {tasksVisible && <Tasks tasks={connector.tasks} connectorName={connector.name} />}
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
