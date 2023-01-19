import { inboxActions } from "./inboxSlice";

export const addMail = (mail, clearInput) => {
    const senderEmail = mail.from.replace("@", "").replace(".", "");
    const receiverEmail = mail.to.replace("@", "").replace(".", "");
    return async (dispatch) => {
      try {
        const response = await fetch(
          `https://mail-box-fca66-default-rtdb.firebaseio.com/${senderEmail}.json`,
          {
            method: "POST",
            body: JSON.stringify({ ...mail, read: false }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (senderEmail !== receiverEmail) {
          await fetch(
            `https://mail-box-fca66-default-rtdb.firebaseio.com/${receiverEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify({ ...mail, read: false }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
  
        const data = await response.json();
  
        if (response.ok) {
          dispatch(
            inboxActions.add({
              id: data.name,
              ...mail,
              read: false,
            })
          );
          clearInput();
        } else {
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
};


export const emailFetch = (emailUrl, loggedUserEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-fca66-default-rtdb.firebaseio.com/${emailUrl}.json`
      );

      const data = await response.json();

      if (response.ok) {
        let mailData = [];
        let unreadMessageCount = 0;

        for (let key in data) {
          mailData = [{ id: key, ...data[key] }, ...mailData];
          if (data[key].to === loggedUserEmail && data[key].read === false) {
            unreadMessageCount++;
          }
        }

        dispatch(
          inboxActions.replace({
            mailData: mailData,
            unreadMessageCount: unreadMessageCount,
          })
        );
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateMail = (emailUrl, loggedUserEmail, currentMailData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-fca66-default-rtdb.firebaseio.com/${emailUrl}.json`
      );

      const data = await response.json();

      if (response.ok) {
        if (data.length > currentMailData.length) {
          let mailData = [];
          let unreadMessageCount = 0;

          for (let key in data) {
            mailData = [{ id: key, ...data[key] }, ...mailData];
            if (data[key].to === loggedUserEmail && data[key].read === false) {
              unreadMessageCount++;
            }
          }

          dispatch(
            inboxActions.replace({
              mailData: mailData,
              unreadMessageCount: unreadMessageCount,
            })
          );
        }
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

// deleting mail
export const deleteMail = (mail) => {
  const userEmail = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = userEmail.replace("@", "").replace(".", "");

  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-fca66-default-rtdb.firebaseio.com/${emailUrl}/${mail.id}.json`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(inboxActions.remove(mail));
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

