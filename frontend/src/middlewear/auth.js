// LOGIN STATUS
export const isSuperAdminLogin = () => {
    if (localStorage.getItem('superAdminAuthentication')) return true;
    return false;
}
export const isTeacherMasterLogin = () => {
    if (localStorage.getItem('teacherAuthentication')) return true;
    return false;
}
export const isStudentLogin = () => {
    if (localStorage.getItem('studentAuthentication')) return true;
    return false;
}