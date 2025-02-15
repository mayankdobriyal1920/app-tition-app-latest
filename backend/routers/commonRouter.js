import express from 'express';
import fs from 'fs';
import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';

import {
    actionToGetAllSchoolBoardDataListApiCall,
    actionToGetAllStudentDataListApiCall,
    actionToGetAllSubjectDataListApiCall,
    actionToGetTeacherAllClassesApiCall,
    actionToGetUserAllClassesApiCall,
    actionToInitializePaymentGatewayApiCall,
    actionToValidateMobileNumberApiCall,
    actionToGetAllTeacherDataListApiCall,
    deleteCommonApiCall,
    insertCommonApiCall,
    updateCommonApiCall,
    actionToGetAllStudentSubscriptionDataListApiCall,
    actionToGetAllNewStudentProfileDataListApiCall,
    actionToGetUserFreshDataApiCall,
    actionToGetAllAttendClassWithAssignmentApiCall,
    actionToGetAllClassesDataListApiCall,
    actionToGetLatestTeacherDataListApiCall,
    actionToGetLatestStudentProfileDataListApiCall,
    actionToGetAllDemoClassesDetailsApiCall,
    actionToSearchTeacherAccordingToTheConditionApiCall,
    actionToAlreadyCreatedClassAccordingToTheConditionApiCall,
    actionToGetLatestSubscriptionsDataListApiCall,
    actionToGetTodayProfileDataListApiCall,
    actionToGetLatestDemoClassesDetailsApiCall,
    actionToGetAllStudentClassAttendWithAssignmentApiCall,
    actionToGetAllRecordedClassesDetailsApiCall,
    actionToGetPrevCallOnGroupClassApiCall,
    actionToGetWhiteBoardPrevDataForGroupIdApiCall,
    actionToGetTeacherAllTodayClassesApiCall,
    actionToGetTeacherAllDemoClassesApiCall,
    actionToGetStudentAllTodayClassesApiCall,
    actionToGetStudentAllDemoClassesApiCall,
    actionToGetAllClassAssignmentDataWithClassAttendApiCall,
    actionToGetStudentClassAssignmentDataWithClassAttendApiCall,
    actionToGetTeacherAllTimetableClassesApiCall,
    actionToGetStudentAllTimetableClassesApiCall,
    actionToSendOtpInMobileNumberApiCall,
    actionToSigninWithPasswordApiCall,
    actionToGetStudyMaterialByHeadingTabAndSubTabApiCall,
    actionToGetCurrentUserProfileDataApiCall,
    createNewSessionWithUserDataAndRole,
    actionToVerifyUserLoginOtpByMobileNumberApiCall,
    actionToVerifyUserSignUpOtpByMobileNumberApiCall, deleteOldSessionFileFromSessionStore
} from "../models/commonModel.js";
import {allChanelWhiteBoardEditingData,canvasReservedJsonActiveIndex} from "../server.js";
const commonRouter = express.Router();

const stripe = Stripe('sk_test_51N2mQmSJ2gkRHOPdcIrbvLMj7M2NcA3If5PdsrlsyJ4WFR6RU76NnFy1onMXhhiFkj0T5ODZJzuhhAmDrlFEs3Qq004TLPiEMU');

