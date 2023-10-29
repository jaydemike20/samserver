
import axios from "../plugins/axios";



const activateAccount = async (uid, token) => {

    try {
      const response = await axios.post('accounts/users/activation/', {
        uid: uid,
        token: token,
      });
      // Do something after account activation, such as redirecting to a different page
      alert("Your account has been activated! Please Login");

    } catch (error) {
      console.log(error)
    }
}

export default activateAccount;