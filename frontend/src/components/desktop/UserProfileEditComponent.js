import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import studentReadingImg from "../../theme/images/chose/reading_student1.png";
import SpinnerLoader from "../Loader/SpinnerLoader";
import {actionToUpdateUserProfile} from "../../actions/CommonAction";

export default function UserProfileEditComponent(){

    const schoolBoardData = useSelector((state) => state.allSchoolBoardDataList.boardData);

    const {classData} = useSelector((state) => state.studentAllClassesList);
    const [name,setName] = useState(classData.name);
    const [email,setEmail] = useState(classData.email);
    const [fatherName,setFatherName] = useState(classData.father_name);
    const [motherName,setMotherName] = useState(classData.mother_name);
    const [schoolName,setSchoolName] = useState(classData.school_name);
    const [schoolBoard,setSchoolBoard] = useState(classData.school_board_id);
    const [state,setState] = useState(classData.state);
    const [city,setCity] = useState(classData.city);
    const [updateProfileLoader,setUpdateProfileLoader] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(classData?.id){
            setName(classData?.name);
            setEmail(classData.email);
            setFatherName(classData.father_name);
            setMotherName(classData.mother_name);
            setSchoolName(classData.school_name);
            setSchoolBoard(classData.school_board_id);
            setState(classData.state);
            setCity(classData.city);
        }
    },[classData])

    const submitCreateProfileForm = (e)=>{
        e.preventDefault();
        e.stopPropagation();

        if(validateInputs() && !updateProfileLoader){
            setUpdateProfileLoader(true);
            let payload = {
                id:classData?.id,
                name,
                email,
                fatherName,
                motherName,
                schoolBoard,
                schoolName,
                state,
                city
            }
            dispatch(actionToUpdateUserProfile(payload,setUpdateProfileLoader))
        }
        return false;
    }

    const validateInputs = ()=>{
         if(name?.trim()?.length === 0){
            return false;
        }else if(email?.trim()?.length === 0){
            return false;
        }else if(fatherName?.trim()?.length === 0){
            return false;
        }else if(motherName?.trim()?.length === 0){
            return false;
        }else if(schoolName?.trim()?.length === 0){
            return false;
        }else if(schoolBoard?.trim()?.length === 0){
            return false;
        }else if(state?.trim()?.length === 0){
            return false;
        }else if(city?.trim()?.length === 0){
            return false;
        }
        return true;
    }


    return (
        <div className={"user_profile_edit_main_container"}>
            <div className={"user_profile_edit_main_container_inner_section"}>
                <form onSubmit={submitCreateProfileForm}>
                    <div className={"user_create_profile_main_row mt-30"}>
                        <div className={"personal_prof_form_2"}>
                            <div className={"profile_form_header"}>
                                Personal Information
                            </div>
                            <div className={"profile_form_main_inner_body mt-30"}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Full Name <span className={"error"}>*</span></label>
                                            <input type="text"
                                                   value={name}
                                                   onChange={(e)=>setName(e.target.value)}
                                                   className="form-control" placeholder="Enter full name" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address <span className={"error"}>*</span></label>
                                            <input type="email"
                                                   value={email}
                                                   onChange={(e)=>setEmail(e.target.value)}
                                                   className="form-control" aria-describedby="emailHelp" placeholder="Enter email address" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Father's name <span className={"error"}>*</span></label>
                                            <input type="text"
                                                   value={fatherName}
                                                   onChange={(e)=>setFatherName(e.target.value)}
                                                   className="form-control" placeholder="Enter father's name" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Mother's name <span className={"error"}>*</span></label>
                                            <input type="text"
                                                   value={motherName}
                                                   onChange={(e)=>setMotherName(e.target.value)}
                                                   className="form-control" placeholder="Enter mother's name" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">School name <span className={"error"}>*</span></label>
                                            <input type="text"
                                                   value={schoolName}
                                                   onChange={(e)=>setSchoolName(e.target.value)}
                                                   className="form-control" placeholder="Enter school name" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">School Board <span className={"error"}>*</span></label>
                                            <select
                                                value={schoolBoard}
                                                onChange={(e)=>setSchoolBoard(e.target.value)}
                                                className="form-control" placeholder={"Select school board"} required>
                                                <option value={""}>Select school board</option>

                                                {(schoolBoardData?.map((board,key)=>(
                                                    <option key={key} value={board?.id}>{board?.name}</option>
                                                )))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Select state <span className={"error"}>*</span></label>
                                            <select
                                                value={state}
                                                onChange={(e)=>setState(e.target.value)}
                                                className="form-control">
                                                <option value="">Select state</option>
                                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chandigarh">Chandigarh</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                                <option value="Daman and Diu">Daman and Diu</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="v">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Ladakh">Ladakh</option>
                                                <option value="Lakshadweep">Lakshadweep</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Puducherry">Puducherry</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mt-10">
                                        <div className="form-group">
                                            <label>City <span className={"error"}>*</span></label>
                                            <input type="text"
                                                   value={city}
                                                   onChange={(e)=>setCity(e.target.value)}
                                                   className="form-control" placeholder="Enter city name" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="theme_btn mt-30 mb-30">Update</button>
                        </div>
                    </div>
                </form>
                {(updateProfileLoader) ?
                    <SpinnerLoader message={'Updating your profile...'}/>
                    : ''
                }
            </div>
        </div>
    )
}