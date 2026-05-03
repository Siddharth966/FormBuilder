import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateForm from './components/CreateForm'
import AppLayout from './components/AppLayout'
import AllForm from './components/AllForm'
import Responses from './components/Responses'
import FillForm from './components/FillForm'
import { MessageProvider } from './services/MessageProvider'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <Router>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path='/create' element={<CreateForm />} />
            <Route path='/update/:id' element={<CreateForm />} />
            <Route path="/forms" element={<AllForm />} />
            <Route path="/responses" element={<Responses />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/share/:id' element={<FillForm />} />
        </Routes>
      </MessageProvider>
    </Router>
  )
}

export default App