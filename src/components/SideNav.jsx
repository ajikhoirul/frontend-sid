import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import Logout from "./Logout";
import Profil from "./img/profil.png";
import Logo from "./img/logo.png";
import axios from "axios";

const SideNav = () => {
  const [countsuratTdk, setCountSuratTdk] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    getCountSuratTdk();
  }, []);

  const getCountSuratTdk = async () => {
    const response = await axios.get(
      "http://localhost:5000/count-surat-tidak-mampu"
    );
    setCountSuratTdk(response.data);
  };

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="#" className="brand-link">
          <img
            src={Logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Admin Desa</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={Profil}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {user && user.name}
              </a>
            </div>
          </div>
          {/* SidebarSearch Form */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-header">ADMIN</li>
              <li className="nav-item">
                <NavLink to={"/dashboard"} className="nav-link">
                  <i class="nav-icon fa-solid fa-tachograph-digital" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/users"} className="nav-link">
                    <i className="nav-icon fas fa-user" />
                    <p>Admin</p>
                  </NavLink>
                </li>
              )}
              <li className="nav-header">GENERAL</li>
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/warga"} className="nav-link">
                    <i className="nav-icon fa fa-users" />
                    <p>Warga</p>
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to={"/artikel"} className="nav-link">
                  <i class="nav-icon fa-solid fa-newspaper" />
                  <p>Artikel</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/pengumuman"} className="nav-link">
                  <i class="nav-icon fa-solid fa-bullhorn" />
                  <p>Pengumuman</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/agenda"} className="nav-link">
                  <i class="nav-icon fa-solid fa-clipboard-list" />
                  <p>Agenda</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/fasilitas"} className="nav-link">
                  <i class="nav-icon fa-solid fa-building" />
                  <p>Fasilitas</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/pertanyaan"} className="nav-link">
                  <i class="nav-icon fa-solid fa-circle-question" />
                  <p>Pertanyaan</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/files"} className="nav-link">
                  <i class="nav-icon fa-solid fas fa-file" />
                  <p>Files</p>
                </NavLink>
              </li>
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/galeri"} className="nav-link">
                    <i class="nav-icon fa-solid fas fa-images" />
                    <p>Galeri</p>
                  </NavLink>
                </li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-header">SURAT</li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/permohonan"} className="nav-link">
                    <i className="nav-icon fa-solid fa-phone-volume"></i>
                    <p>Permohonan</p>
                  </NavLink>
                </li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/surat-tidak-mampu"} className="nav-link">
                    <i className="nav-icon fa-solid fa-envelope" />
                    <p>
                      Surat Tidak Mampu
                      <span class="badge badge-danger right">
                        {countsuratTdk}
                      </span>
                    </p>
                  </NavLink>
                </li>
              )}

              {user && user.role === "admin" && (
                <li className="nav-header">PENGATURAN WEB USER</li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/tentang-desa"} className="nav-link">
                    <i className="nav-icon fa-solid fa-eject"></i>
                    <p>Tentang Desa</p>
                  </NavLink>
                </li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/video"} className="nav-link">
                    <i className="nav-icon fa-solid fa-video"></i>
                    <p>Video</p>
                  </NavLink>
                </li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/profil-desa"} className="nav-link">
                    <i className="nav-icon fa-solid fa-house"></i>
                    <p>Profil Desa</p>
                  </NavLink>
                </li>
              )}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/struktur-desa"} className="nav-link">
                    <i className="nav-icon fa-solid fa-folder-tree"></i>
                    <p>Struktur Desa</p>
                  </NavLink>
                </li>
              )}

              <li className="nav-header">SETTING</li>
              <li className="nav-item">
                <Logout onConfirm={logout} />
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
