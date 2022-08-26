import React from "react";

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 3000);
  }, []);

  return (
    <div className="register-form">
      <div className="logout-text">
        <h4>Gracias por visitarnos!</h4>
      </div>
    </div>
  );
};

export default Logout;
