export const actionToGetAllSubjectDataListQuery = ()=>{
    return `SELECT id,name from subject`;
}
export const actionToGetAllSubjectDataListQuery = ()=>{
    return `SELECT id,name from subject`;
}

export const actionToGetAllShoolBoardDataListQuery = ()=>{
    return `SELECT id,name from school_board`;
}

export const actionToGetUserAllClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id',student_profile.id,
                               'father_name',student_profile.father_name,
                               'mother_name',student_profile.mother_name, 
                               'name',student_profile.name,
                               'school_name',student_profile.school_name,
                               'school_board',student_profile.school_board,
                               'state',student_profile.state,
                               'batch',student_profile.batch,
                               'city',student_profile.city,
                               'taken_single_demo',student_profile.taken_single_demo,
                               'subscription_end_date',student_profile.subscription_end_date,
                               'school_board',school_board.name,
                               'student_class',student_profile.student_class,
                               'email',student_profile.email,
                               'profile_subject_with_batch',profile_subject_with_batch.jsdata
                       ) AS profile_data from student_profile
                                                  LEFT JOIN school_board ON student_profile.school_board = school_board.id
                                                  LEFT JOIN (SELECT profile_subject_with_batch.profile_id,
                                                                    json_arrayagg(
                                                                            json_object(
                                                                                    'id',profile_subject_with_batch.id,
                                                                                    'subject_id',profile_subject_with_batch.subject_id,
                                                                                    'has_taken_demo',profile_subject_with_batch.has_taken_demo,
                                                                                    'class_time',profile_subject_with_batch.class_time,
                                                                                    'classes_assigned_to_teacher_id',profile_subject_with_batch.classes_assigned_to_teacher_id,
                                                                                    'demo_class_date_time',profile_subject_with_batch.demo_class_date_time,
                                                                                    'starting_from_date',profile_subject_with_batch.starting_from_date,
                                                                                    'teacher_id',profile_subject_with_batch.teacher_id,
                                                                                    'is_paid',profile_subject_with_batch.is_paid,
                                                                                    'batch',profile_subject_with_batch.batch,
                                                                                    'total_amount',profile_subject_with_batch.total_amount,
                                                                                    'subscription_end',profile_subject_with_batch.subscription_end,
                                                                                    'teacher_name',app_user.name,
                                                                                    'subject_name',subject.name
                                                                                )
                                                                        ) jsdata
                                                             FROM profile_subject_with_batch
                                                                      LEFT JOIN subject ON profile_subject_with_batch.subject_id = subject.id
                                                                      LEFT JOIN app_user ON profile_subject_with_batch.teacher_id = app_user.id

                                                             GROUP BY profile_subject_with_batch.profile_id) profile_subject_with_batch ON profile_subject_with_batch.profile_id = student_profile.id
            WHERE student_profile.created_by = '${userId}'`;
}

export const actionToGetTeacherAllClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id', classes_assigned_to_teacher.id,
                           'subject_id', classes_assigned_to_teacher.subject_id,
                           'batch', classes_assigned_to_teacher.batch,
                           'starting_from_date', classes_assigned_to_teacher.starting_from_date,
                           'is_demo_class', classes_assigned_to_teacher.is_demo_class,
                           'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                           'subject_name', subject.name,
                           'student_class', classes_assigned_to_teacher.student_class,
                           'school_board', school_board.name) AS teacher_classes_data
        from classes_assigned_to_teacher
                 LEFT JOIN school_board ON classes_assigned_to_teacher.school_board = school_board.id
                 LEFT JOIN subject ON classes_assigned_to_teacher.subject_id = subject.id
                 LEFT JOIN (SELECT profile_subject_with_batch.classes_assigned_to_teacher_id,
                                   json_arrayagg(
                                           json_object(
                                                   'id', profile_subject_with_batch.id,
                                                   'student_name', student_profile.name,
                                                   'student_id', student_profile.id
                                               )
                                       ) jsdata
                            FROM profile_subject_with_batch
                                     LEFT JOIN student_profile
                                               ON profile_subject_with_batch.profile_id = student_profile.id
                                     LEFT JOIN app_user ON profile_subject_with_batch.teacher_id = app_user.id

                            GROUP BY profile_subject_with_batch.classes_assigned_to_teacher_id) profile_subject_with_batch
                           ON profile_subject_with_batch.classes_assigned_to_teacher_id = classes_assigned_to_teacher.id
        WHERE classes_assigned_to_teacher.teacher_id = '${userId}'`;
}