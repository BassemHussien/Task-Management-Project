/* Auth Action Types */
export const AUTHORIZED = "AUTHORIZED";
export const NOT_AUTHORIZED = "NOT_AUTHORIZED";
export const LOGOUT = "LOGOUT";

/* Auth Action Creators */
export const authCurrent = ({currentUser}) => {
    return(
        {
            type: AUTHORIZED,
            payload: currentUser
        }
    )
}
// export const authCurrent = (currentUser) => (dispatch) => {
//     if (currentUser) {
//       // Fetch additional details (like role) from Firestore or custom logic
//       let name = currentUser.displayName || '';
//       let email = currentUser.email || '';
//       let role = 'role'; // Example role; fetch actual role from Firestore or backend
  
//       dispatch({
//         type: AUTHORIZED,
//         payload: {
//           name,
//           email,
//           role,
//         },
//       });
//     }
// };
export const logout = () => {
    return(
        {
            type: LOGOUT
        }
    )
}