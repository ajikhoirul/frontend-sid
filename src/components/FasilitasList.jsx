import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ModalHapus from "./ModalHapus";
import { Alert } from "react-bootstrap";
import "./style.css";
import { Switch } from "antd";
import { useSelector } from "react-redux";

const FasilitasList = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getFasilitas();
  }, []);

  const getFasilitas = async () => {
    const response = await axios.get("http://13.229.115.11:5000/fasilitas");
    setFasilitas(response.data);
  };

  const deleteFasilitas = async (fasilitasId) => {
    try {
      await axios.delete(`http://13.229.115.11:5000/fasilitas/${fasilitasId}`);
      setShowAlert(true);
      getFasilitas();
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  // console.warn(filter);
  let dataSearch = fasilitas.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLocaleLowerCase())
    );
  });

  const aktifFasilitas = async (fasilitasId) => {
    try {
      await axios.patch(
        `http://13.229.115.11:5000/fasilitas-aktif/${fasilitasId}`
      );
      getFasilitas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Daftar Fasilitas</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Fasilitas</li>
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
                  to={"/fasilitas/add"}
                  className="btn btn-success tambah">
                  Tambah
                </NavLink>
                <form className="mt-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={filter}
                      onChange={searchText.bind(this)}
                      placeholder="Cari Fasilitas..."
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

                <div className="row mt-2">
                  {dataSearch.map((fasilitas) => (
                    <div className="col-md-4 mb-3" key={fasilitas.id_fasilitas}>
                      <div className="card">
                        <img
                          src={fasilitas.url}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title fasilitas-judul">
                            <strong>{fasilitas.nama}</strong>
                          </h5>
                          <p className="card-text mb-2">
                            <i className="fa-solid fa-calendar-days me-2"></i>{" "}
                            {fasilitas.waktu}
                          </p>
                          <p className="card-text mb-2">
                            <i className="fa-solid fa-coins me-2"></i>{" "}
                            {fasilitas.nominal}
                          </p>
                          <p className="card-text mb-0">
                            <i class="fa-solid fa-location-dot me-2"></i>{" "}
                            {fasilitas.alamat}
                          </p>
                        </div>
                        <div className="card-footer">
                          <Link
                            to={`edit/${fasilitas.id_fasilitas}`}
                            className="btn btn-sm btn-primary mr-2">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <ModalHapus
                            nama={fasilitas.nama}
                            onConfirm={() =>
                              deleteFasilitas(fasilitas.id_fasilitas)
                            }
                          />
                          {user && user.role === "admin" && (
                            <Switch
                              checked={fasilitas.aktif === 1 ? true : false}
                              onClick={() =>
                                aktifFasilitas(fasilitas.id_fasilitas)
                              }
                              className="float-right"
                            />
                          )}
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

export default FasilitasList;
