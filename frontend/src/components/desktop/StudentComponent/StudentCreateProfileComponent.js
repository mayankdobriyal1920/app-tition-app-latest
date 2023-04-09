import React, {useState} from "react";
import studentReadingImg from "../../../theme/images/chose/reading_student1.png";
import Multiselect from 'multiselect-react-dropdown';
import {useDispatch, useSelector} from "react-redux";
import {_generateUniqueId} from "../../../helper/CommonHelper";
import {actionToCreateUserProfile} from "../../../actions/CommonAction";
import SpinnerLoader from "../../Loader/SpinnerLoader";


function StudentCreateProfileComponentFunction(){
    const allSubjectDataList = useSelector((state) => state.allSubjectDataList.subjectData);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const schoolBoardData = useSelector((state) => state.allSchoolBoardDataList.boardData);
    const [subjects,setSubjects] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [fatherName,setFatherName] = useState('');
    const [motherName,setMotherName] = useState('');
    const [schoolName,setSchoolName] = useState('');
    const [schoolBoard,setSchoolBoard] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [studentClass,setStudentClass] = useState(0);
    const [batch,setBatch] = useState(0);
    const [createProfileLoader,setCreateProfileLoader] = useState(false);

    const dispatch = useDispatch();

    const onSubjectSelect = (selectedList)=>{
        setSubjects(selectedList);
   }
    const submitCreateProfileForm = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(validateInputs() && !createProfileLoader){
            setCreateProfileLoader(true);
            let payload = {
                id:_generateUniqueId(),
                subjects,
                name,
                email,
                fatherName,
                motherName,
                schoolBoard,
                schoolName,
                state,
                city,
                batch,
                studentClass,
                board:userInfo?.board
            }
            dispatch(actionToCreateUserProfile(payload))
        }
        return false;
    }
    const onSubjectRemove = (selectedList)=>{
        setSubjects(selectedList);
    }

    const validateInputs = ()=>{
        if(subjects?.length === 0){
            return false;
        }else if(name?.trim()?.length === 0){
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
        }else if(schoolBoard?.trim()?.length === 0){
            return false;
        }else if(state?.trim()?.length === 0){
            return false;
        }else if(city?.trim()?.length === 0){
            return false;
        }else if(!studentClass){
            return false;
        }else if(!batch){
            return false;
        }
        return true;
    }
    const setBatchFunction = (batch)=>{
        setBatch(batch);
    }
    return (
        <div className={"user_create_profile_main"}>
            <h2>Create your student profile</h2>
            <form onSubmit={submitCreateProfileForm}>
            <div className={"row user_create_profile_main_row mt-30"}>
                <div className={"col personal_prof_form"}>
                    <img alt={"studentReadingImg"} src={studentReadingImg}/>
                </div>
                <div className={"col personal_prof_form_2"}>
                    <div className={"profile_form_header mt-15"}>
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
                </div>
                <div className={"col personal_prof_form3"}>
                    <div style={{color:'rgb(120 119 118)'}} className={"profile_form_header mt-15"}>
                        Class Information
                    </div>
                    <div className={"profile_form_main_inner_body2 mt-15"}>
                        <div className={"row"}>
                            <div className="col-lg-12 col-md-12 mt-10">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Class <span className={"error"}>*</span></label>
                                    <select
                                        value={studentClass}
                                        onChange={(e)=>setStudentClass(Number(e.target.value))}
                                        className="form-control" placeholder={"Select class"} required>
                                        <option value={0}>Select class</option>
                                        <option value={1}>1st</option>
                                        <option value={2}>2nd</option>
                                        <option value={3}>3rd</option>
                                        <option value={4}>4th</option>
                                        <option value={5}>5th</option>
                                        <option value={6}>6th</option>
                                        <option value={7}>7th</option>
                                        <option value={8}>8th</option>
                                        <option value={9}>9th</option>
                                        <option value={10}>10th</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 mt-10">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Subjects <span className={"error"}>*</span></label>
                                    <Multiselect
                                        className="multiple_select_input"
                                        placeholder={"Select multiple subjects"}
                                        options={allSubjectDataList} // Options to display in the dropdown
                                        selectedValues={subjects} // Preselected value to persist in dropdown
                                        onSelect={onSubjectSelect} // Function will trigger on select event
                                        onRemove={onSubjectRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />
                                </div>
                            </div>
                            <div  onChange={(e)=>setBatchFunction(e.target.value)}>
                                <div className="col-lg-12 col-md-12 mt-10">
                                    <div className="form-group mb-10">
                                        <label htmlFor="exampleInputEmail1">Select Batch <span className={"error"}>*</span></label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            value={1}
                                            className="form-check-input" type="radio" name="batch" required/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            1 teacher 1 student (one to one teaching)
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 mt-10">
                                    <div className="form-check">
                                        <input
                                            value={2} className="form-check-input" type="radio" name="batch" required/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            1 teacher 3 student (group teaching)
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 mt-10">
                                    <div className="form-check">
                                        <input
                                            value={3} className="form-check-input" type="radio" name="batch" required/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            1 teacher 5 student (group teaching)
                                        </label>
                                    </div>
                                </div>
                            </div>
                           <button type="submit" className="theme_btn mt-30 mb-30">Submit</button>
                    </div>
                </div>
              </div>
            </div>
            </form>
            {(createProfileLoader) ?
                <SpinnerLoader message={'Creating your profile...'}/>
                : ''
            }
        </div>
    )
}
export const StudentCreateProfileComponent = React.memo(StudentCreateProfileComponentFunction);
