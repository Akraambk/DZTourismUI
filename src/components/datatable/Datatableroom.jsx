import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";

const Datatableroom = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [Listroom, setListroom] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms=async()=>{
    const result=await axios.get("http://localhost:9090/Room/getAllRooms")
    setListroom(result.data);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/Hotel/deleteRoom/${id}`);
      setListroom(Listroom.filter((item) => item.ID_Room !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.ID_Room)}
            >
              Delete room
            </div>
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={Listroom}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.ID_Room}
      />
    </div>
  );
};

export default Datatableroom;