import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import AddConnector from './components/AddConnector'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [connectors, setConnectors] = useState([])
  const [kafkaConnectPath, setKafkaConnectPath] = useState('http://localhost:8083')

  const fetchConnectors = async () =>{
    const res = await fetch(`${kafkaConnectPath}/connectors?expand=info&expand=status`)
    const data = await res.json()
    return Object.entries(data).map(o=>o[1])
  }

  useEffect(() => {
    
    const getConnectors = async ()=>{
      const res = await fetch(`${kafkaConnectPath}/connectors?expand=info&expand=status`)
      const data = await res.json()
      setConnectors(Object.entries(data).map(o=>o[1]))
    }
    
    getConnectors()
  }, [kafkaConnectPath])


  const onDeleteConnector = async (name) => {
    await fetch(`${kafkaConnectPath}/connectors/${name}`, {method:'DELETE'})
    setConnectors(await fetchConnectors())
  }

  const onShowAddFormClick = (e) => {
    setShowAddForm(!showAddForm)
  }

  const onRefreshData = async (e)=>{
    setConnectors(await fetchConnectors())
  }

  const onAddNewConnector = async (connectorJson) => {
    const resp = await fetch(`${kafkaConnectPath}/connectors`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(connectorJson)
    })

    setShowAddForm(false)
    const addedConnectorData = await resp.json()
    if(addedConnectorData){
      alert(`Successfully added connector ${addedConnectorData.name}`)
    }else{
      alert(`Operation Failed check kafka-connect logs!`)
    }
    setConnectors(await fetchConnectors())
  }

  return (
    <>
      <div className="container">
        <input value={kafkaConnectPath} onChange={(e)=> setKafkaConnectPath(e.target.value)}/>
        <Header title="Connectors" showAddForm={showAddForm} onShowAddForm={onShowAddFormClick} onRefresh={()=>onRefreshData()}/>
        {showAddForm && <AddConnector onAdd={onAddNewConnector} />}

        <Connectors connectors={connectors} onDelete={onDeleteConnector} />
      </div>
    </>
  );
}

export default App;
