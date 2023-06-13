import React from "react";
import styles from "../../styles/userContent.module.css";
import { useTable } from "react-table";
import { useState, useEffect } from "react";
import { dataAction } from "../../redux/main";
import { dataLists } from "../../redux/action/dataAction";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import UploadExcel from "../UploadExcel/Uploadexcel";

export default function Datalist() {
  const [dataList, setDataList] = useState([]);
  const [isApiChanged, setApiChanged] = useState(false);
  const columns = [
    { dataField: "name", text: "NAME", sort: true },
    { dataField: "address", text: "ADDRESS", sort: true },
    { dataField: "cin", text: "CIN", sort: true },
    { dataField: "email", text: "EMAIL", sort: true },
    { dataField: "state", text: "STATE", sort: true },
  ];

  const dispatch = useDispatch();
  const { dataLists } = bindActionCreators(dataAction, dispatch);

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
    let response = await dataLists({
      pageno: 1,
      limit: 0,
      search: "",
    });

    if (response.data) {
      setApiChanged(true);
    }
    setDataList(response.data.data.rows);
  };

  useEffect(async () => {
    apiCall();
    setApiChanged(false);
  }, []);

  return (
    <div className={styles.app_container}>
      <UploadExcel dataList={apiCall} />
      <BootstrapTable bootstrap4 keyField="Name" columns={columns} data={dataList} pagination={pagination} />
    </div>
  );
}
