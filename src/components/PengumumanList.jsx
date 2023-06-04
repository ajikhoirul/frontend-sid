import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ModalHapus from "./ModalHapus";
import moment from "moment";
import { Alert } from "react-bootstrap";
import { Switch } from "antd";
import { useSelector } from "react-redux";

const PengumumanList = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getPengumuman();
  }, []);

  const getPengumuman = async () => {
    const response = await axios.get("http://localhost:5000/pengumuman");
    setPengumuman(response.data);
  };

  const deletePengumuman = async (pengumumanId) => {
    try {
      await axios.delete(`http://localhost:5000/pengumuman/${pengumumanId}`);
      setShowAlert(true);
      getPengumuman();
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  // console.warn(filter);
  let dataSearch = pengumuman.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLocaleLowerCase())
    );
  });

  const aktifPengumuman = async (pengumumanId) => {
    try {
      await axios.patch(
        `http://localhost:5000/pengumuman-aktif/${pengumumanId}`
      );
      getPengumuman();
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
                <h1 className="m-0">Daftar Pengumuman</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Pengumuman</li>
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
                  to={"/pengumuman/add"}
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
                      placeholder="Cari Pengumuman..."
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
                  {dataSearch.map((pengumuman) => (
                    <div
                      className="col-md-4 mb-3"
                      key={pengumuman.id_pengumuman}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            <strong>{pengumuman.judul}</strong>
                          </h5>
                          <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                              __html: pengumuman.isi.substring(0, 100),
                            }}></p>
                          <p className="card-text mb-0">
                            <i className="fa-solid fa-user"></i>{" "}
                            {pengumuman.user.name}
                          </p>
                          <p className="card-text mb-2">
                            <i className="fa-solid fa-calendar"></i>{" "}
                            {moment(pengumuman.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </p>
                        </div>
                        <div className="card-footer pl-3">
                          <Link
                            to={`edit/${pengumuman.id_pengumuman}`}
                            className="btn btn-sm btn-primary mr-2">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <ModalHapus
                            nama={pengumuman.judul}
                            onConfirm={() =>
                              deletePengumuman(pengumuman.id_pengumuman)
                            }
                          />
                          {user && user.role === "admin" && (
                            <Switch
                              checked={pengumuman.aktif === 1 ? true : false}
                              onClick={() =>
                                aktifPengumuman(pengumuman.id_pengumuman)
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

export default PengumumanList;
