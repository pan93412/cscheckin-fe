import React from "react";
import { useRouter } from "next/router";
import {
  faBug,
  faHandHoldingUsd,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { randTextColor } from "../../utilities/randcolor";
import { useAuth } from "../AuthStore/utilities";

export default function SupportBtn() {
  const router = useRouter();
  const [auth] = useAuth(false);

  const sendFeedback = async () => {
    const userInfo = await auth?.userInfo();

    window.open(
      `https://cscin.tk/?action=feedback&name=${encodeURI(
        userInfo?.name ?? ""
      )}&email=${encodeURI(userInfo?.email ?? "")}&path=${encodeURI(
        router.asPath
      )}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center mr-4 space-x-4">
      <div className="inline p-1">
        Powered by{" "}
        <span className="text-blue-600">
          ▲
          <a href="https://vercel.com/?utm_source=smhs-os-project&utm_campaign=oss">
            Vercel
          </a>
        </span>
        .
      </div>

      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          提供開發與維護資金
        </span>
        <a href="https://cscin.tk/sponsor" target="_blank" rel="noreferrer">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          使用說明
        </span>
        <a href="https://cscin.tk/join" target="_blank" rel="noreferrer">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </a>
      </button>

      <button type="button" className="rounded-full has-tooltip">
        <span className="p-1 -mt-10 -ml-10 text-white bg-black rounded tooltip">
          回報問題
        </span>
        <button
          type="button"
          onClick={sendFeedback}
          onKeyDown={(key) => key.key === "Enter" && sendFeedback()}
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faBug}
              size="2x"
              className={`transition-all duration-300 ${randTextColor()}`}
            />
          </div>
        </button>
      </button>
    </div>
  );
}
