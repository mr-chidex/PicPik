import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuthentication = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);
};

export default useAuthentication;
