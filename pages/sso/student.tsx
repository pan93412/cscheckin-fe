import React, { useEffect, useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import LoginComponent, {
  Scope,
} from "../../components/GoogleLoginComponent/LoginComponent";
import useError from "../../utilities/useError";
import ErrorPage from "../../components/Page/ErrorPage";
import useRedirect from "../../utilities/useRedirect";
import getUserInfo from "../../utilities/getUserInfo";
import RefreshButton from "../../components/Elements/Button/RefreshButton";

export default function CSCSSOStudentLogin() {
  const router = useRouter();
  const [loggedInFlag, setLoggingInFlag] = useState(false);
  const [error, setError] = useError();
  const { redirectTo } = useRedirect("/");

  useEffect(() => {
    if (loggedInFlag) {
      void getUserInfo().then((ui) => {
        if (ui) {
          if (redirectTo) void router.push(redirectTo);
        } else {
          const redirectParameter = redirectTo
            ? `?redirect=${encodeURIComponent(redirectTo)}`
            : "";
          void router.push(`/config/info${redirectParameter}`);
        }
      });
    }
    return undefined;
  }, [loggedInFlag, redirectTo, router]);

  if (error) {
    return (
      <ErrorPage errorMessage={error.message} errorDetails={error.details} />
    );
  }

  return (
    <HeaderPageCard
      id="csc-sso-student-login"
      title="學生登入 CSC 簽到系統"
      desc="登入後即可簽到，以及更新班級資料。"
      icon={faKey}
    >
      {loggedInFlag ? (
        <div className="csc-sso-student-login-success">
          <p className="mb-2">✅ 登入成功！即將重新導向⋯⋯</p>
          <hr />
          <p className="mt-2">沒有動靜？請戳戳下方的按鈕。</p>
          <RefreshButton className="mt-2" />
        </div>
      ) : (
        <>
          <LoginComponent
            scope={Scope.Student}
            onLogin={async () => {
              setLoggingInFlag(true);
            }}
            onFailure={async (e) => setError(e)}
          />
          <div className="mt-4">
            您是老師，想要管理連結的話：
            <br />
            請無視本畫面，點選右上角的「管理」。
          </div>
        </>
      )}
    </HeaderPageCard>
  );
}