import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'

Modal.setAppElement('#root')
const Task = ({task}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const showTrace = () =>{
        if (task.trace){
            setModalIsOpen(true)
        }
    }

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false)
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
        <div className={`task ${task.state.toLowerCase()}`} onClick={showTrace}>
            <h3>{task.id} - {task.worker_id}</h3>
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
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
}

export default Task
