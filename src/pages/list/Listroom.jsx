import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatableroom from "../../components/datatable/Datatableroom"

const Listroom = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatableroom columns={columns}/>
      </div>
    </div>
  )
}

export default Listroom