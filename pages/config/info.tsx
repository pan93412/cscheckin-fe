import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import HeaderPageCard from "../../components/Page/HeaderPageCard";
import BaseInput from "../../components/BaseElements/BaseInput";
import BaseButton from "../../components/BaseElements/BaseButton";

export default function CSCConfigInfoSetup() {
  const router = useRouter();

  return (
    <HeaderPageCard
      id="config-info-setup"
      title="設定班級座號"
      desc="重新設定您的班級和座號。"
      icon={faCog}
    >
      <form>
        <BaseInput id="class" label="班級" required />
        <BaseInput id="number" label="座號" required />
        <BaseButton solid submit className="mt-4">
          儲存
        </BaseButton>
        <BaseButton className="mt-4 ml-2" onClick={() => router.back()}>
          取消
        </BaseButton>
      </form>
    </HeaderPageCard>
  );
}
