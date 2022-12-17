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
    return `select * from student_profile where subscription_end_date is not NULL order by created_at desc`;
}
export const actionToGetAllTeacherDataListQuery = ()=>{
    return `select * from app_user where app_user.role=2 order by id desc`;
}
export const actionToSearchTeacherAccordingToTheConditionQuery = (subject_id,student_class,school_board)=>{
    return `SELECT app_user.name AS teacher_name,app_user.id AS teacher_id
            FROM teacher_subject_and_class
                     INNER JOIN app_user ON app_user.id = teacher_subject_and_class.teacher_id
            WHERE  app_user.role = 2 AND app_user.board = '${school_board}' AND
                teacher_subject_and_class.teacher_class = ${student_class} AND teacher_subject_and_class.subject_id = '${subject_id}'
            GROUP BY app_user.id
    `;
}
export const actionToAlreadyCreatedClassAccordingToTheConditionQuery = (subject_id,student_class,school_board,batch)=>{
    return `SELECT app_user.name AS teacher_name,app_user.id AS teacher_id
            FROM teacher_subject_and_class
                     INNER JOIN app_user ON app_user.id = teacher_subject_and_class.teacher_id
            WHERE  app_user.role = 2 AND app_user.board = '${school_board}' AND
                teacher_subject_and_class.teacher_class = ${student_class} AND teacher_subject_and_class.subject_id = '${subject_id}'
            GROUP BY app_user.id
    `;
}
export const actionToGetAllClassesDataListQuery = ()=>{
    return `select profile_subject_with_batch.id as  profile_subject_with_batch_id, profile_subject_with_batch.batch as  profile_subject_with_batch_batch_type, profile_subject_with_batch.has_taken_demo as  profile_subject_with_batch_has_taken_demo,
                   profile_subject_with_batch.classes_assigned_to_teacher_id as classes_assigned_to_teacher_id,student_profile.id as student_id,student_profile.name as student_name,student_profile.email as student_email
                    ,subject.id as subject_id, subject.name as subject_name,classes_assigned_to_teacher.is_demo_class as is_demo_class,school_board.name as school_board_name,student_profile.student_class as student_class,
                   student_profile.subscription_end_date as subscription_end_date
            from profile_subject_with_batch
                     join student_profile on profile_subject_with_batch.profile_id =student_profile.id
                     join school_board on student_profile.school_board=school_board.id
                     join subject on subject.id=profile_subject_with_batch.subject_id
                     left join  classes_assigned_to_teacher on classes_assigned_to_teacher.id = profile_subject_with_batch.classes_assigned_to_teacher_id `;
}
export const actionToGetAllShoolBoardDataListQuery = ()=>{
    return `SELECT id,name from school_board`;
}
export const actionToGetAllDemoClassesDetailsQuery = ()=>{
    return `select profile_subject_with_batch.id as  profile_subject_with_batch_id,
                   profile_subject_with_batch.batch as  profile_subject_with_batch_batch_type,
                   profile_subject_with_batch.has_taken_demo as  profile_subject_with_batch_has_taken_demo,
                   student_profile.id as student_id,
                   student_profile.name as student_name,
                   student_profile.email as student_email,
                   subject.id as subject_id,
                   subject.name as subject_name,
                   school_board.name as school_board_name,
                   school_board.id as school_board_id,
                   student_profile.student_class as student_class

     from profile_subject_with_batch
     join student_profile on profile_subject_with_batch.profile_id =student_profile.id
     join school_board on student_profile.school_board=school_board.id
     join subject on subject.id=profile_subject_with_batch.subject_id`;
}
export const actionToGetAllAttendClassWithAssignmentQuery = (profileId)=>{
    return `SELECT JSON_OBJECT(
                           'classes_assigned_to_teacher', classes_assigned_to_teacher.jsdata,
                           'created_at', student_class_attend.created_at,
                           'student_class_attend_assignment', student_class_attend_assignment.jsdata
                       ) AS class_attend
            from student_class_attend
                     LEFT JOIN (SELECT classes_assigned_to_teacher.id,
                                       json_object(
                                               'id', classes_assigned_to_teacher.id,
                                               'teacher_id', classes_assigned_to_teacher.teacher_id,
                                               'starting_from_date', classes_assigned_to_teacher.starting_from_date,
                                               'batch', classes_assigned_to_teacher.batch,
                                               'is_demo_class', classes_assigned_to_teacher.is_demo_class,
                                               'subject_id', classes_assigned_to_teacher.subject_id,
                                               'school_board', classes_assigned_to_teacher.school_board,
                                               'student_class', classes_assigned_to_teacher.student_class,
                                               'class_end_time', classes_assigned_to_teacher.class_end_time,
                                               'teacher_name', app_user.name,
                                               'subject_name', subject.name
                                           ) jsdata
                                FROM classes_assigned_to_teacher
                                         LEFT JOIN subject ON classes_assigned_to_teacher.subject_id = subject.id
                                         LEFT JOIN app_user ON classes_assigned_to_teacher.teacher_id = app_user.id
                                GROUP BY classes_assigned_to_teacher.id) classes_assigned_to_teacher
                               ON student_class_attend.classes_assigned_to_teacher_id = classes_assigned_to_teacher.id
                     LEFT JOIN (SELECT student_class_attend_assignment.student_class_attend_id,
                                       json_arrayagg(
                                               json_object(
                                                       'id', student_class_attend_assignment.id,
                                                       'path', student_class_attend_assignment.path
                                                   )
                                           ) jsdata
                                FROM student_class_attend_assignment
                                GROUP BY student_class_attend_assignment.student_class_attend_id) student_class_attend_assignment
                               ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id
            WHERE student_class_attend.student_profile_id = '${profileId}'
            ORDER BY student_class_attend.created_at`;
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