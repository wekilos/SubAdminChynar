export const token = () => {
    if (JSON.parse(localStorage.getItem("SubProfile"))) {
      var data = JSON.parse(localStorage.getItem("SubProfile"));
      return data.token;
    }
  };
  