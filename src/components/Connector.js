import { FaTimes, FaInfoCircle, FaPlus, FaMinus, FaPauseCircle, FaPlayCircle, FaHospitalSymbol, FaRegEdit } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Tasks from './Tasks'
import { useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'
import AddConnector from './AddConnector'

Modal.setAppElement('#root')
const Connector = ({ connector, info, onDelete, onPause, onResume, onRestart, onUpdate }) => {
    const [tasksVisible, setTasksVisible] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const isRunning = connector.connector.state === 'RUNNING'
    const isPaused = connector.connector.state ==='PAUSED'
    const hasError = connector.tasks.filter(t=>t.trace).length
    const isRunningLabel = ()=> (isRunning && !hasError ? 'running' : 'failed')
    const connectorStatus = isPaused ? 'paused' : isRunningLabel()
    

    const showDetail = () => {
        setModalIsOpen(true)
        setEditMode(false)
    }

    const showEdit = () => {
        setModalIsOpen(true)
        setEditMode(true)
    }

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    const pauseConnector = (e) =>{
        onPause(connector.name)
    }

    const resumeConnector = (e) =>{
        onResume(connector.name)
    }

    const restartConnector = (e) =>{
        onRestart(connector.name)
    }

    const updateConnector = (connectorJson) =>{
        onUpdate(connector.name, connectorJson)
        setModalIsOpen(false);
        setEditMode(false);
    }

    const modalStyle = {
        overlay: { backgroundColor: 'gray' },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    const showPauseResume = ()=> isPaused ? <FaPlayCircle style={{ color: 'black', cursor: 'pointer' }}
        onClick={resumeConnector} />
        :
        <FaPauseCircle style={{ color: 'black', cursor: 'pointer' }}
        onClick={pauseConnector} />

    const showPausedRestart = ()=> isPaused ? <FaPlayCircle style={{ color: 'black', cursor: 'pointer' }}
    onClick={resumeConnector} />
    :
    <FaHospitalSymbol style={{ color: 'black', cursor: 'pointer' }}
    onClick={restartConnector} />

    return (
        <div className={`connector ${connectorStatus}`}>
            <h3><div className="connectorname">{connector.name}</div>
                <div className="buttonGroup">
                    {isRunning ? showPauseResume() :showPausedRestart()}
                    <FaRegEdit
                        style={{ color: 'blueviolet', cursor: 'pointer' }}
                        onClick={showEdit} />
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
                    {editMode?
                        <div className="container addnew">
                            <AddConnector onAdd={updateConnector} 
                                onCancel={handleCloseModal} 
                                currentConnectorStr={JSON.stringify(info.config, (k, v) => k === "tasks" || k === "type" ? undefined : v, 2)}/>
                        </div>
                        :
                        <>
                        <div className="container info">
                            <pre>{JSON.stringify(info, (k, v) => k === "tasks" || k === "type" ? undefined : v, 2)}</pre>
                        </div>
                        <div>
                            <Button onClick={handleCloseModal} text="Close" />
                        </div>
                        </>
                    }
                </Modal>
            </h3>
            {tasksVisible && <Tasks tasks={connector.tasks} connectorName={connector.name} />}
        </div>
    )
}

Connector.propTypes = {
    connector: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default Connector
