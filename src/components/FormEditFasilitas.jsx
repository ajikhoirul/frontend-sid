import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const FormEditFasilitas = () => {
  const [nama, setNama] = useState("");
  const [waktu, setWaktu] = useState("");
  const [nominal, setNominal] = useState("");
  const [alamat, setAlamat] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getFasilitasById = async () => {
      try {
        const response = await axios.get(
          `http://13.229.115.11:5000/fasilitas/${id}`
        );
        setNama(response.data.nama);
        setWaktu(response.data.waktu);
        setNominal(response.data.nominal);
        setAlamat(response.data.alamat);
        setFile(response.data.gambar);
        setPreview(response.data.url);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getFasilitasById();
  }, [id]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateFasilitas = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("waktu", waktu);
    formData.append("nominal", nominal);
    formData.append("alamat", alamat);
    try {
      await axios.patch(`http://13.229.115.11:5000/fasilitas/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data berhasil diubah!");
      navigate("/fasilitas");
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
                <h1 className="m-0">Fasilitas</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/fasilitas"}>Fasilitas</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Edit Fasilitas</li>
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
                    <h3 className="card-title">Form Edit Fasilitas</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={updateFasilitas}>
                    <div className="card-body">
                      {msg && (
                        <div className="alert alert-danger mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{msg}</li>
                          </ul>
                        </div>
                      )}
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Nama Fasilitas
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Fasilitas"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Waktu Peresmian
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            value={waktu}
                            onChange={(e) => setWaktu(e.target.value)}
                            placeholder="Masukkan Waktu Peresmian"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Total Harga Fasilitas
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            value={nominal}
                            onChange={(e) => setNominal(e.target.value)}
                            placeholder="Masukkan Harga Fasilitas"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Alamat Fasilitas
                        </label>

                        <div className="col-sm-10">
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            placeholder="Masukkan Alamat Fasilitas"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Gambar
                        </label>
                        <div className="input-group col-sm-10">
                          <div className="custom-file">
                            <input
                              id="gambar"
                              type="file"
                              className="custom-file-input"
                              onChange={loadImage}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="gambar">
                              Pilih sebuah gambar...
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Preview
                        </label>
                        <div className="input-group col-sm-10">
                          {preview ? (
                            <figure className="image">
                              <img
                                src={preview}
                                alt="Preview Image"
                                width="200"
                                height="200"
                              />
                            </figure>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-success float-right">
                          Simpan
                        </button>
                        <NavLink
                          to={"/fasilitas"}
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

export default FormEditFasilitas;
