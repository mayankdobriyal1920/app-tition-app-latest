import React, {useState} from 'react';
export default function ClassAssignPopupComponent(){
    const [selectedTeacherId,setSelectedTeacherId] = useState();
    const [classStartFromDateTime,setClassStartFromDateTime] = useState(null);

    return (
        <div className={"assign_class_main_popup_outer_container"}>
            <div className={"assign_class_main_popup_inner_container"}>
                <div className="bg-light rounded h-100 p-4">
                    <h6 className="mb-4">Assign class</h6>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected="">Select teacher</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="floatingSelect">Teacher</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="datetime-local"
                               value={classStartFromDateTime}
                               onChange={(e)=>setClassStartFromDateTime(e.target.value)}
                               className="form-control" id="floatingClassTime" placeholder="Class date time"/>
                        <label htmlFor="floatingClassTime">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected="">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="floatingSelect">Works with selects</label>
                    </div>
                </div>
            </div>
        </div>
    )
}