commonRouter.post(
    '/insertCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        insertCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/updateCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        updateCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/deleteCommonApiCall',
    expressAsyncHandler(async (req, res) => {
        deleteCommonApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);


commonRouter.post(
    '/actionToValidateMobileNumberApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToValidateMobileNumberApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToVerifyUserLoginOtpByMobileNumberApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToVerifyUserLoginOtpByMobileNumberApiCall(req.body).then((data) => {
            if(data?.id) {
                createNewSessionWithUserDataAndRole(req, data).then(() => {
                    res.status(200).send({response:{
                        status: 1,
                        userData: data,
                        message: 'Session data retrieved successfully',
                    }});
                })
            }else {
                res.status(200).send({
                    response: {status:0},
                });
            }
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToVerifyUserSignUpOtpByMobileNumberApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToVerifyUserSignUpOtpByMobileNumberApiCall(req.body).then((data) => {
            if(data?.status) {
                createNewSessionWithUserDataAndRole(req, data).then(() => {
                    res.status(200).send({response:{
                       status: 1,
                    }});
                })
            }else {
                res.status(200).send({
                    response: {status:0},
                });
            }
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToSigninWithPasswordApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToSigninWithPasswordApiCall(req.body).then((data) => {
            if(data?.id) {
                createNewSessionWithUserDataAndRole(req, data).then(() => {
                    res.status(200).send({response: {
                            status: 1,
                            userData: data,
                            message: 'Session data retrieved successfully',
                    }});
                })
            }else {
                res.status(200).send({
                    response: {status:0},
                });
            }
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToSendOtpInMobileNumberApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToSendOtpInMobileNumberApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToGetCurrentUserSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetCurrentUserProfileDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send({
                    success: true,
                    userData:responseData,
                    message: 'Session data retrieved successfully',
                });
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGetAllSubjectDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllSubjectDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToGetStudyMaterialByHeadingTabAndSubTabApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetStudyMaterialByHeadingTabAndSubTabApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetActiveEditorJsonApiCall',
    expressAsyncHandler(async (req, res) => {
        let {groupId} = req.body;
        let jsonData = [];
        let canvasIndex = canvasReservedJsonActiveIndex[groupId];
        let objectKey = `canvas-${canvasIndex}`;
        if(allChanelWhiteBoardEditingData[groupId] && allChanelWhiteBoardEditingData[groupId][objectKey])
            jsonData = allChanelWhiteBoardEditingData[groupId][objectKey];

        res.status(200).send({
            response: jsonData,
        });
    })
);
commonRouter.post(
    '/actionToGetEditorCompleteJsonDataWithIndexApiCall',
    expressAsyncHandler(async (req, res) => {
        let {groupId} = req.body;
        let jsonData = {data:''};
        if(allChanelWhiteBoardEditingData[groupId]){
            jsonData = {data:allChanelWhiteBoardEditingData[groupId],index:canvasReservedJsonActiveIndex[groupId]}
        }
        res.status(200).send({
            response: jsonData,
        });
    })
);
commonRouter.post(
    '/actionToGetWhiteBoardPrevDataForGroupIdApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetWhiteBoardPrevDataForGroupIdApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
                res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToSearchTeacherAccordingToTheConditionApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToSearchTeacherAccordingToTheConditionApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetPrevCallOnGroupClassApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetPrevCallOnGroupClassApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToAlreadyCreatedClassAccordingToTheConditionApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToAlreadyCreatedClassAccordingToTheConditionApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllDemoClassesDetailsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllDemoClassesDetailsApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllRecordedClassesDetailsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllRecordedClassesDetailsApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetLatestDemoClassesDetailsApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetLatestDemoClassesDetailsApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllStudentDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllStudentDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllAttendClassWithAssignmentApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllAttendClassWithAssignmentApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    finalData.push(JSON.parse(resData.class_attend));
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
                res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetAllStudentClassAttendWithAssignmentApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllStudentClassAttendWithAssignmentApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    finalData.push(JSON.parse(resData.classes_assigned));
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
                res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/uploadAssignmentApiCall',
    expressAsyncHandler(async (req, res) => {

    })
);
commonRouter.post(
    '/actionToCreatePaymentIntendApiCall',
    expressAsyncHandler(async (req, res) => {
        let {amount} = req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "INR",
                amount: amount,
                description: 'Fee payment of student',
                shipping: {
                    name: 'Jenny Rosen',
                    address: {
                        line1: '510 Townsend St',
                        postal_code: '98140',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                    },
                },
                automatic_payment_methods: { enabled: true },
            });

            // Send publishable key and PaymentIntent details to client
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (e) {
            return res.status(400).send({
                error: {
                    message: e.message,
                },
            });
        }
    })
);
commonRouter.post(
    '/actionToConfigStripeSetupApiCall',
    expressAsyncHandler(async (req, res) => {
        res.send({
            publishableKey: 'pk_test_51N2mQmSJ2gkRHOPdJ4iUTP0gIC0FyY8mNysFM4759W79jXTeMIa10BmxlOllCKJRwToKLKwtrJs5KzQ6DQWJayMQ00EQDKPqDe',
        });
    })
);
commonRouter.post(
    '/actionToGetAllNewStudentProfileDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllNewStudentProfileDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetTodayProfileDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTodayProfileDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetLatestStudentProfileDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetLatestStudentProfileDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllStudentSubscriptionDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllStudentSubscriptionDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllTeacherDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllTeacherDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetLatestTeacherDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetLatestTeacherDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetLatestSubscriptionsDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetLatestSubscriptionsDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllClassesDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllClassesDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,

            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetAllSchoolBoardDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllSchoolBoardDataListApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);
commonRouter.post(
    '/actionToGetUserFreshDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUserFreshDataApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        })
            .catch(error => {
                res.status(500).send(error);
            })
    })
);

commonRouter.post(
    '/actionToGetUserAllClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetUserAllClassesApiCall(req.body).then((data) => {
            let finalData = {};
            if(data && data?.length){
                if(typeof data[0].profile_data === 'string')
                  finalData = JSON.parse(data[0].profile_data)
                else
                  finalData = data[0].profile_data;
                if(typeof finalData.profile_subject_with_batch === 'string')
                  finalData.profile_subject_with_batch = JSON.parse(finalData.profile_subject_with_batch)
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetTeacherAllClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    let classData = [];
                    if(typeof resData.teacher_classes_data === 'string')
                        classData = JSON.parse(resData.teacher_classes_data);
                    else
                        classData = resData.teacher_classes_data;
                    if(classData) {
                        finalData.push(classData);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetTeacherAllTimetableClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllTimetableClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    if(typeof resData?.classes_data === 'string') {
                        finalData.push(JSON.parse(resData?.classes_data));
                    }else{
                        finalData.push(resData?.classes_data);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetStudentAllTimetableClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetStudentAllTimetableClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){ 
                data?.map((resData)=>{
                    if(typeof resData?.classes_data === 'string') {
                        finalData.push(JSON.parse(resData?.classes_data));
                    }else{
                        finalData.push(resData?.classes_data);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetAllClassAssignmentDataWithClassAttendApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetAllClassAssignmentDataWithClassAttendApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    let classData = [];
                    if(typeof resData.teacher_classes_data === 'string')
                     classData = JSON.parse(resData.teacher_classes_data);
                    else
                     classData = JresData.teacher_classes_data;
                    if(classData) {
                        if (classData?.profile_subject_with_batch) {
                            let allProfileData = [];
                            if(typeof classData.profile_subject_with_batch === 'string')
                                 allProfileData = JSON.parse(classData.profile_subject_with_batch);
                            else
                                 allProfileData = classData.profile_subject_with_batch;

                            allProfileData?.map((profileData,profileDataKey)=>{
                                if(profileData?.id){
                                    allProfileData[profileDataKey] = profileData;
                                }else{
                                    allProfileData[profileDataKey] = JSON.parse(profileData);
                                }
                            })
                            classData.profile_subject_with_batch = allProfileData;
                        }
                        if (classData?.student_class_attend) {
                            let allClassAttendData = []
                            if(typeof classData.student_class_attend === 'string')
                             allClassAttendData = JSON.parse(classData.student_class_attend)
                            else
                             allClassAttendData = classData.student_class_attend;
                            allClassAttendData?.map((classAttendData,classAttendDataKey)=>{
                                if(!classAttendData?.id) {
                                    allClassAttendData[classAttendDataKey] = JSON.parse(classAttendData);
                                    if (allClassAttendData[classAttendDataKey]?.student_class_attend_assignment) {
                                        if(typeof allClassAttendData[classAttendDataKey].student_class_attend_assignment === 'string')
                                           allClassAttendData[classAttendDataKey].student_class_attend_assignment = JSON.parse(allClassAttendData[classAttendDataKey].student_class_attend_assignment);
                                    }
                                }else{
                                    if (allClassAttendData[classAttendDataKey]?.student_class_attend_assignment) {
                                        if(typeof allClassAttendData[classAttendDataKey]?.student_class_attend_assignment === 'string')
                                           allClassAttendData[classAttendDataKey].student_class_attend_assignment = JSON.parse(allClassAttendData[classAttendDataKey].student_class_attend_assignment);
                                    }
                                }
                            })
                            classData.student_class_attend = allClassAttendData;
                        }
                        if (classData?.teacher_class_attend_assignment) {
                            if(typeof classData?.teacher_class_attend_assignment === 'string')
                               classData.teacher_class_attend_assignment = JSON.parse(classData.teacher_class_attend_assignment);
                        }
                        finalData.push(classData);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetStudentClassAssignmentDataWithClassAttendApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetStudentClassAssignmentDataWithClassAttendApiCall(req.body).then((data) => {
            let finalData = [];
            if (data && data.length) {
                data.forEach((resData) => {
                    let classData = JSON.parse(resData.teacher_classes_data);
                    if (classData) {
                        const parseIfString = (value) => (typeof value === 'string' ? JSON.parse(value) : value);

                        if (classData.profile_subject_with_batch) {
                            classData.profile_subject_with_batch = parseIfString(classData.profile_subject_with_batch);
                            classData.profile_subject_with_batch = classData.profile_subject_with_batch.map(profileData => parseIfString(profileData));
                        }

                        if (classData.student_class_attend) {
                            classData.student_class_attend = parseIfString(classData.student_class_attend);
                            classData.student_class_attend = classData.student_class_attend.map(classAttendData => {
                                classAttendData = parseIfString(classAttendData);
                                if (classAttendData.student_class_attend_assignment) {
                                    classAttendData.student_class_attend_assignment = parseIfString(classAttendData.student_class_attend_assignment);
                                }
                                return classAttendData;
                            });
                        }

                        if (classData.teacher_class_attend_assignment) {
                            classData.teacher_class_attend_assignment = parseIfString(classData.teacher_class_attend_assignment);
                        }

                        finalData.push(classData);
                    }
                });
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetTeacherAllTodayClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllTodayClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    let classData = [];
                    if(typeof resData.teacher_classes_data === 'string')
                     classData = JSON.parse(resData.teacher_classes_data);
                    else
                     classData =  resData.teacher_classes_data;
                    if(classData) {
                        if (typeof classData.profile_subject_with_batch === 'string') {
                            let allProfileData = JSON.parse(classData.profile_subject_with_batch);
                            allProfileData?.map((profileData, profileDataKey) => {
                                if(typeof profileData === 'string')
                                   allProfileData[profileDataKey] = JSON.parse(profileData);
                            })
                            classData.profile_subject_with_batch = allProfileData;
                        }
                        finalData.push(classData);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetStudentAllTodayClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetStudentAllTodayClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData) => {
                    if(typeof resData.classes_data === 'string') {
                        finalData.push(JSON.parse(resData.classes_data));
                    }else{
                        finalData.push(resData.classes_data);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetStudentAllDemoClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetStudentAllDemoClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData) => {
                    if(typeof resData.classes_data === 'string') {
                        finalData.push(JSON.parse(resData.classes_data));
                    }else{
                        finalData.push(resData.classes_data);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToGetTeacherAllDemoClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllDemoClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    let classData = [];
                    if(typeof resData.teacher_classes_data === 'string')
                     classData = JSON.parse(resData.teacher_classes_data);
                    else
                     classData = resData.teacher_classes_data;
                    if(classData) {
                        if (classData.profile_subject_with_batch) {
                            let allProfileData = [];
                            if(typeof classData.profile_subject_with_batch === 'string')
                             allProfileData = JSON.parse(classData.profile_subject_with_batch)
                            else
                             allProfileData = classData.profile_subject_with_batch;
                            allProfileData?.map((profileData, profileDataKey) => {
                                if(typeof profileData === 'string')
                                  allProfileData[profileDataKey] = JSON.parse(profileData);
                            })
                            classData.profile_subject_with_batch = allProfileData;
                        }
                        finalData.push(classData);
                    }
                })
            }
            res.status(200).send({
                response: finalData,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);
commonRouter.post(
    '/actionToInitializePaymentGatewayApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToInitializePaymentGatewayApiCall(req.body).then((data) => {
            res.status(200).send({
                response: data,
            });
        }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToLogoutUserSessionApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        const oldSessionId = req?.session?.id;
        deleteOldSessionFileFromSessionStore(oldSessionId).then(() => {
            req?.session?.destroy();
            res.status(200).send({
                success: true,
                message: 'User logged out',
            });
        });
    })
);

export default commonRouter;