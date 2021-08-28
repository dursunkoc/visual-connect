import Task from './Task'
import PropTypes from 'prop-types'

const Tasks = ({tasks}) => {
    return (
        <>
            {
            tasks.length>0 ?
            tasks.map((task, index)=> <Task key={index}  task={task} />)
                :
            <p>No Tasks</p>}
        </>
    )
}

Tasks.defaultProps = {
    tasks : [],
}

Tasks.propTypes = {
    tasks: PropTypes.array,
}

export default Tasks
