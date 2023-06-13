import React from "react";
import styles from "../../styles/userContent.module.css";
import { useTable } from "react-table";
import { useState, useEffect } from "react";
import { accessDataAction, changeApiAction, deactivateApiAction } from "../../redux/main";
import { accessDataLists } from "../../redux/action/accessDataAction";
import { changeApiKey } from "../../redux/action/changeApiAction";
import { deactivateApiKey } from "../../redux/action/deactivateApiAction";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import AccessCreate from "../AccessCreate/Accesscreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCopy, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Accesslist() {
  const [isApiChanged, setApiChanged] = useState(false);

  const dispatch = useDispatch();
  const { changeApiKey } = bindActionCreators(changeApiAction, dispatch);
  const { deactivateApiKey } = bindActionCreators(deactivateApiAction, dispatch);

  const ButtonFormatter = (props) => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          if (window.isSecureContext) {
            navigator.clipboard.writeText(props.data.apiKey);
          } else {
            copyApiKey(props.data.apiKey);
          }

          toast.info("Api Key Copied");
        }}
      >
        <FontAwesomeIcon icon={faCopy} />
        {""}
      </button>
    );
  };

  const copyApiKey = (text) => {
    var input = document.createElement("textarea");
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
  };

  const ButtonFormatter1 = (props) => {
    return (
      <button
        type="submit"
        className="btn btn-success"
        onClick={async () => {
          let response = await changeApiKey({
            _id: props.data._id,
          });
          if (response && response.data) {
            if (response.data.success) {
              setApiChanged(true);
              toast.info(response.data.message);
            } else {
              setApiChanged(false);
              toast.error(response.data.message);
            }
          } else {
            toast.error("Something went wrong");
          }
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    );
  };
  const ButtonFormatter2 = (props) => {
    // console.log(props)
    return (
      <button
        type="submit"
        className={props.data.status ? "btn btn-danger" : "btn btn-success"}
        onClick={async () => {
          changeStatus(props);
        }}
      >
        {props.data.status ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faCheck} />}
      </button>
    );
  };

  function rankFormatter(cell, row) {
    //  console.log(row)
    return (
      <div style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}>
        <ButtonFormatter data={row} /> {""}
        {""}
        {""}
        <ButtonFormatter1 data={row} />
        {""} {""}
        {""}
        <ButtonFormatter2 data={row} style={{ fontSize: 20 }} />
      </div>
    );
  }

  // editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
  //   <ButtonFormatter { ...editorProps } value={row}  />

  // ),

  const [dataList, setDataList] = useState([]);
  const columns = [
    {
      filter: textFilter(),
      dataField: "_id",
      text: "ID",
      sort: true,

      style: { width: 300, headerAlign: "center", fontSize: 13, fontWeight: 500 },
    },
    {
      dataField: "name",
      text: "NAME",
      sort: true,
      filter: textFilter(),
      style: { width: 300, headerAlign: "center", fontSize: 13, fontWeight: 500 },
    },
    {
      dataField: "email",
      text: "EMAIL",
      sort: true,
      filter: textFilter(),
      style: { width: 300, headerAlign: "center", fontSize: 12, fontWeight: 500 },
    },
    {
      dataField: "apiKey",
      text: "API KEY",
      sort: true,
      filter: textFilter(),
      style: { width: 300, headerAlign: "center", fontSize: 13, fontWeight: 500 },
    },
    {
      dataField: "status",
      text: "STATUS",
      sort: true,
      filter: textFilter(),
      style: { width: 300, headerAlign: "center", fontSize: 13, fontWeight: 500 },
    },
    {
      dataField: "button",
      text: "ACTION",
      sort: true,
      isDummyField: true,
      formatter: rankFormatter,
      style: { width: 300, headerAlign: "center", fontSize: 15 },
      // attrs: { width: 50, class: "EditRow" } ,
    },

    // {dataField: 'state', text: "STATE", sort:true},
  ];

  const changeStatus = async (props) => {
    let response = await deactivateApiKey({
      _id: props.data._id,
      status: !props.data.status,
    });
    if (response && response.data) {
      if (response.data.success) {
        setApiChanged(true);
        // window.alert(response.data.message)
        toast.success(response.data.message);
      } else {
        setApiChanged(false);
        toast.error(response.data.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  const { accessDataLists } = bindActionCreators(accessDataAction, dispatch);

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

  useEffect(async () => {
    callApi();
  }, [isApiChanged]);

  const callApi = async () => {
    let response = await accessDataLists();
    if (response.length) {
      let temp = [];
      response.map((data) => {
        data.button = "";
        temp.push(data);
      });

      setDataList(temp);
      setApiChanged(false);
    }
  };

  return (
    <div className={styles.app_container}>
      <AccessCreate accessCreated={callApi} />
      <BootstrapTable
        filter={filterFactory()}
        filterPosition="top"
        bootstrap4
        keyField="Name"
        columns={columns}
        data={dataList}
        pagination={pagination}
      />
    </div>
  );
}
