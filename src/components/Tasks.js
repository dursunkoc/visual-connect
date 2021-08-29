import Task from './Task'
import PropTypes from 'prop-types'

const Tasks = ({tasks, connectorName}) => {
    return (
        <>
            {
            tasks.length>0 ?
            tasks.map((task, index)=> <Task key={index}  task={task} connectorName={connectorName}/>)
                :
            <p>No Tasks</p>}
        </>
    )
}

Tasks.defaultProps = {
    tasks : [],
    connectorName: "",
}

Tasks.propTypes = {
    tasks: PropTypes.array,
    connectorName: PropTypes.string.isRequired,
}

export default Tasks
