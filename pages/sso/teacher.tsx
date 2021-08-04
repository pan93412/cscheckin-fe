import React, { useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import LoginComponent, {
  Scope,
} from "../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../utilities/useError";
import ErrorPage from "../../components/Page/ErrorPage";
import useRedirect from "../../utilities/useRedirect";

export default function CSCSSOTeacherLogin() {
  const [loggedInFlag, setLoggingInFlag] = useState(false);
  const [error, setError] = useError();
  const { redirect } = useRedirect("/");

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <HeaderPageCard
      id="csc-sso-teacher-login"
      title="教師登入 CSC 簽到系統"
      desc="登入後即可管理簽到連結。"
      icon={faKey}
    >
      {loggedInFlag ? (
        <p>✅ 登入成功！</p>
      ) : (
        <>
          <div className="text-red-600 mb-4">
            請務必將「
            <span className="font-bold">
              選取要讓『CSCheckin-線上簽到』
              <br />
              存取的範圍」
            </span>
            下的核取框全部打勾，否則無法使用！
            <br />
            假如忘記打勾，請登出重新登入。
          </div>
          <LoginComponent
            scope={Scope.Teacher}
            onLogin={async () => {
              setLoggingInFlag(true);
              await redirect();
            }}
            onFailure={async (e) => setError(e)}
          />
        </>
      )}
    </HeaderPageCard>
  );
}