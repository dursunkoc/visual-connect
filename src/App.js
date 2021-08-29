import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState, useContext } from 'react'
import AddConnector from './components/AddConnector'
import { Context } from './Store'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [state, setState] = useContext(Context)

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

  useEffect(() => {
    const getConnectors = async () => {
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState(st=>({...st, connectors: data}))
    }
    getConnectors()
  }, [state.kafkaConnectUrl, setState])


  const onDeleteConnector = async (name) => {
    await fetch(`${state.kafkaConnectUrl}/connectors/${name}`, { method: 'DELETE' })
    let data = await fetchConnectors(state.kafkaConnectUrl)
    setState({...state, connectors: data})
  }

  const onShowAddFormClick = (e) => {
    setShowAddForm(!showAddForm)
  }

  const onRefreshData = async (e) => {
    let data = await fetchConnectors(state.kafkaConnectUrl)
    setState(state=>({...state, connectors: data}))
  }

  const onAddNewConnector = async (connectorJson) => {
    const resp = await fetch(`${state.kafkaConnectUrl}/connectors`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(connectorJson)
    })

    setShowAddForm(false)
    const addedConnectorData = await resp.json()
    if (addedConnectorData) {
      alert(`Successfully added connector ${addedConnectorData.name}`)
    } else {
      alert(`Operation Failed check kafka-connect logs!`)
    }
    let data = await fetchConnectors(state.kafkaConnectUrl)
    setState(state=>({...state, connectors: data}))
  }

  return (
    <div className="container">
      <Header title="Connectors" showAddForm={showAddForm} onShowAddForm={onShowAddFormClick} onRefresh={() => onRefreshData()} />
      {showAddForm && <AddConnector onAdd={onAddNewConnector} />}

      <Connectors onDelete={onDeleteConnector} />
    </div>
  );
}

export default App;
