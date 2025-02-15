// LOGIN STATUS
export const isSuperAdminLogin = () => {
    return !!localStorage.getItem('superAdminAuthentication');

}
export const isTeacherMasterLogin = () => {
    return !!localStorage.getItem('teacherAuthentication');

}
export const isStudentLogin = () => {
    return !!localStorage.getItem('studentAuthentication');
}