export const actionToGetAllSubjectDataListQuery = ()=>{
    return `SELECT id,name from subject`;
}
export const actionToGetAllStudentDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id `;
}
export const actionToGetAllNewStudentProfileDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id `;
}
export const actionToGetAllStudentSubscriptionDataListQuery = ()=>{
    return `select student_profile.id as student_id, student_profile.name as student_name,student_profile.email as student_email, student_profile.student_class,student_profile.batch as student_batch,
                   student_profile.subscription_end_date as student_subscription_end_date,subject.id as subject_id, subject.name as subject_name, profile_subject_with_batch.id as profile_subject_with_batch_id,
                   school_board.id as school_board_id,school_board.name as school_board_name,app_user.name as teacher_name,profile_subject_with_batch.classes_assigned_to_teacher_id as teacher_id
            from profile_subject_with_batch join student_profile on student_profile.id= profile_subject_with_batch.profile_id
                                            join subject on subject.id=profile_subject_with_batch.subject_id
                                            join school_board on profile_subject_with_batch.board=school_board.id
                                            left join app_user on profile_subject_with_batch.classes_assigned_to_teacher_id=app_user.id
            order by profile_subject_with_batch.created_at desc`;
}
export const actionToGetAllTeacherDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id `;
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
                                                                                    'student_id',profile_subject_with_batch.profile_id,
                                                                                    'subject_id',profile_subject_with_batch.subject_id,
                                                                                    'has_taken_demo',profile_subject_with_batch.has_taken_demo,
                                                                                    'classes_assigned_to_teacher_id',profile_subject_with_batch.classes_assigned_to_teacher_id,
                                                                                    'batch',profile_subject_with_batch.batch,
                                                                                    'classes_assigned_to_teacher',classes_assigned_to_teacher.jsdata,
                                                                                    'subject_name',subject.name
                                                                                )
                                                                        ) jsdata
                                                             FROM profile_subject_with_batch
                                                                      LEFT JOIN subject ON profile_subject_with_batch.subject_id = subject.id
                                                                      LEFT JOIN (SELECT classes_assigned_to_teacher.id,
                                                                                        json_object(
                                                                                                'id',classes_assigned_to_teacher.id,
                                                                                                'teacher_id',classes_assigned_to_teacher.teacher_id,
                                                                                                'class_end_time',classes_assigned_to_teacher.class_end_time,
                                                                                                'teacher_name',app_user.name,
                                                                                                'starting_from_date',classes_assigned_to_teacher.starting_from_date,
                                                                                                'is_demo_class',classes_assigned_to_teacher.is_demo_class
                                                                                            ) jsdata
                                                                                 FROM classes_assigned_to_teacher
                                                                                          LEFT JOIN app_user ON classes_assigned_to_teacher.teacher_id = app_user.id
                                                                          ) classes_assigned_to_teacher ON classes_assigned_to_teacher.id = profile_subject_with_batch.classes_assigned_to_teacher_id
                                                  
                                                             GROUP BY profile_subject_with_batch.profile_id) profile_subject_with_batch ON profile_subject_with_batch.profile_id = student_profile.id
                                                  WHERE student_profile.created_by = '${userId}'`;
}

export const actionToGetTeacherAllClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id', classes_assigned_to_teacher.id,
                           'subject_id', classes_assigned_to_teacher.subject_id,
                           'batch', classes_assigned_to_teacher.batch,
                           'starting_from_date', classes_assigned_to_teacher.starting_from_date,
                           'class_end_time', classes_assigned_to_teacher.class_end_time,
                           'is_demo_class', classes_assigned_to_teacher.is_demo_class,
                           'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                           'subject_name', subject.name,
                           'student_class', classes_assigned_to_teacher.student_class,
                           'teacher_id', classes_assigned_to_teacher.teacher_id,
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
                                LEFT JOIN student_profile ON profile_subject_with_batch.profile_id = student_profile.id

                            GROUP BY profile_subject_with_batch.classes_assigned_to_teacher_id) profile_subject_with_batch
                           ON profile_subject_with_batch.classes_assigned_to_teacher_id = classes_assigned_to_teacher.id
        WHERE classes_assigned_to_teacher.teacher_id = '${userId}'`;
}