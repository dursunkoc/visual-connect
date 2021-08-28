import PropTypes from 'prop-types'

const Task = ({task}) => {
    const showTrace = () =>{
        if (task.trace){
            alert(task.trace)
        }
    }

    const isRunning = task.state === 'RUNNING'

    return (
        <div className={`task ${task.state.toLowerCase()}`} onClick={showTrace}>
            <h3>{task.id} - {task.worker_id}</h3>
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
