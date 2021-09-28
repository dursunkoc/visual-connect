import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState, useContext } from 'react'
import AddConnector from './components/AddConnector'
import { Context } from './Store'
import Modal from 'react-modal'
import { css } from "@emotion/react";
import Loader from "react-spinners/MoonLoader";
import { useAlert } from 'react-alert'

const loadingCssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: steelblue;
`;

Modal.setAppElement('#root')
function App() {
  const [state, setState] = useContext(Context)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const alert = useAlert()

  const fetchConnectors = async (url) => {
    try {
      const res = await fetch(`${url}/connectors?expand=info&expand=status`)
      const data = await res.json()
      return (Object.entries(data).map(o => o[1]).sort((a,b)=>a.info.name > b.info.name ? 1:-1))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => {
    const getConnectors = async () => {
      setState(st => ({ ...st, loading:true }))  
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState(st => ({ ...st, connectors: data, loading:false  }))
    }
    getConnectors()
  }, [state.kafkaConnectUrl, setState])

  const onDeleteConnector = async (name) => {
    setState(st => ({ ...st, loading:true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}`, { method: 'DELETE' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onPauseConnector = async (name) => {
    setState(st => ({ ...st, loading:true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}/pause`, { method: 'PUT' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onResumeConnector = async (name) => {
    setState(st => ({ ...st, loading:true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}/resume`, { method: 'PUT' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onRestartConnector = async(name) => {
    setState(st => ({ ...st, loading:true }))
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}/restart`, { method: 'POST' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onUpdateConnector = async(name, connectorStr) => {
    setState(st => ({ ...st, loading:true }))
    try {
      console.log(`updating connector: ${name}, with: ${JSON.stringify(connectorStr)}`);
      let updated = await fetch(`${state.kafkaConnectUrl}/connectors/${name}/config`, { method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(connectorStr)})
      console.log(`response: ${JSON.stringify(updated)}`)
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onShowAddFormClick = (e) => {
    setModalIsOpen(true);
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(false)
  }

  const modalStyle = {
    overlay: { backgroundColor: 'gray' },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    }
  }

  const onRefreshData = async (e) => {
    setState(st => ({ ...st, loading:true }))
    try {
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState(_state => ({ ..._state, connectors: data }))
    } finally {
      setState(st => ({ ...st, loading:false }))
    }
  }

  const onAddNewConnector = async (connectorJson) => {
    setState(st => ({ ...st, loading:true }))
    try {
      const resp = await fetch(`${state.kafkaConnectUrl}/connectors`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(connectorJson)
      })
      const addedConnectorData = await resp.json()
      if (addedConnectorData.name) {
        alert.success(`Successfully added connector ${addedConnectorData.name}`)
      } else {
        alert.error(`Operation Failed check kafka-connect logs!`)
      }
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } catch(error){
      console.error(error);
    } finally {
      setModalIsOpen(false)
      setState(st => ({ ...st, loading:false }))
    }
  }

  return (
    <div className="container">
      {state.loading ?
        <Loader color='steelblue' loading={state.loading} css={loadingCssOverride} size={150} />
        :
        <>
          <Header title="Connectors" onShowAddForm={onShowAddFormClick} onRefresh={onRefreshData} />
          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
            style={modalStyle}>
            <div className="container addnew">
              <AddConnector onAdd={onAddNewConnector} onCancel={handleCloseModal} />
            </div>
          </Modal>
          <Connectors connectorType='sink'
                      onDelete={onDeleteConnector}
                      onPause={onPauseConnector} 
                      onResume={onResumeConnector} 
                      onRestart={onRestartConnector}
                      onUpdate={onUpdateConnector}/>
          <Connectors connectorType='source'
                      onDelete={onDeleteConnector}
                      onPause={onPauseConnector} 
                      onResume={onResumeConnector} 
                      onRestart={onRestartConnector}
                      onUpdate={onUpdateConnector}/>
        </>
      }
    </div>
  );
}

export default App;
