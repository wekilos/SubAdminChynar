export const logout = () => {
    localStorage.removeItem("SubProfile");
  };
  
  export const isLogin = () => {
    if (localStorage.getItem("SubProfile")) {
      var data = JSON.parse(localStorage.getItem("SubProfile"));
      if (data.token) {
        return true;
      } else {
        localStorage.removeItem("SubProfile");
      }
    }
    return false;
  };
  
  export const isLoginAdmin = () => {
    if (localStorage.getItem("SubProfile")) {
      var data = JSON.parse(localStorage.getItem("SubProfile"));
      if (data.token) {
        return true;
      } else {
        localStorage.removeItem("SubProfile");
      }
    } else {
      return false;
    }
  };
  