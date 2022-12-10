import express from 'express';
import fs from 'fs';
import expressAsyncHandler from 'express-async-handler';

import {
    actionToGetAllSchoolBoardDataListApiCall,
    actionToGetAllSubjectDataListApiCall,
    actionToGetTeacherAllClassesApiCall,
    actionToGetUserAllClassesApiCall, actionToInitializePaymentGatewayApiCall,
    actionToValidateMobileNumberApiCall,
    deleteCommonApiCall,
    insertCommonApiCall,
    updateCommonApiCall
} from "../models/commonModel.js";
const commonRouter = express.Router();

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
    '/actionToGetAllStudenttDataListApiCall',
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