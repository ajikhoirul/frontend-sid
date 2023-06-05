import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ModalHapus from "./ModalHapus";
import moment from "moment";
import { Alert } from "react-bootstrap";
import { Switch } from "antd";
import { useSelector } from "react-redux";

const ArtikelList = () => {
  const [artikel, setArtikel] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getArtikel();
  }, []);

  const getArtikel = async () => {
    const response = await axios.get("http://13.229.115.11:5000/artikel");
    setArtikel(response.data);
  };

  const deleteArtikel = async (artikelId) => {
    try {
      await axios.delete(`http://13.229.115.11:5000/artikel/${artikelId}`);
      setShowAlert(true);
      getArtikel();
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  // console.warn(filter);
  let dataSearch = artikel.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLocaleLowerCase())
    );
  });

  const aktifArtikel = async (artikelId) => {
    try {
      await axios.patch(`http://13.229.115.11:5000/artikel-aktif/${artikelId}`);
      getArtikel();
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
                <h1 className="m-0">Daftar Artikel</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Artikel</li>
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
                <NavLink to={"/artikel/add"} className="btn btn-success tambah">
                  Tambah
                </NavLink>
                <form className="mt-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={filter}
                      onChange={searchText.bind(this)}
                      placeholder="Cari Judul Artikel..."
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

                {dataSearch.map((artikel) => (
                  <div className="card mb-3 mt-2" key={artikel.id_artikel}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={artikel.url}
                          className="card-img"
                          alt="Image"
                          width="300"
                          height="300"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h1
                            className="card-title"
                            style={{ fontSize: "30px" }}>
                            <strong>{artikel.judul}</strong>
                          </h1>
                          <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                              __html: artikel.isi.substring(0, 500),
                            }}
                          />
                          <p className="card-text mb-0">
                            <i className="fa-solid fa-user" />{" "}
                            {artikel.user.name}
                          </p>
                          <p className="card-text mb-2">
                            <i className="fa-solid fa-calendar" /> {""}
                            {moment(artikel.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </p>
                        </div>
                        <div className="card-footer">
                          <Link
                            to={`edit/${artikel.id_artikel}`}
                            className="btn btn-sm btn-primary mr-2">
                            <i className="fa-solid fa-pen-to-square" />
                          </Link>
                          <ModalHapus
                            nama={artikel.judul}
                            onConfirm={() => deleteArtikel(artikel.id_artikel)}
                          />

                          {user && user.role === "admin" && (
                            <Switch
                              checked={artikel.aktif === 1 ? true : false}
                              onClick={() => aktifArtikel(artikel.id_artikel)}
                              className="float-right"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default ArtikelList;
