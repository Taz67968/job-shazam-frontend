import {useCallback} from "react";

export function useToast() {
  const toast = useCallback(
    ({title, description, variant}: {title: string; description?: string; variant?: string}) => {
      console.log(`[Toast] ${title}${description ? ": " + description : ""}`);
    },
    [],
  );

  return {toast};
}
