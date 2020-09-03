import React, { useState, useEffect, Suspense } from "react";
import Dashboard from "../../Components/Dashboard";
import Api from "../../Services/Api";

import EditUserInformations from "../../Components/Forms/EditUserInformations";
import UpdatePassword from "../../Components/Forms/UpdatePassword";

const PROFILE_PIC =
  "https://scontent.faju4-1.fna.fbcdn.net/v/t1.0-9/34340938_1433451820094364_1690447171486220288_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=Zol4LbQhJt8AX8b2auj&_nc_ht=scontent.faju4-1.fna&oh=c70bfc157b8af6786f5bb6791683c630&oe=5F5B7C4C";

const Settings = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const { data } = await Api.get("me");
    setUser({ ...data });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <Dashboard>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Configurações</div>
          </div>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: "2" }}>
                <div className="card" style={{ flex: "2" }}>
                  <div className="card-body-without-border-top">
                    <EditUserInformations
                      user={user}
                      setUser={setUser}
                      getUser={getUser}
                    />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body-without-border-top">
                    <UpdatePassword />
                  </div>
                </div>
              </div>
              <div style={{ flex: "1" }}>
                <div className="card">
                  <div
                    className="card-body-without-border-top"
                    style={{ textAlign: "center" }}
                  >
                    {/* <div id="profile-image">
                      <img
                        src={PROFILE_PIC}
                        alt="profile"
                        width="100px"
                        height="100px"
                        style={{ borderRadius: "50%" }}
                      />
                    </div> */}
                    <div
                      className="user-informations"
                      style={{ fontWeight: "bolder", fontSize: "16px" }}
                    >
                      <div style={{ fontSize: "20px" }}>{user.username}</div>
                      <div> CPF: {user.cpf}</div>
                      <div>E-Mail: {user.email}</div>
                      <div>Celular: {user.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </Suspense>
  );
};

export default Settings;
