import React, { useState } from 'react';
import Layout from '../Layout/Layout';

const Personal_info: React.FC = () => {
  const initialData = {
    user_id: "123456",
    user_name: "User Admin",
    password: "******",
  };

  const [data, setData] = useState(initialData);
  const [tempData, setTempData] = useState(initialData); // Temporary data for edits
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTempData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      setTempData(data); // Reset tempData to original data
    }
    setIsEditing((prev) => !prev);
  };

  // Save changes
  const saveChanges = () => {
    setData(tempData); // Save tempData to data
    setIsEditing(false);
  };

  return (
    <div>
      {/* Header with menu */}
      <header
        style={{
          width: '100%',
          backgroundImage: 'linear-gradient(to bottom, #74045f 40%, #c7911b 100%)',
          padding: '20px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <img
            src="src/assets/logo/PEA Logo on Violet.png"
            alt="PEA Logo"
            style={{ width: '180px', textAlign: 'left' }}
          />

          {/* Menu */}
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/Dashboard"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/Dashboard" ? "active-link" : ""}
                >
                  หน้าหลัก
                </a>
              </li>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/personal-info"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/personal-info" ? "active-link" : ""}
                >
                  ข้อมูลส่วนตัว
                </a>
              </li>
              <li style={{ margin: '0 15px', paddingRight: '50px' }}>
                <a
                  href="/user-management"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/user-management" ? "active-link" : ""}
                >
                  ข้อมูลผู้ใช้งาน
                </a>
              </li>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/login"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/login" ? "active-link" : ""}
                >
                  ออกจากระบบ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className='content'>
        <main className='content-main'>
          <div className="personal-info-content">
            <h3
              className="text-center mb-4"
              style={{ color: '#74045f', textDecoration: 'underline' }}
            >
              <b>ข้อมูลส่วนตัว</b>
            </h3>
          </div>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="card-info">
              <div className="card-body-info">
                <div className="row">
                  {/* Name */}
                  <div className="col">
                    <div
                      data-mdb-input-init
                      className="form-outline"
                      style={{ margin: '10px' }}
                    >
                      <label className="form-label" htmlFor="user_name">
                        ชื่อ-สกุล
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        className="form-control"
                        disabled={!isEditing}
                        value={isEditing ? tempData.user_name : data.user_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* ID */}
                  <div className="col">
                    <div
                      data-mdb-input-init
                      className="form-outline"
                      style={{ margin: '10px' }}
                    >
                      <label className="form-label" htmlFor="user_id">
                        เลขประจำตัวพนักงาน
                      </label>
                      <input
                        type="text"
                        id="user_id"
                        className="form-control"
                        disabled={!isEditing}
                        value={isEditing ? tempData.user_id : data.user_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="col">
                    <div
                      data-mdb-input-init
                      className="form-outline"
                      style={{ margin: '10px' }}
                    >
                      <label className="form-label" htmlFor="password">
                        รหัสผ่าน
                      </label>
                      <input
                        type="text"
                        id="password"
                        className="form-control"
                        disabled={!isEditing}
                        value={isEditing ? tempData.password : data.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <hr />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-danger me-2"
                        onClick={toggleEdit} // Cancel edit
                      >
                        ยกเลิก
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={saveChanges} // Save changes
                      >
                        บันทึก
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={toggleEdit} // Enter edit mode
                    >
                      แก้ไขข้อมูล
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Personal_info;
