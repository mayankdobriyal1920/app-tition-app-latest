import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToOpenCloseEditTeacherPopup, actionToUpdateTeacherProfile
} from "../../../actions/CommonAction";
export default function EditTeacherPopupComponent(){
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [address,setAddress] = useState('');
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const {isOpen,dropdownData} = useSelector((state) => state.openCloseTeacherEditPopup);

    const closeEditTeacherPopup = ()=>{
        dispatch(actionToOpenCloseEditTeacherPopup(false,{}));
    }
    const validateAndSubmitTeacherUserForm = async (e)=>{
        e.preventDefault();
        if(!verifyDataLoader) {
            if (validateForm()) {
                setVerifyDataLoader(true);
                updateTeacherDataForm();
            }
        }
        return false;
    }
    const validateForm =()=>{
        console.log( name, email, address, password);

        if(!name?.trim()?.length){
            return false;
        }else if(!email?.trim()?.length){
            return false;
        }else if(!password?.trim()?.length){
            return false;
        }else if(!address?.trim()?.length){
            return false;
        }
        return true;
    }

    const resetForm = ()=>{
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
    }

    const updateTeacherDataForm =()=>{
        let payload = {
            id: dropdownData.id,
            name:name,
            email:email,
            address:address,
            password:password,
        }
        dispatch(actionToUpdateTeacherProfile(payload));
        setTimeout(function (){
            setVerifyDataLoader(false);
        },4000)
        resetForm();
    }
    useEffect(()=> {
        if(dropdownData?.id){
            setName(dropdownData?.name);
            setEmail(dropdownData?.email);
            setAddress(dropdownData?.address);
            setPassword(dropdownData?.password);
        }
        setVerifyDataLoader(false);
    },[dropdownData])
    return (
    <div className="edit_teacher_main_popup_outer_container" style={{display:isOpen ? 'flex' : 'none'}}
         id={"main_edit_teacher_component"} >
        <div className="edit_teacher_main_main_popup_inner_container">
            <form onSubmit={(e)=>validateAndSubmitTeacherUserForm(e)} className=" gx-3 comments-form contact-form">
                <div className="g-4">
                    <div className="">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Update Teacher details</h6>
                            <div onClick={closeEditTeacherPopup} className={"close_popup_button"}><i className={"fa fa-times"}></i></div>
                            <div className="row g-4">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="text"
                                               value={name}
                                               onChange={(e)=>setName(e.target.value)}
                                               className="form-control" id="floatingName" placeholder="John doe" required/>
                                        <label htmlFor="floatingName">Full Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="email"
                                               value={email}
                                               onChange={(e)=>setEmail(e.target.value)}
                                               className="form-control" id="floatingEmail" placeholder="name@example.com" required/>
                                        <label htmlFor="floatingEmail">Email address</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       value={password}
                                       onChange={(e)=>setPassword(e.target.value)}
                                       className="form-control" id="floatingPassword" placeholder="Password" required/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control"
                                          value={address}
                                          onChange={(e)=>setAddress(e.target.value)}
                                          placeholder="Enter full address"
                                          id="floatingTextarea"
                                          style={{height: "150px"}} required>
                                </textarea>
                                <label htmlFor="floatingTextarea">Full Address</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-30">
                                {(verifyDataLoader) ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )

}