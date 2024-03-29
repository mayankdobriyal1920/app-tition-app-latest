import pool from './connection.js';
import {
    actionToAlreadyCreatedClassAccordingToTheConditionQuery,
    actionToGetAllAttendClassWithAssignmentQuery,
    actionToGetAllClassAssignmentDataWithClassAttendQuery,
    actionToGetAllClassesDataListQuery,
    actionToGetAllDemoClassesDetailsQuery,
    actionToGetAllNewStudentProfileDataListQuery,
    actionToGetAllRecordedClassesDetailsQuery,
    actionToGetAllShoolBoardDataListQuery,
    actionToGetAllStudentClassAttendWithAssignmentQuery,
    actionToGetAllStudentDataListQuery,
    actionToGetAllStudentSubscriptionDataListQuery,
    actionToGetAllSubjectDataListQuery,
    actionToGetAllTeacherDataListQuery,
    actionToGetLatestDemoClassesDetailsQuery,
    actionToGetLatestStudentProfileDataListQuery,
    actionToGetLatestSubscriptionDataListQuery,
    actionToGetLatestTeacherDataListQuery,
    actionToGetStudentAllDemoClassesQuery,
    actionToGetStudentAllTimetableClassesQuery,
    actionToGetStudentAllTodayClassesQuery,
    actionToGetStudentClassAssignmentDataWithClassAttendQuery,
    actionToGetStudyMaterialByHeadingTabAndSubTabQuery,
    actionToGetTeacherAllClassesQuery,
    actionToGetTeacherAllDemoClassesQuery,
    actionToGetTeacherAllTimetableClassesQuery,
    actionToGetTeacherAllTodayClassesQuery,
    actionToGetTodayProfileDataListQuery,
    actionToGetUserAllClassesQuery,
    actionToSearchTeacherAccordingToTheConditionQuery
} from "./commonQueries.js";
import PaytmChecksum from 'paytmchecksum';
import request from 'request';
import {
    allChanelWhiteBoardEditingData,
    allChannelsInGroupCallData,
    canvasReservedJsonActiveIndex,
    membersInChannelWithDetails
} from "../server.js";
const accountSid = '8e228d73929b4842b54d9fe5059a35df';
const authToken = '70848b2f2a0e47a495ffc6cb75ed51f3';
export const insertCommonApiCall = (body) => {
    const {column,alias,tableName,values} = body;
    return new Promise(function(resolve, reject) {
        const query =`INSERT INTO ${tableName} (${column.toString()}) VALUES (${alias.toString()})`;
        pool.query(query,values, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export const updateCommonApiCall = (body) => {
    const {column,value,whereCondition,tableName} = body;
    return new Promise(function(resolve, reject) {
        const query = `UPDATE ${tableName} set ${column.toString()} WHERE ${whereCondition}`;
        pool.query(query,value, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export const deleteCommonApiCall = (body) => {
    const {condition,tableName} = body;
    return new Promise(function(resolve, reject) {
        const query = `DELETE FROM ${tableName} WHERE ${condition}`;
        pool.query(query, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export const actionToGetAllSubjectDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllSubjectDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetStudyMaterialByHeadingTabAndSubTabApiCall = (body) => {
    const {condition} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetStudyMaterialByHeadingTabAndSubTabQuery(condition);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetWhiteBoardPrevDataForGroupIdApiCall = (body) => {
    let {groupDataId} = body;
    return new Promise(function(resolve) {
        let canvasIndex = canvasReservedJsonActiveIndex[groupDataId];
        let objectKey = `canvas-${canvasIndex}`;
        let results = [];
        if(allChanelWhiteBoardEditingData[groupDataId] && allChanelWhiteBoardEditingData[groupDataId][objectKey])
            results = allChanelWhiteBoardEditingData[groupDataId][objectKey];

        resolve(results);
    })
}
export const actionToSearchTeacherAccordingToTheConditionApiCall = (body) => {
    let {subject_id,student_class,school_board} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToSearchTeacherAccordingToTheConditionQuery(subject_id,student_class,school_board);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetPrevCallOnGroupClassApiCall = (body) => {
    let {profileId} = body;
    return new Promise(function(resolve, reject) {
        let found = false;
        let foundData = null;
        let foundMemberData = null;

        if(allChannelsInGroupCallData && Object.keys(allChannelsInGroupCallData).length){
            Object.keys(allChannelsInGroupCallData).map((key)=>{
                if(allChannelsInGroupCallData[key]?.profile_subject_with_batch) {
                    allChannelsInGroupCallData[key]?.profile_subject_with_batch?.map((studentProfile)=>{
                        if (studentProfile?.student_id === profileId) {
                            found = true;
                            foundData = allChannelsInGroupCallData[key];
                        }
                    })
                }
            })
            if(foundData !== null) {
                if(membersInChannelWithDetails[foundData.id]){
                    foundMemberData = membersInChannelWithDetails[foundData.id];
                }
            }
            ///// USER ALREADY IN LIST /////
        }

        let result = {
            classGroupData:foundData,
            members: foundMemberData
        }
        resolve(result);
    })
}
export const actionToAlreadyCreatedClassAccordingToTheConditionApiCall = (body) => {
    let {weekStartDate,weekEndDate,subject_id,student_class,school_board,batch} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToAlreadyCreatedClassAccordingToTheConditionQuery(weekStartDate,weekEndDate,subject_id,student_class,school_board,batch);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllDemoClassesDetailsApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllDemoClassesDetailsQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllRecordedClassesDetailsApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllRecordedClassesDetailsQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetLatestDemoClassesDetailsApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetLatestDemoClassesDetailsQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetLatestStudentProfileDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetLatestStudentProfileDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllStudentDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllStudentDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllNewStudentProfileDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllNewStudentProfileDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetTodayProfileDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetTodayProfileDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetLatestTeacherDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetLatestTeacherDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetLatestSubscriptionsDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetLatestSubscriptionDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllStudentSubscriptionDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllStudentSubscriptionDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllTeacherDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllTeacherDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllClassesDataListApiCall = (body) => {
    const {weekStartDate,weekEndDate} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllClassesDataListQuery(weekStartDate,weekEndDate);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllAttendClassWithAssignmentApiCall = (body) => {
    const {profile_id} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllAttendClassWithAssignmentQuery(profile_id);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllStudentClassAttendWithAssignmentApiCall = (body) => {
    const {teacher_id} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllStudentClassAttendWithAssignmentQuery(teacher_id);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllSchoolBoardDataListApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllShoolBoardDataListQuery();
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToGetUserAllClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetUserAllClassesQuery(userId);
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
export const actionToInitializePaymentGatewayApiCall = (payload) => {
    return new Promise(function(resolve, reject) {
        let mkey = "435fd534tdsdsgsgsgsdgddsfgdsfg";
        let paytmParams = {body:payload};

        PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            mkey
        ).then(function (checksum) {
            console.log(checksum);
            paytmParams.head = {
                signature: checksum,
            };
            let post_data = JSON.stringify(paytmParams);
            let options = {
                hostname: "securegw.paytm.in",
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${payload?.mid}&orderId=${payload?.orderId}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": post_data.length,
                },
            };

            request.post(options, function (error, response, body) {
                if (error === null && response.statusCode === 200) {
                    console.log("Response: ", response);
                    resolve({data: JSON.parse(response), orderId: payload?.orderId, mid:payload?.mid, amount: payload?.amount});
                }
            })
            // let post_req = request(options, function (post_res) {
            //     post_res.on("data", function (chunk) {
            //         response += chunk;
            //     });
            //     post_res.on("end", function () {
            //         console.log("Response: ", response);
            //         resolve({data: JSON.parse(response), orderId: payload?.orderId, mid:payload?.mid, amount: payload?.amount});
            //         console.log(response)
            //     });
            // });
        }).error((e)=>{
            console.log('not valid ==>',e)
        });
    })
}
export const actionToGetTeacherAllClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTeacherAllClassesQuery(userId);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetTeacherAllTimetableClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTeacherAllTimetableClassesQuery(userId);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetStudentAllTimetableClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetStudentAllTimetableClassesQuery(userId);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetAllClassAssignmentDataWithClassAttendApiCall = (body) => {
    const {userId,weekStartDate,weekEndDate} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetAllClassAssignmentDataWithClassAttendQuery(userId,weekStartDate,weekEndDate);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetStudentClassAssignmentDataWithClassAttendApiCall = (body) => {
    const {userId,weekStartDate,weekEndDate} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetStudentClassAssignmentDataWithClassAttendQuery(userId,weekStartDate,weekEndDate);
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetTeacherAllTodayClassesApiCall = (body) => {
    const {userId,todayDate} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTeacherAllTodayClassesQuery(userId,todayDate);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetStudentAllTodayClassesApiCall = (body) => {
    const {userId,todayDate} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetStudentAllTodayClassesQuery(userId,todayDate);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetStudentAllDemoClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetStudentAllDemoClassesQuery(userId);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToGetTeacherAllDemoClassesApiCall = (body) => {
    const {userId} = body;
    return new Promise(function(resolve, reject) {
        const query = actionToGetTeacherAllDemoClassesQuery(userId);

        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            resolve(results);
        })
    })
}
export const actionToSendVideoChunkDataToServerApiCall = (body) => {
    const {groupId,videoData} = body;
    return new Promise(function(resolve, reject) {
       console.log(groupId,videoData);
        resolve([]);
        // pool.query(query, (error, results) => {
        //     if (error) {
        //         reject(error)
        //     }
        //     resolve(results);
        // })
    })
}
let userOtpData = {};
export const actionToSendOtpInMobileNumberApiCall = (body) => {
    const {mobileNumber} = body;
    return new Promise(function(resolve, reject) {
        let userOtp = Math.floor(100000 + Math.random() * 900000);
        //let userOtp = 123456;
        userOtpData[mobileNumber] = userOtp;

        let NUMBER = '+91'+mobileNumber;
        //https://us.sms.api.sinch.com/xms/v1
        request({
            uri: `https://2factor.in/API/V1/ed771608-e72a-11ed-addf-0200cd936042/SMS/${NUMBER}/${userOtp}/OTP1`,
            method: 'GET'
        }, function (err, res, body) {
            console.log(res);
        });
        resolve({success:1});
    })
}

export const actionToVerifyUserOtpByMobileNumberApiCall = (body) => {
    const {mobileNumber,otp} = body;
    return new Promise(function(resolve, reject) {
        let data = {statue:0};
        if(userOtpData[mobileNumber] && Number(userOtpData[mobileNumber]) === Number(otp)){
            data = {status:1};
        }
        resolve(data);
    })
}
export const actionToValidateMobileNumberApiCall = (body) => {
    const {mobileNumber} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT id,name,address,email,mobile,is_active,has_profile,role from app_user where mobile = '${mobileNumber}'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            let data = {};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
}
export const actionToSigninWithPasswordApiCall = (body) => {
    const {mobileNumber,password} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT 1 as status,id,name,address,email,mobile,is_active,has_profile,role from app_user where mobile = '${mobileNumber}' AND password = '${password}'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            let data = {status:0};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
}
export const actionToGetUserFreshDataApiCall = (body) => {
    const {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT id,name,address,email,mobile,is_active,has_profile,role from app_user where id = '${id}'`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(error)
            }
            let data = {};
            if(results?.length){
                data = results[0];
            }
            resolve(data);
        })
    })
}