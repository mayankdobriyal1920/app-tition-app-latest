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
    actionToGetStudentAllDemoClassesApiCall
} from "../models/commonModel.js";
import {canvasReservedJson, canvasReservedJsonActiveIndex} from "../server.js";
const commonRouter = express.Router();

const stripe = Stripe('sk_test_51ME77cSIFtW1VSPuJqLQWVmK1vmdptG6j457wJlQv98NeRnB2eAdwkbQYWwlNfVIrtuRbNFPZsbKyafCQwdZuT1300SgcSS7AB');

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
    '/actionToGetActiveEditorJsonApiCall',
    expressAsyncHandler(async (req, res) => {
        let {groupId} = req.body;
        let jsonData = {data:'',status:Math.random()};
        if(canvasReservedJson[groupId] && canvasReservedJson[groupId][canvasReservedJsonActiveIndex[groupId]]){
            jsonData = {status:Math.random(),data:canvasReservedJson[groupId][canvasReservedJsonActiveIndex[groupId]]}
        }
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
        if(canvasReservedJson[groupId]){
            jsonData = {data:canvasReservedJson[groupId],index:canvasReservedJsonActiveIndex[groupId]}
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
        })
            .catch(error => {
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
            publishableKey: 'pk_test_51ME77cSIFtW1VSPuewmIrcC2SSgHZi0ad2OuqicbcRiVpBRkRyVByCFEaIyb067eFhQL0GXaWVakkkZt5TuLFo6J005HlqBOck',
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
                finalData = JSON.parse(data[0].profile_data)
                if(finalData.profile_subject_with_batch)
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
                    let classData = JSON.parse(resData.teacher_classes_data);
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
    '/actionToGetTeacherAllTodayClassesApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetTeacherAllTodayClassesApiCall(req.body).then((data) => {
            let finalData = [];
            if(data && data?.length){
                data?.map((resData)=>{
                    let classData = JSON.parse(resData.teacher_classes_data);
                    if(classData) {
                        if (classData.profile_subject_with_batch) {
                            let allProfileData = JSON.parse(classData.profile_subject_with_batch)
                            allProfileData?.map((profileData,profileDataKey)=>{
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
                data?.map((resData)=>{
                    finalData.push(JSON.parse(resData.classes_data));
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
                data?.map((resData)=>{
                    finalData.push(JSON.parse(resData.classes_data));
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
                    let classData = JSON.parse(resData.teacher_classes_data);
                    if(classData) {
                        if (classData.profile_subject_with_batch) {
                            let allProfileData = JSON.parse(classData.profile_subject_with_batch)
                            allProfileData?.map((profileData,profileDataKey)=>{
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

/////////// UPLOAD FILE ///////////////
const uploadPath = "/var/www/html/recording-upload-data";
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const randomNumber = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
//         let filename = randomNumber;
//         cb(null, filename);
//         console.log(file);
//     }
//
// });
// let upload = multer({ storage: storage });
/////////// UPLOAD FILE ///////////////

commonRouter.post(
    '/actionToSendVideoChunkDataToServerApiCall',
    expressAsyncHandler(async (req, res) => {
        //let file = req.files;
        console.log(req.body)
        fs.createWriteStream(`${uploadPath}/RecordingVideo.webm`, { flags: 'a' }).write(req.body);
        res.sendStatus(200);
        // upload.single('logFile'),
        //     (req, res) => {
        //         const data = {
        //             filename: req.file.filename,
        //             downloadPath: `${ req.protocol}:${req.get('host')}/api/capture/download-log-file/${req.file.filename}`
        //         }
        //         res.status(200).send({
        //             response: data,
        //         });
        //     }
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

export default commonRouter;