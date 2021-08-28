import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import AddConnector from './components/AddConnector'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [connectors, setConnectors] = useState([])

  useEffect(() => {
    const getConnectors = async ()=>{
      setConnectors(await fetchConnectors())
    }
    getConnectors()
  }, [])

  const fetchConnectors = async () =>{
    const res = await fetch('http://localhost:8083/connectors?expand=info&expand=status')
    const data = await res.json()
    return Object.entries(data).map(o=>o[1])
  }


  const onDeleteConnector = async (id) => {
    await fetch(`http://localhost:8083/connectors/${id}`, {method:'DELETE'})

    setConnectors(await fetchConnectors())
  }

  const onShowAddFormClick = (e) => {
    setShowAddForm(!showAddForm)
  }

  const onAddNewConnector = async (connectorJson) => {
    await fetch(`http://localhost:8083/connectors`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(connectorJson)
    })
    
    setConnectors(await fetchConnectors())

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
