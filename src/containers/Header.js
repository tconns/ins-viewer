import Header from '../components/Header'
import store from '../store'


export default store.connect(({ canSelect }, { setCanSelect }) => ({
  canSelect,
  setCanSelect,
}))(Header)

