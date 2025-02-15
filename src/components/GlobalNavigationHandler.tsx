import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let globalNavigate: ReturnType<typeof useTypedNavigate>["navigateTo"];
// eslint-disable-next-line react-refresh/only-export-components
export let globalGoBack: ReturnType<typeof useTypedNavigate>["goBack"];

export const GlobalNavigationHandler = () => {
  const { navigateTo, goBack: typedGoBack } = useTypedNavigate();

  useEffect(() => {
    globalNavigate = navigateTo;
    globalGoBack = typedGoBack;
  }, [navigateTo, typedGoBack]);

  return null;
};
