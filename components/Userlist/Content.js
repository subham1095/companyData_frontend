import React from "react";
import CreateUserAdmin from "../CreateUser/Createuser";
import styles from "../../styles/userContent.module.css";
import { useTable } from "react-table";
import { useState, useEffect } from "react";
import { userDataAction } from "../../redux/main";
import { userDataLists } from "../../redux/action/userDataAction";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import Create from "../createUser/createUser";

export default function Content() {
  const [dataList, setDataList] = useState([]);
  const [isApiChanged, setApiChanged] = useState(false);
  const columns = [
    { dataField: "_id", text: "ID", sort: true },
    { dataField: "name", text: "NAME", sort: true },
    { dataField: "email", text: "EMAIL", sort: true },
    { dataField: "status", text: "STATUS", sort: true },
    // {dataField: 'email', text: "EMAIL", sort:true},
    // {dataField: 'state', text: "STATE", sort:true},
  ];

  const dispatch = useDispatch();
  const { userDataLists } = bindActionCreators(userDataAction, dispatch);

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    firstPageText: "<<",
    lastPageText: ">>",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const apiCall = async () => {
    let response = await userDataLists();
    setDataList(response.data.data);
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className={styles.app_container}>
      <CreateUserAdmin userList={apiCall} />

      <BootstrapTable bootstrap4 keyField="Name" columns={columns} data={dataList} pagination={pagination} />
    </div>
  );
}
