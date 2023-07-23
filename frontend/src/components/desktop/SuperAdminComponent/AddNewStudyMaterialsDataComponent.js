import React from '@ionic/react';
import {useDispatch} from "react-redux";
import {actionToSaveStudyMaterialData,
} from "../../../actions/CommonAction";
import {useState} from "react";

const allTabTypes = [
    {id:1,name:'Study Materials'},
    {id:2,name:'Class Link'},
    {id:3,name:'Tests'},
];
const allSubTabTypes = [
    {id:1,name:'Plus and iconic Class'},
    {id:2,name:'FAA, Special Class'},
    {id:3,name:'XE:Gate with Mondal'},
    {id:4,name:'SSC JE, AE, PSUs'},
    {id:5,name:'Mains SSC DRDO ALL'},
    {id:6,name:'Virtual Calculator'},
    {id:7,name:'Post Gate Guidance'},
    {id:8,name:'Bhramastra Batch'},
    {id:9,name:'Quick Revision Course'},
];

const AddNewStudyMaterialsDataComponent=() => {
    const dispatch = useDispatch();
    const [subjectName,setSubjectName] = useState('');
    const [topicName,setTopicName] = useState('');
    const [link,setLink] = useState('');
    const [lectureOrder,setLectureOrder] = useState(0);
    const [tabType,setTabType] = useState(0);
    const [subTabType,setSubTabType] = useState(0);
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const [dataAddedSuccess, setDataAddedSuccess] = useState(false);


    const saveTeacherDataForm =()=>{
        if(!dataAddedSuccess) {
            if (validateForm()) {
                let payload = {
                    subjectName,
                    topicName,
                    link,
                    lectureOrder,
                    tabType,
                    subTabType
                }
                dispatch(actionToSaveStudyMaterialData(payload));
                setDataAddedSuccess(true);
                setTimeout(function () {
                    setDataAddedSuccess(false);
                }, 4000)
                resetForm();
            }
        }
    }

    const validateForm =()=>{
        if(!subjectName?.trim()?.length){
            return false;
        }else if(!topicName?.trim()?.length){
            return false;
        }else if(!lectureOrder){
            return false;
        }else if(!tabType?.trim()?.length){
            return false;
        }else if(link?.length === 0){
            return false;
        }
        return true;
    }

    const resetForm = ()=>{
        setSubjectName('');
        setTopicName('');
        setLink('');
        setLectureOrder(0);
        setTabType(0);
        setVerifyDataLoader(false);
    }


    return (
        <div className="content">
            <div className="container-fluid pt-4 px-4 mt-20">
                <form onSubmit={(e)=>saveTeacherDataForm(e)} className="row gx-3 comments-form contact-form">
                    <div className="row g-4">
                        {(dataAddedSuccess) && (
                            <div className={"success_add_div"}>Teacher added successfully</div>
                        )}
                        <div className="">
                            <div className="bg-light rounded h-100 p-4">
                                <h3 className="mb-4">Add New Teacher</h3>
                                <div className="row g-4">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select
                                                onChange={(e)=>setTabType(Number(e.target.value))}
                                                className="form-select" id="floatingSelect" aria-label="Floating label select example" required>
                                                <option value={""}>Select Header tab</option>
                                                {(allTabTypes?.map((tab,key)=>(
                                                    <option key={key} value={tab?.id}>{tab?.name}</option>
                                                )))}
                                            </select>
                                            <label htmlFor="floatingSelect">Header tab</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select
                                                onChange={(e)=>setSubTabType(Number(e.target.value))}
                                                className="form-select" id="floatingSelect" aria-label="Floating label select example" required>
                                                <option value={""}>Select Sub tab</option>
                                                {(allSubTabTypes?.map((tab,key)=>(
                                                    <option key={key} value={tab?.id}>{tab?.name}</option>
                                                )))}
                                            </select>
                                            <label htmlFor="floatingSelect">Sub Header tab</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   value={subjectName}
                                                   onChange={(e)=>setSubjectName(e.target.value)}
                                                   className="form-control" id="floatingName" placeholder="John doe" required/>
                                            <label htmlFor="floatingName">Subject Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   value={topicName}
                                                   onChange={(e)=>setTopicName(e.target.value)}
                                                   className="form-control" id="floatingEmail" placeholder="name@example.com" required/>
                                            <label htmlFor="floatingEmail">Topic name</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   value={link}
                                                   onChange={(e)=>setLink(e.target.value)}
                                                   className="form-control" id="floatingLink" placeholder="name@example.com" required/>
                                            <label htmlFor="floatingLink">Url link</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number"
                                                   value={lectureOrder}
                                                   onChange={(e)=>setLectureOrder(Number(e.target.value))}
                                                   className="form-control" id="floatingQualification" placeholder="MA" required/>
                                            <label htmlFor="floatingQualification">Lecture number</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-30">
                                    {(verifyDataLoader) ? 'Saving...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewStudyMaterialsDataComponent;
