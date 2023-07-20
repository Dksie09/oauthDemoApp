import React, { useEffect, useState } from "react";
import { sdk } from "../appwrite/Appwrite";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [sessionData, setSessionData] = useState({});

  const handleLogout = async () => {
    await sdk.logout();
    navigate("/"); // Redirect to the home page ("/")
  };

  useEffect(() => {
    const fetchData = async () => {
      const githubResponse = await sdk.getGithubData();
      const accountResponse = await sdk.getAccount();
      const sessionResponse = await sdk.getSession();
      setGithubData(githubResponse);
      setAccountData(accountResponse);
      setSessionData(sessionResponse);
      setLoading(false);
    };
    fetchData().catch((e) => {
      navigate("/");
    });
  }, []);

  return loading ? (
    <div className="u-flex u-gap-24 u-main-center u-margin-32">
      <div class="loader u-margin"></div>
      <span>loading...</span>
    </div>
  ) : (
    <>
      <div className="u-margin-32 u-flex u-gap-24 u-main-center">
        {githubData.avatar_url && (
          <img
            className="avatar is-size-large	"
            src={githubData.avatar_url}
            alt="Avatar"
          />
        )}
        <h1 className="heading-level-1">
          {accountData.name && `Hi, ${accountData.name}👋`}
        </h1>
      </div>
      <h3 className="u-margin-32 heading-level-4">Get account:</h3>
      <div className="u-margin-32 card is-allow-focus u-flex u-gap-8">
        <pre>{JSON.stringify(accountData, null, 2)}</pre>
      </div>
      <h3 className="u-margin-32 heading-level-4">Get session:</h3>
      <div className="u-margin-32 card is-allow-focus u-flex u-gap-8">
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
      </div>
      <h3 className="u-margin-32 heading-level-4">
        Calling GitHub API through access token:
      </h3>
      <div className="u-margin-32 card is-allow-focus u-flex u-gap-8">
        <pre>{JSON.stringify(githubData, null, 2)}</pre>
      </div>
      <div className="u-margin-32 u-main-center u-flex">
        <button
          className="button u-margin-top-32 is-secondary"
          onClick={handleLogout}
        >
          <span className="icon-logout-right"></span>logout
        </button>
      </div>
    </>
  );
}

export default Success;
