import Connectors from './components/Connectors'
import Header from './components/Header'
import { useEffect, useState, useContext } from 'react'
import AddConnector from './components/AddConnector'
import { Context } from './Store'
import Modal from 'react-modal'
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
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
  const [loading, setLoading] = useState(true)
  const alert = useAlert()

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
      setState(st => ({ ...st, connectors: data }))
    }
    getConnectors()
    setLoading(false)
  }, [state.kafkaConnectUrl, setState])

  const onDeleteConnector = async (name) => {
    setLoading(true)
    try {
      await fetch(`${state.kafkaConnectUrl}/connectors/${name}`, { method: 'DELETE' })
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState({ ...state, connectors: data })
    } finally {
      setLoading(false)
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
    setLoading(true)
    try {
      let data = await fetchConnectors(state.kafkaConnectUrl)
      setState(state => ({ ...state, connectors: data }))
    } finally {
      setLoading(false)
    }
  }

  const onAddNewConnector = async (connectorJson) => {
    setLoading(true)
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
    } finally {
      setModalIsOpen(false)
      setLoading(false)
    }
  }

  return (
    <div className="container">
      {loading ?
        <CircleLoader color='steelblue' loading={loading} css={loadingCssOverride} size={150} />
        :
        <>
          <Header title="Connectors" onShowAddForm={onShowAddFormClick} onRefresh={onRefreshData} />
          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
            style={modalStyle}>
            <div className="container addnew">
              <AddConnector onAdd={onAddNewConnector} onCancel={handleCloseModal} />
            </div>
          </Modal>
          <Connectors onDelete={onDeleteConnector} />
        </>
      }
    </div>
  );
}

export default App;
