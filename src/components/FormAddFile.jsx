import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const FormAddFile = () => {
  const [nama, setNama] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [berhasil, setBerhasil] = useState("");
  const [namaFile, setNamaFile] = useState("");

  const loadFile = (e) => {
    const image = e.target.files[0];
    const nama = e.target.files[0].name;
    setNamaFile(nama);
    setFile(image);
  };

  //   const file = e.target.files[0];

  const saveFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    try {
      await axios.post("http://13.229.115.11:5000/unduhan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBerhasil("File berhasil ditambahkan!");
      setNama("");
      setNamaFile("");
      setPreview("");
      setFile("");
      setMsg("");
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
                <h1 className="m-0">File</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/files"}>File</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Tambah File</li>
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
              <div className="col-12">
                {/* /.card */}
                {/* Horizontal Form */}
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Form Tambah File</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={saveFile}>
                    <div className="card-body">
                      {msg && (
                        <div className="alert alert-danger mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{msg}</li>
                          </ul>
                        </div>
                      )}
                      {berhasil && (
                        <div className="alert alert-success mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{berhasil}</li>
                          </ul>
                        </div>
                      )}
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Nama File
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            id="nama"
                            type="text"
                            className="form-control"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama File"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">File</label>
                        <div className="input-group col-sm-10">
                          <div className="custom-file">
                            <input
                              id="file"
                              type="file"
                              className="custom-file-input"
                              onChange={loadFile}
                            />
                            <label className="custom-file-label" htmlFor="file">
                              {namaFile || "Pilih sebuah File..."}
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Preview
                        </label>
                        <div className="input-group col-sm-10">
                          {preview ? (
                            <label className="custom-file-label" htmlFor="file">
                              {namaFile || "Pilih sebuah File..."}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div> */}

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-success float-right">
                          Simpan
                        </button>
                        <NavLink
                          to={"/files"}
                          className="btn btn-danger float-right mr-2">
                          Kembali
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>
                {/* /.card */}

                {/* /.card */}
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
export default FormAddFile;
