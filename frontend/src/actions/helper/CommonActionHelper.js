export function setAuthSignInByRole(payload){
    if(payload?.role === 1)
        localStorage.setItem('studentAuthentication',JSON.stringify(payload));
    else if(payload?.role === 2)
        localStorage.setItem('teacherAuthentication',JSON.stringify(payload));
    else if(payload?.role === 3)
        localStorage.setItem('superAdminAuthentication',JSON.stringify(payload));
}