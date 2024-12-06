import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInformed } from "../common/contexts/informed";

export const Watcher = () => {
  const navigate = useNavigate();

  const { informed } = useInformed();

  useEffect(() => {
    if (informed === true) {
      navigate("/chat");
    } else if (informed === false) {
      navigate("/informing");
    }
  }, [informed]);

  return null;
};
