import pool from './connection.js';
import {
    actionToGetAllShoolBoardDataListQuery, actionToGetAllStudentDataListQuery,
    actionToGetAllSubjectDataListQuery, actionToGetAllTeacherDataListQuery, actionToGetTeacherAllClassesQuery,
    actionToGetUserAllClassesQuery
} from "./commonQueries.js";
import PaytmChecksum from 'paytmchecksum';
import request from 'request';

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
                reject(query)
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