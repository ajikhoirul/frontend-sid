import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ModalHapus from "./ModalHapus";
import moment from "moment";
import { Alert } from "react-bootstrap";
import "./style.css";

const PertanyaanList = () => {
  const [pertanyaan, setPertanyaan] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getPertanyaan();
  }, []);

  const getPertanyaan = async () => {
    const response = await axios.get("http://13.229.115.11:5000/pertanyaan");
    setPertanyaan(response.data);
  };

  const deletePertanyaan = async (pertanyaanId) => {
    try {
      await axios.delete(
        `http://13.229.115.11:5000/pertanyaan/${pertanyaanId}`
      );
      setShowAlert(true);
      getPertanyaan();
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  // console.warn(filter);
  let dataSearch = pertanyaan.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLocaleLowerCase())
    );
  });

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Daftar Pertanyaan</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Pertanyaan</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-lg-12">
                <NavLink
                  to={"/pertanyaan/add"}
                  className="btn btn-success tambah">
                  Tambah
                </NavLink>
                <form className="mt-2 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={filter}
                      onChange={searchText.bind(this)}
                      placeholder="Cari Pertanyaan..."
                    />
                  </div>
                </form>

                {showAlert && (
                  <Alert
                    variant="success"
                    className="d-flex justify-content-between mt-2">
                    <span>Data berhasil dihapus!</span>
                  </Alert>
                )}
                <div className="accordion" id="accordionExample">
                  {dataSearch.map((pertanyaan, index) => (
                    <div
                      className="card-info mb-1 card-shadow rainbow"
                      key={index}>
                      <div className="card-header" id={`heading${index}`}>
                        <h2 className="mb-0">
                          <button
                            className="btn btn-black outline-none"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${index}`}
                            aria-expanded="true"
                            aria-controls={`collapse${index}`}>
                            {pertanyaan.judul}
                          </button>
                        </h2>
                      </div>
                      <div
                        id={`collapse${index}`}
                        className="collapse"
                        aria-labelledby={`heading${index}`}
                        data-parent="#accordionExample">
                        <div className="card-body">
                          <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                              __html: pertanyaan.jawab,
                            }}></p>
                          <Link
                            to={`edit/${pertanyaan.id_pertanyaan}`}
                            className="btn btn-sm btn-primary mr-2">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <ModalHapus
                            nama={pertanyaan.judul}
                            onConfirm={() =>
                              deletePertanyaan(pertanyaan.id_pertanyaan)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* /.row */}
            {/* Main row */}
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default PertanyaanList;
