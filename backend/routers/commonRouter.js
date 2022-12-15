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
    actionToGetAllAttendClassWithAssignmentApiCall
} from "../models/commonModel.js";
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
            }
            res.status(200).send({
                response: finalData,
            });

        })
            .catch(error => {
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
                    finalData.push(JSON.parse(resData.teacher_classes_data));
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
const uploadPath = "/var/www/html/mrtutor/upload";
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