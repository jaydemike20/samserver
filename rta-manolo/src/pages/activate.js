
import axios from "axios";



const activateAccount = async (uid, token) => {

    try {
      const response = await axios.post('https://jaydemike21.pythonanywhere.com/api/v1/accounts/users/activation/', {
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