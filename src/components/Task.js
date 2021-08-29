import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { FaExclamationCircle, FaRedo } from 'react-icons/fa'
import Modal from 'react-modal'
import Button from './Button'
import { Context } from '../Store'

Modal.setAppElement('#root')
const Task = ({task, connectorName}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [state, setState] = useContext(Context)

    const showTrace = () =>{
        if (task.trace){
            setModalIsOpen(true)
        }
    }

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false)
    }

    const fetchConnectors = async (url) => {
        try {
          const res = await fetch(`${url}/connectors?expand=info&expand=status`)
          const data = await res.json()
          return Object.entries(data).map(o => o[1])
        } catch (error) {
          console.log(error)
          return []
        }
      }

    const restartTask = async ()=>{
        const restartResp = await fetch(`${state.kafkaConnectUrl}/connectors/${connectorName}/tasks/${task.id}/restart`, {method:'POST'})
        
        const restartStatus = restartResp.status
        
        if(restartStatus<=300 && restartStatus>=200){
            alert("Successfully triggered restart");
        }else{
            alert("Failed to trigger restart please check Kafka Connect logs.");
        }
        
        let data = await fetchConnectors(state.kafkaConnectUrl)
        setState({...state, connectors: data})
    }

    const modalStyle = {
        overlay: { backgroundColor: 'grey' },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '500px',
        }
    }

    return (
        <div className={`task ${task.state.toLowerCase()}`}>
            <h3>Task - {task.id}
                <div className="buttonGroup">
                    {task.trace && <>
                        <FaExclamationCircle
                        style={{ color: 'red'}}
                        onClick={showTrace} />
                    <FaRedo
                        style={{ color: 'lighblue'}}
                        onClick={restartTask} />
                    </>}
                    
                </div>
            </h3>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}
                    style={modalStyle}>
                    <h3>Task Error {task.id} - {task.worker_id}</h3>
                    <div className="container info">
                        <pre>{task.trace}</pre>
                    </div>
                    <div>
                        <Button onClick={handleCloseModal} text="Close" />
                    </div>
            </Modal>
        </div>
    )
}

Task.defaultProps = {
    task: {},
    connectorName:""
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    connectorName: PropTypes.string.isRequired,
}

export default Task
