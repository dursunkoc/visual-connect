import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import AddConnector from './components/AddConnector'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [connectors, setConnectors] = useState([])

  useEffect(() => {
    const getConnectors = async ()=>{
      const connectorsFromServer = await fetchConnectors()
      setConnectors(connectorsFromServer)
    }
    getConnectors()
  }, [])

  const fetchConnectors = async () =>{
    const res = await fetch('http://localhost:5000/connectors')
    const data = res.json()
    return data
  }


  const onDeleteConnector = async (id) => {
    await fetch(`http://localhost:5000/connectors/${id}`, {method:'DELETE'})

    setConnectors(await fetchConnectors())
  }

  const onShowAddFormClick = (e) => {
    setShowAddForm(!showAddForm)
  }

  const onAddNewConnector = async (connectorJson) => {
    const addedConnector = await fetch(`http://localhost:5000/connectors`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(connectorJson)
    })

    console.log(addedConnector)
    
    const connectors = await fetchConnectors()
    setConnectors(connectors)

    setShowAddForm(false)
  }

  return (
    <>
      <div className="container">
        <Header title="Connectors" showAddForm={showAddForm} onShowAddFormClick={onShowAddFormClick} />
        {showAddForm && <AddConnector onAdd={onAddNewConnector} />}

        <Connectors connectors={connectors} onDelete={onDeleteConnector} />
      </div>
    </>
  );
}

export default App;
