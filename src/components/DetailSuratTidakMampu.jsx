import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Switch } from "antd";

const DetailSuratTidakMampu = () => {
  const [nikb, setNikb] = useState("");
  const [niki, setNiki] = useState("");

  const [pemohon, setPemohon] = useState("");
  const [bapak, setBapak] = useState("");
  const [ibu, setIbu] = useState("");

  const [lahirBapak, setLahirBapak] = useState("");
  const [pekerjaanBapak, setPekerjaanBapak] = useState("");
  const [agamaBapak, setAgamaBapak] = useState("");
  const [alamatBapak, setAlamatBapak] = useState("");

  const [lahirIbu, setLahirIbu] = useState("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("");
  const [agamaIbu, setAgamaIbu] = useState("");
  const [alamatIbu, setAlamatIbu] = useState("");

  const [idSurat, setIdSurat] = useState("");

  const [keperluan, setKeperluan] = useState("");
  const [aktif, setAktif] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getSuratTdkById();
  }, [id]);

  const getSuratTdkById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/surat-tidak-mampu/${id}`
      );
      setIdSurat(response.data.id_surat_tidak_mampu);
      setPemohon(response.data.pemohon);
      setBapak(response.data.n_bapak);
      setNikb(response.data.nik_bapak);
      setLahirBapak(response.data.t_bapak);
      setPekerjaanBapak(response.data.pekerjaan_bapak);
      setAgamaBapak(response.data.agama_bapak);
      setAlamatBapak(response.data.alamat_bapak);
      setIbu(response.data.n_ibu);
      setNiki(response.data.nik_ibu);
      setLahirIbu(response.data.t_ibu);
      setPekerjaanIbu(response.data.pekerjaan_ibu);
      setAgamaIbu(response.data.agama_ibu);
      setAlamatIbu(response.data.alamat_ibu);
      setKeperluan(response.data.keperluan);
      setAktif(response.data.aktif);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const aktfiSuratTdk = async (suratdkId) => {
    try {
      await axios.patch(
        `http://localhost:5000/surat-tidak-mampu-aktif/${suratdkId}`
      );
      alert("Data telah berhasil diproses");
      getSuratTdkById();
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
                <h1 className="m-0">Surat Tidak Mampu</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={"/surat-tidak-mampu"}>
                      Surat Tidak Mampu
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item active">
                    Detail Surat Tidak Mampu
                  </li>
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
                    <h3 className="card-title">Detail Surat Tidak Mampu</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={""}>
                    <div className="card-body">
                      <div className="row bg-white">
                        <div className="col-lg-3">
                          <h5>Pemohon</h5>
                          <h5>Keperluan</h5>
                          <br></br>
                          <h5>Nama Bapak</h5>
                          <h5>NIK Bapak</h5>
                          <h5>Tempat, Tanggal Lahir Bapak</h5>
                          <h5>Pekerjaan Bapak</h5>
                          <h5>Agama Bapak</h5>
                          <h5>Alamat Bapak</h5>
                          <br></br>
                          <h5>Nama Ibu</h5>
                          <h5>NIK Ibu</h5>
                          <h5>Tempat, Tanggal Lahir Ibu</h5>
                          <h5>Pekerjaan Ibu</h5>
                          <h5>Agama Ibu</h5>
                          <h5>Alamat Ibu</h5>
                          <br></br>
                          <h5>Status</h5>
                        </div>

                        <div className="col-lg-9">
                          <h5>: {pemohon}</h5>
                          <h5>: {keperluan}</h5>
                          <br></br>
                          <h5>: {bapak}</h5>
                          <h5>: {nikb}</h5>
                          <h5>: {lahirBapak}</h5>
                          <h5>: {pekerjaanBapak}</h5>
                          <h5>: {agamaBapak}</h5>
                          <h5>: {alamatBapak}</h5>
                          <br></br>
                          <h5>: {ibu}</h5>
                          <h5>: {niki}</h5>
                          <h5>: {lahirIbu}</h5>
                          <h5>: {pekerjaanIbu}</h5>
                          <h5>: {agamaIbu}</h5>
                          <h5>: {alamatIbu}</h5>
                          <br></br>
                          <h5>
                            :
                            <Switch
                              checked={aktif === 1 ? true : false}
                              onClick={() => aktfiSuratTdk(idSurat)}
                              className="ml-2"
                            />
                          </h5>
                        </div>
                      </div>
                      <NavLink
                        to={"/surat-tidak-mampu"}
                        className="btn btn-danger float-right mr-2">
                        Kembali
                      </NavLink>
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
export default DetailSuratTidakMampu;
